'use strict';
(() => {
  const config = window.RITMO_FIREBASE_CONFIG;
  const gate = document.getElementById('cloud-gate');
  const configured = Boolean(config?.apiKey && config?.projectId && config?.appId);
  const state = { user: null, householdId: '', profileId: '', inviteCode: '', email: '', unsubscribers: [], saveTimer: null, hashes: {} };

  const api = window.RitmoFirebase = {
    configured,
    queueSave,
    signOut: () => configured && firebase.auth().signOut(),
    account: () => state.householdId ? { email: state.email, profileId: state.profileId, inviteCode: state.inviteCode } : null
  };
  if (!configured) return;

  firebase.initializeApp(config);
  const auth = firebase.auth();
  const db = firebase.firestore();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
  db.enablePersistence({ synchronizeTabs: true }).catch(() => {});

  function appReady() {
    return new Promise(resolve => {
      const check = () => window.RitmoApp ? resolve() : setTimeout(check, 20);
      check();
    });
  }
  function cleanText(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[char]));
  }
  function errorMessage(error) {
    const messages = {
      'auth/email-already-in-use': 'Não foi possível criar a conta com este e-mail.',
      'auth/invalid-credential': 'E-mail ou senha incorretos.',
      'auth/invalid-email': 'Digite um e-mail válido.',
      'auth/weak-password': 'Use uma senha com pelo menos 8 caracteres.',
      'auth/account-exists-with-different-credential': 'Este e-mail já usa outra forma de acesso. Entre com a opção utilizada anteriormente.',
      'auth/popup-blocked': 'Permita pop-ups para este site e tente entrar com o Google novamente.',
      'auth/unauthorized-domain': 'Este endereço precisa ser autorizado no Firebase para entrar com o Google.',
      'auth/operation-not-allowed': 'Esta forma de acesso ainda não está habilitada no Firebase.',
      'auth/popup-closed-by-user': 'O acesso com o Google foi cancelado.',
      'auth/network-request-failed': 'Sem conexão. Confira sua internet e tente novamente.',
      'auth/user-disabled': 'Esta conta foi desativada.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde um pouco e tente novamente.',
      'permission-denied': 'O banco recusou a operação. Confira as regras do Firestore.'
    };
    return error?.publicMessage || messages[error?.code] || 'Não foi possível concluir. Tente novamente.';
  }
  function fail(message) {
    const error = new Error('Public validation error');
    error.publicMessage = message;
    throw error;
  }
  function setMessage(message, isError = false) {
    const node = gate.querySelector('[data-cloud-message]');
    if (!node) return;
    node.textContent = message;
    node.classList.toggle('error', isError);
  }
  function setBusy(form, busy) {
    form.querySelectorAll('button,input,select').forEach(item => item.disabled = busy);
  }
  function fieldIcon(kind) {
    const paths = {
      email: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 7 9-7"/>',
      lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
      code: '<path d="M8 9 5 12l3 3m8-6 3 3-3 3m-5 3 2-12"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + paths[kind] + '</svg>';
  }
  function authField({ label, name, type = 'text', autocomplete = '', icon = 'email', extra = '', placeholder = '' }) {
    const toggle = type === 'password' ? '<button class="password-toggle" type="button" data-toggle-password aria-label="Mostrar senha">Mostrar</button>' : '';
    return '<label class="auth-field"><span>' + label + '</span><span class="input-shell">' + fieldIcon(icon) + '<input name="' + name + '" type="' + type + '" autocomplete="' + autocomplete + '" placeholder="' + placeholder + '" ' + extra + '>' + toggle + '</span></label>';
  }
  function googleMark() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z"/><path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.36l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.39 13.93A6.02 6.02 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.45H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.55l3.35-2.62Z"/><path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.45l3.35 2.62C7.18 7.7 9.39 5.94 12 5.94Z"/></svg>';
  }
  function showGate(content, message = true) {
    gate.hidden = false;
    gate.innerHTML = '<div class="auth-layout"><section class="auth-story" aria-label="Ritmo Duo"><span class="cloud-logo">R<span>.</span></span><div><p class="auth-overline">Ritmo Duo</p><h2>O treino de vocês, sempre no ritmo.</h2><p>Treinos, registros e evolução sincronizados com acesso individual.</p></div><div class="privacy-note"><span aria-hidden="true"></span><strong>Área privada</strong><small>Somente contas vinculadas ao casal.</small></div></section><section class="cloud-card">' + content + (message ? '<p class="cloud-message" data-cloud-message role="status" aria-live="polite"></p>' : '') + '</section></div>';
  }
  function hideGate() {
    gate.hidden = true;
    gate.replaceChildren();
  }
  function loginView() {
    showGate('<div class="cloud-heading"><span>Acesso seguro</span><h1>Boas-vindas</h1><p>Entre para continuar seus treinos.</p></div><form id="cloud-login" class="auth-form">' + authField({ label: 'E-mail', name: 'email', type: 'email', autocomplete: 'email', icon: 'email', placeholder: 'seu@email.com', extra: 'inputmode="email" required' }) + authField({ label: 'Senha', name: 'password', type: 'password', autocomplete: 'current-password', icon: 'lock', placeholder: 'Sua senha', extra: 'minlength="8" maxlength="128" required' }) + '<button class="primary auth-submit">Entrar</button></form><div class="auth-divider"><span>ou</span></div><button class="google-login" type="button" data-google-login>' + googleMark() + '<span>Continuar com o Google</span></button><div class="cloud-links"><button data-cloud-create>Criar uma conta</button><button data-cloud-reset>Esqueci a senha</button></div>');
  }
  function registerView() {
    showGate('<button class="auth-back" type="button" data-cloud-login aria-label="Voltar">‹</button><div class="cloud-heading"><span>Nova conta</span><h1>Comece por aqui</h1><p>Cada pessoa deve usar seu próprio e-mail.</p></div><form id="cloud-register" class="auth-form">' + authField({ label: 'E-mail', name: 'email', type: 'email', autocomplete: 'email', icon: 'email', placeholder: 'seu@email.com', extra: 'inputmode="email" required' }) + authField({ label: 'Senha', name: 'password', type: 'password', autocomplete: 'new-password', icon: 'lock', placeholder: 'Mínimo de 8 caracteres', extra: 'minlength="8" maxlength="128" required' }) + '<p class="field-help">Use uma senha exclusiva, com pelo menos 8 caracteres.</p><button class="primary auth-submit">Criar conta</button></form><div class="cloud-links"><button data-cloud-login>Já tenho uma conta</button></div>');
  }
  function resetView() {
    showGate('<button class="auth-back" type="button" data-cloud-login aria-label="Voltar">‹</button><div class="cloud-heading"><span>Recuperação</span><h1>Redefinir senha</h1><p>Enviaremos um link caso o e-mail esteja cadastrado.</p></div><form id="cloud-reset" class="auth-form">' + authField({ label: 'E-mail', name: 'email', type: 'email', autocomplete: 'email', icon: 'email', placeholder: 'seu@email.com', extra: 'inputmode="email" required' }) + '<button class="primary auth-submit">Enviar link</button></form>');
  }
  function verifyView(user) {
    showGate('<div class="verify-mark">' + fieldIcon('email') + '</div><div class="cloud-heading centered"><span>Confirme seu e-mail</span><h1>Veja sua caixa de entrada</h1><p>Enviamos a confirmação para <strong>' + cleanText(user.email) + '</strong>. Verifique o e-mail antes de acessar os dados.</p></div><div class="verify-actions"><button class="primary auth-submit" data-cloud-verified>Já confirmei</button><button data-cloud-resend>Reenviar e-mail</button></div><div class="cloud-links"><button data-cloud-signout>Usar outra conta</button></div>');
  }
  function setupView() {
    showGate('<div class="cloud-heading"><span>Última etapa</span><h1>Quem está entrando?</h1><p>Escolha seu perfil e conecte o espaço de vocês.</p></div><form id="cloud-setup" class="auth-form"><div class="profile-choice"><label><input type="radio" name="profile" value="d" required><span><b class="profile-avatar d">D</b><strong>Davi</strong></span></label><label><input type="radio" name="profile" value="g" required><span><b class="profile-avatar g">G</b><strong>Giovanna</strong></span></label></div><label class="auth-field"><span>Como deseja começar?</span><span class="select-shell"><select name="action"><option value="create">Criar espaço do casal</option><option value="join">Entrar com um código</option></select></span></label><div data-invite-field hidden>' + authField({ label: 'Código do casal', name: 'invite', icon: 'code', placeholder: 'Ex.: A7K9P2Q4', extra: 'maxlength="10" minlength="10" autocapitalize="characters" spellcheck="false"' }) + '</div><button class="primary auth-submit">Concluir</button></form><div class="cloud-links"><button data-cloud-signout>Sair desta conta</button></div>');
    const form = gate.querySelector('#cloud-setup');
    const toggle = () => form.querySelector('[data-invite-field]').hidden = form.action.value !== 'join';
    form.action.addEventListener('change', toggle); toggle();
  }
  function randomCode() {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const bytes = crypto.getRandomValues(new Uint8Array(10));
    return [...bytes].map(value => alphabet[value % alphabet.length]).join('');
  }
  async function createHousehold(profileId) {
    const uid = state.user.uid;
    const householdRef = db.collection('households').doc();
    let code = randomCode();
    while ((await db.collection('inviteCodes').doc(code).get()).exists) code = randomCode();
    const local = window.RitmoApp.snapshot();
    const batch = db.batch();
    batch.set(householdRef, { members: { [uid]: true }, profiles: { [profileId]: uid }, inviteCode: code, createdAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    batch.set(db.collection('inviteCodes').doc(code), { householdId: householdRef.id, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    batch.set(db.collection('users').doc(uid), { householdId: householdRef.id, profileId, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    batch.set(householdRef.collection('profiles').doc('d'), { payload: local.d, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    batch.set(householdRef.collection('profiles').doc('g'), { payload: local.g, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    await batch.commit();
  }
  async function joinHousehold(profileId, rawCode) {
    const uid = state.user.uid;
    const code = rawCode.trim().toUpperCase();
    if (!/^[A-HJ-NP-Z2-9]{10}$/.test(code)) fail('Digite o código completo de 10 caracteres.');
    const inviteRef = db.collection('inviteCodes').doc(code);
    const inviteSnap = await inviteRef.get();
    if (!inviteSnap.exists) fail('Código do casal não encontrado.');
    const householdId = inviteSnap.data().householdId;
    if (typeof householdId !== 'string' || !householdId) fail('Este convite não é válido.');
    const householdRef = db.collection('households').doc(householdId);
    const batch = db.batch();
    batch.update(householdRef, {
      ['members.' + uid]: true,
      ['profiles.' + profileId]: uid,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    batch.set(db.collection('users').doc(uid), { householdId, profileId, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    try { await batch.commit(); }
    catch (error) {
      if (error?.code === 'permission-denied') fail('O perfil escolhido já está vinculado ou o convite não é mais válido.');
      throw error;
    }
  }
  function stopSync() {
    state.unsubscribers.splice(0).forEach(unsubscribe => unsubscribe());
    state.householdId = ''; state.profileId = ''; state.inviteCode = ''; state.hashes = {};
    clearTimeout(state.saveTimer);
  }
  async function startSync(userRecord) {
    stopSync();
    state.householdId = userRecord.householdId;
    state.profileId = userRecord.profileId;
    state.email = state.user.email || userRecord.email || '';
    const householdRef = db.collection('households').doc(state.householdId);
    const household = await householdRef.get();
    if (!household.exists) throw new Error('O espaço do casal não existe.');
    state.inviteCode = household.data().inviteCode || '';
    const local = window.RitmoApp.snapshot();
    for (const profileId of ['d', 'g']) {
      const ref = householdRef.collection('profiles').doc(profileId);
      const initial = await ref.get();
      if (!initial.exists) await ref.set({ payload: local[profileId], updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      const unsubscribe = ref.onSnapshot(snapshot => {
        if (!snapshot.exists) return;
        const payload = snapshot.data().payload;
        const hash = JSON.stringify(payload);
        state.hashes[profileId] = hash;
        window.RitmoApp.applyRemote(profileId, payload);
      }, error => window.RitmoApp.notify(errorMessage(error)));
      state.unsubscribers.push(unsubscribe);
    }
    hideGate();
    window.RitmoApp.notify('Sincronização ativada.');
  }
  function queueSave(snapshot) {
    if (!state.householdId || !state.user) return;
    clearTimeout(state.saveTimer);
    const safe = structuredClone(snapshot);
    state.saveTimer = setTimeout(async () => {
      const householdRef = db.collection('households').doc(state.householdId);
      const batch = db.batch();
      let changed = false;
      for (const profileId of ['d', 'g']) {
        const hash = JSON.stringify(safe[profileId]);
        if (hash === state.hashes[profileId]) continue;
        changed = true; state.hashes[profileId] = hash;
        batch.set(householdRef.collection('profiles').doc(profileId), { payload: safe[profileId], updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
      }
      if (!changed) return;
      try { await batch.commit(); }
      catch (error) { window.RitmoApp.notify(errorMessage(error)); }
    }, 450);
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest('button');
    if (!button || !gate.contains(button)) return;
    if (button.hasAttribute('data-cloud-create')) return registerView();
    if (button.hasAttribute('data-cloud-login')) return loginView();
    if (button.hasAttribute('data-cloud-signout')) return auth.signOut();
    if (button.hasAttribute('data-google-login')) {
      button.disabled = true;
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      setMessage('');
      try { await auth.signInWithPopup(provider); }
      catch (error) {
        setMessage(errorMessage(error), error?.code !== 'auth/popup-closed-by-user');
      }
      finally { button.disabled = false; }
      return;
    }
    if (button.hasAttribute('data-cloud-reset')) return resetView();
    if (button.hasAttribute('data-toggle-password')) {
      const input = button.closest('.input-shell').querySelector('input');
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      button.textContent = visible ? 'Mostrar' : 'Ocultar';
      button.setAttribute('aria-label', visible ? 'Mostrar senha' : 'Ocultar senha');
      return;
    }
    if (button.hasAttribute('data-cloud-resend')) {
      button.disabled = true;
      try { await state.user.sendEmailVerification(); setMessage('E-mail de confirmação reenviado.'); }
      catch (error) { setMessage(errorMessage(error), true); }
      finally { button.disabled = false; }
      return;
    }
    if (button.hasAttribute('data-cloud-verified')) {
      button.disabled = true;
      try {
        await state.user.reload();
        await state.user.getIdToken(true);
        if (!state.user.emailVerified) fail('A confirmação ainda não apareceu. Abra o link do e-mail e tente novamente.');
        await bootstrap(state.user);
      } catch (error) { setMessage(errorMessage(error), true); }
      finally { button.disabled = false; }
      return;
    }
  });
  document.addEventListener('submit', async event => {
    const form = event.target;
    if (!gate.contains(form)) return;
    event.preventDefault();
    const fields = new FormData(form);
    setBusy(form, true);
    setMessage('');
    try {
      if (form.id === 'cloud-login') await auth.signInWithEmailAndPassword(fields.get('email').trim(), fields.get('password'));
      if (form.id === 'cloud-register') {
        const credential = await auth.createUserWithEmailAndPassword(fields.get('email').trim(), fields.get('password'));
        await credential.user.sendEmailVerification();
      }
      if (form.id === 'cloud-reset') {
        await auth.sendPasswordResetEmail(fields.get('email').trim());
        setMessage('Se o e-mail estiver cadastrado, o link de redefinição será enviado.');
        form.reset();
      }
      if (form.id === 'cloud-setup') {
        const profileId = fields.get('profile');
        if (!profileId) fail('Escolha Davi ou Giovanna.');
        if (fields.get('action') === 'create') await createHousehold(profileId);
        else await joinHousehold(profileId, fields.get('invite'));
        await bootstrap(state.user);
      }
    } catch (error) { setMessage(errorMessage(error), true); }
    finally { setBusy(form, false); }
  });
  async function bootstrap(user) {
    await appReady();
    if (!user) { stopSync(); state.user = null; window.RitmoApp.lockStorage(); loginView(); return; }
    state.user = user;
    window.RitmoApp.setStorageUser(user.uid);
    if (!user.emailVerified) { verifyView(user); return; }
    try {
      const userSnap = await db.collection('users').doc(user.uid).get();
      if (!userSnap.exists) setupView();
      else await startSync(userSnap.data());
    } catch (error) { showGate('<h1>Não foi possível sincronizar</h1><p>Confira a conexão e as regras do Firestore.</p><button data-cloud-signout>Sair</button>'); setMessage(errorMessage(error), true); }
  }
  showGate('<div class="verify-mark">' + fieldIcon('lock') + '</div><div class="cloud-heading centered"><span>Ritmo Duo</span><h1>Conectando</h1><p>Preparando seu espaço seguro…</p></div>', false);
  auth.onAuthStateChanged(bootstrap);
})();
