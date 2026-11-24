'use strict';
const defaults=[[["Leg press","3 séries","8–12","90–120 s","Mantenham os pés apoiados."],["Elevação pélvica","3 séries","10–15","90–120 s","Pode ser feita na máquina."],["Terra romeno com halteres","2 séries","8–12","90–120 s","Levem o quadril para trás."],["Mesa ou cadeira flexora","2 séries","10–15","60–90 s","Controlem a volta do peso."],["Panturrilha na máquina","2 séries","12–20","60–90 s","Façam a subida e a descida com controle."]],[["Supino na máquina","3 séries","8–12","90–120 s","Ajustem o assento na altura do peito."],["Puxada frontal","3 séries","8–12","90–120 s","Puxem a barra até perto do peito."],["Remada baixa","3 séries","8–12","90–120 s","Evitem balançar o tronco."],["Elevação lateral com halteres","2 séries","10–15","60–90 s","Subam até a altura dos ombros."],["Rosca com halteres","2 séries","10–15","60–90 s","Mantenham os cotovelos estáveis."],["Tríceps na polia","2 séries","10–15","60–90 s","Mantenham os cotovelos junto ao corpo."]],[["Afundo reverso com apoio","2 séries","8–12 por lado","60–90 s","Comecem com peso corporal ou halteres leves."],["Cadeira abdutora","2 séries","12–15","60–90 s","Abram as pernas sem embalar o tronco."],["Dead bug","2 séries","6–10 por lado","45–60 s","Movam braço e perna opostos devagar."],["Prancha lateral","2 séries","15–30 s por lado","45–60 s","Podem apoiar o joelho de baixo."],["Caminhada na esteira ou bike","1 bloco","15–20 min","—","Usem um ritmo que permita conversar."]]].map((exercises,i)=>({
 id:'ABC'[i],day:['Terça','Quinta','Sábado'][i],title:['Inferiores','Superiores','Glúteos, abdômen e cardio'][i],
 duration:i===2?'35–45 min':'50–60 min',exercises
}));
const soloPlans=[
 {id:'D',day:'Segunda',title:'Cardio moderado',duration:'25–35 min',exercises:[
  ['Caminhada rápida ou bike','1 bloco','25–35 min','—','Comece e termine com alguns minutos leves. No meio, mantenha um ritmo em que ainda dê para conversar.']
 ]},
 {id:'E',day:'Quarta',title:'Cardio leve e mobilidade',duration:'23–30 min',exercises:[
  ['Caminhada ou bike leve','1 bloco','15–20 min','—','Mantenha o ritmo confortável para recuperar as pernas do treino de terça.'],
  ['Mobilidade de quadril, tornozelos e ombros','1 bloco','8–10 min','—','Faça movimentos lentos e dentro de uma amplitude confortável.']
 ]},
 {id:'F',day:'Sexta',title:'Cardio contínuo',duration:'25–35 min',exercises:[
  ['Esteira, bike ou elíptico','1 bloco','25–35 min','—','Mantenha um ritmo em que dê para conversar. Se for fazer o treino de sábado e as pernas estiverem pesadas, faça 15–20 minutos leves.']
 ]}
];
const strengthPlans=[["G","Segunda","Peito, ombros e tríceps","45–55 min","Empurrar",[["Supino na máquina","3 séries","8–12","90–120 s","Ajuste o banco para as alças ficarem na altura do peito."],["Supino inclinado com halteres","2 séries","8–12","90–120 s","Desça os halteres com controle."],["Desenvolvimento na máquina","2 séries","8–12","90–120 s","Mantenha as costas apoiadas."],["Elevação lateral","2 séries","12–15","60–90 s","Use uma carga que permita subir sem embalar."],["Tríceps na polia","2 séries","10–15","60–90 s","Mantenha os cotovelos próximos ao corpo."]]],["H","Terça","Pernas · foco em quadríceps","45–55 min","Pernas",[["Leg press","3 séries","8–12","90–120 s","Mantenha os pés inteiros apoiados na plataforma."],["Agachamento com halter à frente","2 séries","8–12","90–120 s","Segure o halter junto ao peito e desça com controle."],["Cadeira extensora","2 séries","10–15","60–90 s","Suba e desça sem impulso."],["Cadeira flexora","2 séries","10–15","60–90 s","Controle a volta da carga."],["Panturrilha na máquina","2 séries","12–20","60–90 s","Desça o calcanhar com controle."]]],["I","Quarta","Costas e bíceps","40–50 min","Costas",[["Puxada frontal","3 séries","8–12","90–120 s","Puxe em direção à parte alta do peito."],["Remada baixa","3 séries","8–12","90–120 s","Mantenha o tronco estável."],["Crucifixo inverso na máquina","2 séries","12–15","60–90 s","Abra os braços com controle."],["Rosca com halteres","2 séries","10–15","60–90 s","Evite balançar o tronco."]]],["J","Quinta","Glúteos e posteriores","45–55 min","Glúteos",[["Elevação pélvica na máquina","3 séries","8–12","90–120 s","Suba o quadril sem arquear a lombar."],["Terra romeno com halteres","3 séries","8–12","90–120 s","Leve o quadril para trás com os halteres perto das pernas."],["Mesa ou cadeira flexora","2 séries","10–15","60–90 s","Controle a volta da carga."],["Cadeira abdutora","2 séries","12–20","60–90 s","Mantenha o tronco firme."],["Dead bug","2 séries","6–10 por lado","45–60 s","Mova braço e perna opostos sem levantar a lombar."]]],["K","Sexta","Superiores e abdômen","40–50 min","Superiores",[["Supino na máquina","2 séries","10–12","90–120 s","Use carga moderada e mantenha as costas apoiadas."],["Remada com apoio no peito","2 séries","10–12","90–120 s","Use uma máquina ou banco inclinado."],["Rosca martelo","2 séries","10–15","60–90 s","Mantenha os punhos neutros."],["Tríceps na polia com corda","2 séries","10–15","60–90 s","Mantenha os cotovelos fixos."],["Prancha","2 séries","20–35 s","45–60 s","Mantenha a respiração e pare antes de perder a postura."]]]].map(([id,day,title,duration,short,exercises])=>({id,day,title,duration,short,exercises}));
const allDefaults=[...defaults,...soloPlans,...strengthPlans];
const originalPlan=id=>allDefaults.find(p=>p.id===id);
const dayLabels=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
const shortPlans={C:'Glúteos',...Object.fromEntries(strengthPlans.map(p=>[p.id,p.short]))};
const people={d:{name:'Davi',start:70,goal:80,height:'1,85'},g:{name:'Giovanna',start:77,goal:66,height:'1,66'}};
const icons={inicio:'M3 10 12 3l9 7v10H3z M9 20v-6h6v6',treinos:'M3 9v6m4-9v12m10-12v12m4-9v6M7 12h10',diario:'M6 3h13v18H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 5h7m-7 4h7',evolucao:'M3 3v18h18M7 15l4-5 4 2 5-6'};
const routes={inicio:'Início',treinos:'Treinos',diario:'Diário',evolucao:'Evolução'};
const weekdays=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];
const planId=/^(?:[A-K]|P[a-f0-9-]{36})$/;
const looksLikeDate=k=>/^\d{4}-\d{2}-\d{2}$/.test(k);
const validPlan=(p,id)=>p&&p.id===id&&planId.test(id)&&typeof p.title==='string'&&
 weekdays.includes(p.day)&&typeof p.duration==='string'&&Array.isArray(p.exercises)&&
 p.exercises.length<=30&&p.exercises.every(e=>Array.isArray(e)&&e.length===5&&
 e.every(v=>typeof v==='string')&&/^(?:[1-9]|10) (?:série|séries|bloco)$/.test(e[1]));
const baseKey='ritmo-duo-v1';
let key=baseKey+'-signed-out';
const blank=()=>({profile:'d',d:{metrics:{},sessions:{}},g:{metrics:{},sessions:{}}});
function valid(x){
 if(!x||!Object.hasOwn(people,x.profile))return false;
 const obj=v=>v&&typeof v==='object'&&!Array.isArray(v);
 const fitsPlan=([id,p])=>planId.test(id)&&(p===null||validPlan(p,id));
 return ['d','g'].every(p=>obj(x[p]?.metrics)&&obj(x[p]?.sessions)&&
 (x[p].theme===undefined||['light','dark'].includes(x[p].theme))&&
 (x[p].custom===undefined||(obj(x[p].custom)&&Object.entries(x[p].custom).every(fitsPlan)))&&
 Object.entries(x[p].metrics).every(([k,m])=>looksLikeDate(k)&&obj(m)&&[m.weight,m.waist].every(v=>v===null||(Number.isFinite(v)&&v>0))&&typeof m.note==='string')&&
 Object.entries(x[p].sessions).every(([k,s])=>looksLikeDate(k.slice(0,10))&&k===k.slice(0,10)+'|'+s?.plan&&planId.test(s.plan)&&
 (s.template===undefined||validPlan(s.template,s.plan))&&obj(s.sets)&&['','Feito','Parcial','Pulado'].includes(s.status)&&typeof s.note==='string'&&
 Object.values(s.sets).every(v=>obj(v)&&typeof v.done==='boolean'&&typeof v.load==='string'&&typeof v.reps==='string')));
}
let storageError=false;
function load(){
 try{const raw=localStorage.getItem(key);if(!raw)return blank();const x=JSON.parse(raw);if(valid(x))return x;}
 catch{storageError=true;}
 return blank();
}
let data=load(), entered=false, editing=null, selected='A', sessionDate=today(), diaryDate=today(), timer=null, toastId;
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const numeral=(n,d=1)=>n.toLocaleString('pt-BR',{maximumFractionDigits:d});
function today(){const d=new Date();return [d.getFullYear(),d.getMonth()+1,d.getDate()].map(n=>String(n).padStart(2,'0')).join('-');}
const human=s=>s.split('-').reverse().join('/');
const profile=()=>people[data.profile];
const own=()=>data[data.profile];
function activePlans(){
 const custom=own().custom??{};
 const ids=data.profile==='g'?['G','H','I','J','K','C']:['H','J','C'];
 return [...ids.map(id=>Object.hasOwn(custom,id)?custom[id]:originalPlan(id)).filter(Boolean),
 ...Object.entries(custom).filter(([id,p])=>!ids.includes(id)&&p).map(([,p])=>p)]
 .sort((a,b)=>weekdays.indexOf(a.day)-weekdays.indexOf(b.day));
}
const sessionKey=()=>sessionDate+'|'+selected;
const currentPlan=()=>activePlans().find(p=>p.id===selected);
const plan=()=>own().sessions[sessionKey()]?.template??currentPlan()??(own().sessions[sessionKey()]&&originalPlan(selected));
const getSession=()=>own().sessions[sessionKey()]??{plan:selected,status:'',note:'',sets:{}};
function editSession(){
 const s=own().sessions[sessionKey()]??=getSession();
 s.template??=structuredClone(plan());
 return s;
}
const icon=n=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+icons[n]+'"/></svg>';
function toast(message){
 $('#toast').textContent=message;clearTimeout(toastId);
 toastId=setTimeout(()=>$('#toast').textContent='',3400);
}
function save(){
 try{localStorage.setItem(key,JSON.stringify(data));window.RitmoFirebase?.queueSave?.(data);return true;}
 catch{toast('Não foi possível salvar. Exporte um backup.');return false;}
}
function heading(title,sub){return '<div class="title"><h1>'+title+'</h1><p>'+sub+'</p></div>';}
function stat(id){
 const p=people[id], d=data[id];
 const weights=Object.entries(d.metrics).filter(([,m])=>m.weight!==null).sort(([a],[b])=>a.localeCompare(b));
 const now=weights.at(-1)?.[1].weight??p.start;
 const progress=Math.max(0,Math.min(100,(now-p.start)/(p.goal-p.start)*100));
 const sessions=Object.values(d.sessions);
 return {p,weights,now,progress,regular:sessions.filter(s=>(s.template?.day??originalPlan(s.plan)?.day)!=='Sábado'&&s.status==='Feito').length,saturday:sessions.filter(s=>(s.template?.day??originalPlan(s.plan)?.day)==='Sábado'&&s.status==='Feito').length};
}
function goalCard(id){
 const {p,weights,now,progress,regular,saturday}=stat(id);
 return '<article class="card"><div class="row"><h2>Peso</h2><span class="meta">'+(regular+saturday)+' treinos concluídos</span></div><div class="kpi">'+numeral(now)+' kg</div><div class="row meta"><span>Meta '+p.goal+' kg</span><strong>'+Math.round(progress)+'%</strong></div><div class="bar" role="progressbar" aria-label="Progresso de '+p.name+'" aria-valuenow="'+Math.round(progress)+'"><span style="width:'+progress+'%"></span></div>'+weightChart(weights)+'</article>';
}
function weightChart(weights){
 if(weights.length<2)return '';
 const vals=weights.map(([,m])=>m.weight),lo=Math.min(...vals),hi=Math.max(...vals);
 const points=vals.map((v,i)=>[18+i*284/(vals.length-1),hi===lo?51:90-(v-lo)*78/(hi-lo)]);
 return '<div class="chart"><svg viewBox="0 0 320 105" role="img" aria-label="Peso de '+numeral(vals[0])+' a '+numeral(vals.at(-1))+' kg"><path d="M18 12H302M18 51H302M18 90H302" stroke="var(--line)" stroke-dasharray="4 5"/><polyline fill="none" stroke="var(--accent)" stroke-width="3" points="'+points.map(p=>p.join(',')).join(' ')+'"/>'+points.map(([x,y],i)=>'<circle cx="'+x+'" cy="'+y+'" r="4" fill="var(--accent)"><title>'+human(weights[i][0])+' · '+numeral(vals[i])+' kg</title></circle>').join('')+'</svg></div><div class="row meta"><span>'+human(weights[0][0])+' · '+numeral(vals[0])+' kg</span><span>'+human(weights.at(-1)[0])+' · '+numeral(vals.at(-1))+' kg</span></div>';
}
function planCards(){
 const items=activePlans();
 return items.length?'<div class="planlist">'+items.map(p=>'<a href="#treinos/'+p.id+'" class="planline"><span class="planicon">'+icon('treinos')+'</span><span><strong>'+esc(p.title)+'</strong><small>'+p.day+' · '+esc(p.duration)+'</small></span></a>').join('')+'</div>':'<p class="meta">Adicione um treino para começar.</p>';
}
function weekSummary(){
 const items=activePlans();
 return '<details class="card week"><summary>Ver agenda semanal</summary><dl>'+weekdays.map((day,i)=>{
 const entries=items.filter(p=>p.day===day).map(p=>esc(p.title));
 if(isMuayThaiDay(i))entries.unshift('Muay Thai');
 return '<div><dt>'+day+'</dt><dd>'+(entries.join(' · ')||'Dia livre')+'</dd></div>';
 }).join('')+'</dl></details>';
}
function isMuayThaiDay(index){
 return data.profile==='d'&&[0,2,4].includes(index);
}
function weekStrip(items,todayIndex){
 return '<section class="card week-preview"><h2>Semana</h2><ul class="week-days">'+weekdays.map((day,index)=>{
 const p=items.find(p=>p.day===day);
 const label=p?(p.title===originalPlan(p.id)?.title?(shortPlans[p.id]??p.title):p.title):isMuayThaiDay(index)?'Muay Thai':index===6?'Descanso':'Livre';
 const content='<strong>'+dayLabels[index]+'</strong><span>'+esc(label)+'</span>';
 const description=day+' · '+(p?.title??label)+(p?.id==='C'?' (opcional)':'');
 const css=index===todayIndex?' class="current-day"':'';
 return '<li'+css+'>'+(p?'<a href="#treinos/'+p.id+'" aria-label="'+esc(description)+'">'+content+'</a>':'<div aria-label="'+esc(description)+'">'+content+'</div>')+'</li>';
 }).join('')+'</ul></section>';
}
function home(){
 const index=(new Date().getDay()+6)%7, items=activePlans(), p=items.find(p=>p.day===weekdays[index]);
 const name=p?.title??(isMuayThaiDay(index)?'Muay Thai':index===6?'Descanso':'Dia livre');
 const {now,p:person}=stat(data.profile);
 return heading('Olá, '+profile().name+'.','')+
 '<section class="hero"><div><div class="eyebrow">Hoje · '+weekdays[index]+'</div><h2>'+esc(name)+'</h2>'+
 (p?'<p>'+esc(p.duration)+(p.id==='C'?' · opcional':'')+'</p>':'')+
 '<a class="btn" href="#treinos'+(p?'/'+p.id:'')+'">'+(p?'Abrir treino':'Ver meus treinos')+'</a></div></section>'+
 weekStrip(items,index)+
 '<a class="card row home-progress" href="#evolucao"><div><h2>Evolução</h2><span class="meta">Meta '+person.goal+' kg</span></div><strong>'+numeral(now)+' kg</strong></a>';
}
function exercise(e,i,s){
 const [name,sets,reps,rest,tip]=e, time=rest==='—'?0:Number(rest.split('–')[0]), measure=reps.includes('min')?'Minutos':reps.includes(' s')?'Segundos':'Repetições';
 const count=Number(sets.split(' ')[0]);
 const recent=Object.entries(own().sessions).filter(([k,prev])=>k.slice(0,10)<sessionDate&&prev.plan===selected&&Object.entries(prev.sets).some(([k,v])=>k.startsWith((prev.template??originalPlan(prev.plan))?.exercises.findIndex(x=>x[0]===name)+'.')&&v.done)).sort(([a],[b])=>b.localeCompare(a))[0];
 const last=recent?Object.entries(recent[1].sets).filter(([k,v])=>k.startsWith((recent[1].template??originalPlan(recent[1].plan))?.exercises.findIndex(x=>x[0]===name)+'.')&&v.done).sort(([a],[b])=>a.localeCompare(b)).map(([,v])=>[v.load&&v.load+' kg',v.reps&&v.reps+' '+measure.toLowerCase()].filter(Boolean).join(' / ')).filter(Boolean).join(' · '):'';
 return '<details class="card exercise"'+(i===0?' open':'')+'><summary><strong>'+esc(name)+'</strong><div class="meta">'+sets+' · '+reps+(time?' · descanso '+rest:'')+'</div></summary><p class="note meta">'+esc(tip)+'</p>'+(last?'<p class="note meta">Último registro: '+esc(last)+'</p>':'')+'<div class="sets">'+Array.from({length:count},(_,j)=>{
 const id=i+'.'+j, v=s.sets[id]??{}, noLoad=measure!=='Repetições'||name==='Dead bug';
 return '<div class="set"><span>'+ (j+1)+'</span>'+(noLoad?'<span></span>':'<label>Carga (kg)<input type="number" inputmode="decimal" min="0" step="any" data-set="'+id+'" data-field="load" value="'+esc(v.load)+'"></label>')+'<label>'+measure+'<input type="number" inputmode="numeric" min="1" step="1" data-set="'+id+'" data-field="reps" value="'+esc(v.reps)+'"></label><label>Feita<input aria-label="Marcar série '+(j+1)+' de '+esc(name)+'" type="checkbox" data-set="'+id+'" data-field="done" '+(v.done?'checked':'')+'></label></div>';
 }).join('')+'</div>'+(time?'<button type="button" data-timer="'+time+'">Descansar '+time+' s</button>':'')+'</details>';
}
function statusOptions(v){return ['','Feito','Parcial','Pulado'].map(s=>'<option '+(v===s?'selected':'')+' value="'+s+'">'+(s||'Sem status')+'</option>').join('');}
function workout(){
 const p=plan();
 if(!p)return heading('Treinos','')+'<div class="row list-actions"><button class="primary" data-new-plan>Adicionar treino</button></div>'+planCards()+weekSummary();
 const s=getSession();
 const archived=s.template&&JSON.stringify(s.template)!==JSON.stringify(currentPlan());
 const soloNote={
 G:'Escolha a carga pela execução. Use as últimas repetições para avaliar se deve manter ou subir o peso na próxima sessão.',
 K:'Use carga moderada e deixe cerca de 3 repetições de sobra.'
 };
 const note=data.profile==='d'?
 (['A','H','J'].includes(selected)?'Se as pernas estiverem pesadas por causa do Muay Thai, reduza a carga ou tire uma série dos exercícios de pernas.':
 selected==='C'?'Se as pernas estiverem pesadas após o Muay Thai, faça abdômen e cardio leve ou descanse.':''):
 (selected==='C'?'Sábado é opcional. Se as pernas ainda estiverem cansadas da quinta, faça só abdômen ou descanse.':soloNote[selected]??'');

 return heading(esc(p.title),'')+'<div class="row workout-actions"><a class="btn" href="#treinos">Trocar treino</a>'+(currentPlan()?'<button type="button" data-edit-plan>Editar ficha</button>':'')+'</div>'+
 '<div class="row section"><div class="eyebrow">'+p.day+' · '+esc(p.duration)+'</div><label class="field">Data do treino<input id="sessionDate" type="date" value="'+sessionDate+'"></label></div>'+
 (archived?'<p class="note meta">Esta sessão usa a ficha da data registrada. Para usar a ficha atualizada, selecione uma data sem sessão.</p>':'')+
 (p.exercises.some(e=>!e[2].includes('min'))?'<details class="session-tips"><summary>Orientações do treino</summary><p class="note meta">Façam 5–8 min de aquecimento leve e deixem 2–3 repetições de sobra. Quando chegarem ao topo da faixa em todas as séries com boa técnica, subam a carga pelo menor incremento disponível.</p>'+(note?'<p class="note meta">'+note+'</p>':'')+'</details>':'')+
 '<div id="timer" class="timer"></div><div style="margin-top:12px">'+(p.exercises.length?p.exercises.map((e,i)=>exercise(e,i,s)).join(''):'<p class="note">Esta ficha está sem exercícios.</p>')+'</div>'+
 '<form id="sessionForm" class="card stack"><label class="field">Status<select name="status">'+statusOptions(s.status)+'</select></label><label class="field">Notas do treino<textarea rows="3" name="note" maxlength="3000" placeholder="Execução, energia e ajustes">'+esc(s.note)+'</textarea></label><div><button class="primary">Salvar sessão</button></div></form>';
}
function diary(){
 const m=own().metrics[diaryDate]??{}, metrics=Object.entries(own().metrics).sort(([a],[b])=>b.localeCompare(a));
 const sessions=Object.entries(own().sessions).sort(([a],[b])=>b.localeCompare(a));
 return heading('Diário','')+
 '<form id="metricForm" class="card forms"><label class="field wide">Data<input id="diaryDate" name="date" type="date" required value="'+diaryDate+'"></label><label class="field">Peso (kg)<input name="weight" type="number" min="1" step="0.1" inputmode="decimal" value="'+esc(m.weight)+'"></label><label class="field">Cintura (cm)<input name="waist" type="number" min="1" step="0.1" inputmode="decimal" value="'+esc(m.waist)+'"></label><label class="field wide">Anotações<textarea name="note" maxlength="3000" rows="2">'+esc(m.note)+'</textarea></label><div class="wide"><button class="primary">Salvar</button></div></form>'+
 (metrics.length?'<details class="card history"><summary>Medidas anteriores</summary>'+metrics.map(([k,m])=>'<article class="log"><div class="row"><strong>'+human(k)+'</strong><button data-edit-date="'+k+'">Editar</button></div><p class="meta">'+[m.weight===null?'':numeral(m.weight)+' kg',m.waist===null?'':numeral(m.waist)+' cm'].filter(Boolean).join(' · ')+'</p><p>'+esc(m.note)+'</p></article>').join('')+'</details>':'')+
 (sessions.length?'<details class="card history"><summary>Histórico de treinos</summary>'+sessions.map(([k,s])=>'<article class="log"><div class="row"><div><strong>'+human(k.slice(0,10))+' · '+esc(s.template?.title??originalPlan(s.plan)?.title??'Treino')+'</strong> <span class="pill">'+(s.status||'Em andamento')+'</span></div><button data-edit-session="'+k+'">Abrir</button></div><p class="meta">'+Object.values(s.sets).filter(v=>v.done).length+' séries marcadas</p><p>'+esc(s.note)+'</p></article>').join('')+'</details>':'');
}
function evolution(){
 const waist=Object.entries(own().metrics).filter(([,v])=>v.waist!==null).sort(([a],[b])=>a.localeCompare(b)).at(-1);
 return heading('Evolução','')+goalCard(data.profile)+(waist?'<div class="card history"><h2>Cintura</h2><p class="kpi">'+numeral(waist[1].waist)+' cm</p><p class="meta">'+human(waist[0])+'</p></div>':'');
}
function route(){
 const [page,choice]=location.hash.slice(1).split('/');
 selected=page==='treinos'&&planId.test(choice??'')?choice:'';
 return Object.hasOwn(routes,page)?page:'inicio';
}
function render(){
 const page=route();
 document.body.dataset.profile=data.profile;
 document.body.dataset.theme=own().theme??'light';
 document.body.classList.toggle('locked',!entered);
 $('#app').hidden=!entered;
 $('#welcome').hidden=entered;
 if(!entered){
 $('#welcome').innerHTML='<div class="welcome-inner"><h1 id="welcome-title">Escolha o perfil</h1><div class="profiles">'+Object.entries(people).map(([id,p])=>'<button class="profile-card '+id+'" data-enter="'+id+'"><strong>'+p.name+'</strong></button>').join('')+'</div></div>';
 return;
 }
 $('nav').innerHTML=Object.entries(routes).map(([k,label])=>'<a href="#'+k+'" '+(page===k?'aria-current="page"':'')+'>'+icon(k)+label+'</a>').join('');
 $('#profile-menu').innerHTML='<span class="avatar">'+profile().name[0]+'</span><span>'+profile().name+'</span>';
 $('#profile-menu').setAttribute('aria-label','Ajustes de '+profile().name);
 $('#view').innerHTML=({inicio:home,treinos:workout,diario:diary,evolucao:evolution}[page])();
 showTimer();
}
function preferences(){
 const theme=own().theme??'light';
 const box=$('#preferences');
 const cloud=window.RitmoFirebase?.account?.();
 box.innerHTML='<div class="row"><h2>Ajustes</h2><button data-close="preferences">Fechar</button></div><h3>Modo de exibição</h3><div class="switch theme-switch">'+[['light','Claro'],['dark','Escuro']].map(([id,text])=>'<button data-theme-choice="'+id+'" aria-pressed="'+(id===theme)+'">'+text+'</button>').join('')+'</div><button class="full" data-switch-profile>Trocar de perfil</button>'+(cloud?'<section class="cloud-account"><span class="sync-dot"></span><div><strong>Sincronização ativa</strong><small>'+esc(cloud.email)+'</small></div><button data-cloud-signout>Sair</button></section><label class="invite-code">Código do casal <strong>'+esc(cloud.inviteCode)+'</strong></label>':'')+'<details class="history"><summary>Backup</summary><div class="row backup-actions"><button id="backup">Exportar dados</button><button id="restore-button">Importar dados</button><input hidden id="restore" type="file" accept=".json,application/json"></div></details>';
 if(!box.open)box.showModal();
}
function exerciseEditor(e=['','3 séries','','60–90 s','']){
 return '<fieldset class="exercise-editor"><div class="row"><legend>Exercício</legend><button type="button" data-remove-exercise>Remover</button></div><label class="field wide">Nome<input name="exercise" required maxlength="80" value="'+esc(e[0])+'"></label><label class="field">Séries<input name="sets" type="number" min="1" max="10" required value="'+parseInt(e[1],10)+'"></label><label class="field">Repetições ou tempo<input name="reps" required maxlength="30" placeholder="8–12 ou 15 min" value="'+esc(e[2])+'"></label><label class="field">Descanso em segundos<input name="rest" type="number" min="0" max="600" required value="'+(parseInt(e[3],10)||0)+'"></label><label class="field">Dica<input name="tip" maxlength="150" value="'+esc(e[4])+'"></label></fieldset>';
}
function openEditor(workout){
 editing=workout??null;
 const box=$('#editor');
 box.innerHTML='<form id="editorForm" class="stack"><div class="row"><h2>'+(editing?'Editar treino':'Adicionar treino')+'</h2><button type="button" data-close="editor">Cancelar</button></div><label class="field">Nome do treino<input name="title" required maxlength="70" value="'+esc(editing?.title)+'"></label><div class="forms"><label class="field">Dia<select name="day">'+weekdays.map(day=>'<option '+(day===(editing?.day??'Sábado')?'selected':'')+'>'+day+'</option>').join('')+'</select></label><label class="field">Duração estimada<input name="duration" required maxlength="24" value="'+esc(editing?.duration??'40 min')+'"></label></div><div id="exerciseEditors" class="stack">'+(editing?editing.exercises.map(exerciseEditor).join(''):exerciseEditor())+'</div><button type="button" data-add-exercise>Adicionar exercício</button><div class="row editor-actions">'+(editing?'<button type="button" class="danger" data-remove-plan>Remover treino</button>':'')+'<button class="primary">Salvar treino</button></div></form>';
 box.showModal();
}
function archiveLegacy(workout){
 if(!workout)return;
 for(const s of Object.values(own().sessions))if(s.plan===workout.id&&!s.template)s.template=structuredClone(workout);
}
function replaceWorkout(id,replacement){
 archiveLegacy(activePlans().find(p=>p.id===id));
 own().custom??={};
 own().custom[id]=replacement;
 return save();
}
function saveWorkout(form){
 const fields=new FormData(form);
 const title=fields.get('title').trim(),duration=fields.get('duration').trim();
 const exercises=[...form.querySelectorAll('fieldset')].map(row=>{
 const value=name=>row.querySelector('[name="'+name+'"]').value.trim();
 const sets=Number(value('sets')), rest=Number(value('rest')), reps=value('reps');
 const old=editing?.exercises.find(e=>e[0]===value('exercise'));
 const restLabel=old&&parseInt(old[3],10)===rest?old[3]:rest?rest+' s':'—';
 return [value('exercise'),sets===1?(reps.includes('min')?'1 bloco':'1 série'):sets+' séries',reps,restLabel,value('tip')];
 });
 if(!title||!duration||!exercises.length||exercises.some(e=>!e[0]||!e[2])){
 toast('Preencha o treino e pelo menos um exercício.');return;
 }
 const id=editing?.id??'P'+crypto.randomUUID();
 if(!replaceWorkout(id,{id,title,duration,day:fields.get('day'),exercises}))return;
 $('#editor').close();
 sessionDate=today();
 location.hash='treinos/'+id;render();toast('Treino salvo.');
}
function showTimer(){
 const el=$('#timer');if(!el)return;
 if(!timer){el.replaceChildren();return;}
 const seconds=Math.max(0,Math.ceil((timer-Date.now())/1000));
 const label=seconds?'Descanso · '+Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0'):'Descanso concluído';
 if(el.dataset.label!==label||!el.firstChild){el.dataset.label=label;el.innerHTML='<div class="row"><strong>'+label+'</strong><button data-stop>Encerrar</button></div>';}
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.enter){data.profile=b.dataset.enter;entered=true;sessionDate=today();diaryDate=today();save();location.hash='inicio';render();return;}
 if(b.id==='profile-menu'){preferences();return;}
 if(b.dataset.close){$('#'+b.dataset.close).close();return;}
 if(b.dataset.themeChoice){own().theme=b.dataset.themeChoice;save();render();preferences();return;}
 if(b.hasAttribute('data-switch-profile')){$('#preferences').close();entered=false;timer=null;render();window.scrollTo(0,0);return;}
 if(b.hasAttribute('data-cloud-signout')){$('#preferences').close();window.RitmoFirebase?.signOut?.();return;}
 if(b.hasAttribute('data-new-plan')){openEditor(null);return;}
 if(b.hasAttribute('data-edit-plan')){openEditor(currentPlan());return;}
 if(b.hasAttribute('data-add-exercise')){
 const list=$('#exerciseEditors');
 if(list.children.length>=30){toast('Limite de 30 exercícios por treino.');return;}
 list.insertAdjacentHTML('beforeend',exerciseEditor());list.lastElementChild.querySelector('input').focus();return;
 }
 if(b.hasAttribute('data-remove-exercise')){b.closest('fieldset').remove();return;}
 if(b.hasAttribute('data-remove-plan')){
 if(editing&&window.confirm('Remover esta ficha? As sessões do histórico serão preservadas.')&&replaceWorkout(editing.id,null)){
 $('#editor').close();location.hash='treinos';render();toast('Treino removido.');
 }
 return;
 }
 if(b.dataset.timer){timer=Date.now()+Number(b.dataset.timer)*1000;showTimer();toast('Descanso iniciado.');return;}
 if(b.hasAttribute('data-stop')){timer=null;showTimer();return;}
 if(b.dataset.editDate){diaryDate=b.dataset.editDate;render();window.scrollTo(0,0);return;}
 if(b.dataset.editSession){const [date,id]=b.dataset.editSession.split('|');sessionDate=date;selected=id;location.hash='treinos/'+id;render();return;}
 if(b.id==='restore-button'){$('#restore').click();return;}
 if(b.id==='backup'){
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
 const a=document.createElement('a');a.href=url;a.download='Ritmo_Duo_'+today()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
});
function saveSet(x){
 const s=editSession(),v=s.sets[x.dataset.set]??={load:'',reps:'',done:false};
 v[x.dataset.field]=x.type==='checkbox'?x.checked:x.value;save();
}
document.addEventListener('input',e=>{const x=e.target;if(x.dataset.set&&x.validity.valid)saveSet(x);});
document.addEventListener('change',async e=>{
 const x=e.target;
 if(x.id==='sessionDate'&&x.value){sessionDate=x.value;render();}
 if(x.id==='diaryDate'&&x.value){diaryDate=x.value;render();}
 if(x.id==='restore'&&x.files[0]){
 try{
 const file=x.files[0];if(file.size>5000000)throw Error();
 const incoming=JSON.parse(await file.text());if(!valid(incoming))throw Error();
 if(window.confirm('Importar este backup e substituir os registros deste navegador?')){data=incoming;if(save())toast('Backup importado.');render();}
 }catch{toast('Arquivo de backup inválido.');}
 x.value='';
 }
});
document.addEventListener('submit',e=>{
 if(e.target.id==='editorForm'){e.preventDefault();saveWorkout(e.target);return;}
 if(!['sessionForm','metricForm'].includes(e.target.id))return;
 e.preventDefault();const f=new FormData(e.target);
 if(e.target.id==='sessionForm'){const s=editSession();s.status=f.get('status');s.note=f.get('note').trim();}
 else{
 const weight=f.get('weight')?Number(f.get('weight')):null,waist=f.get('waist')?Number(f.get('waist')):null,note=f.get('note').trim();
 if(weight===null&&waist===null&&!note){toast('Preencha uma medida ou uma nota.');return;}
 diaryDate=f.get('date');own().metrics[diaryDate]={weight,waist,note};render();
 }
 if(save())toast('Registro salvo.');
});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});
window.addEventListener('storage',e=>{if(e.key===key){data=load();render();}});
window.RitmoApp={
 snapshot:()=>structuredClone(data),
 setStorageUser(uid){
  if(typeof uid!=='string'||!/^[A-Za-z0-9_-]{8,128}$/.test(uid))return false;
  const nextKey=baseKey+'-'+uid;
  if(key===nextKey)return true;
  let nextData;
  try{
   const stored=localStorage.getItem(nextKey);
   if(stored){const parsed=JSON.parse(stored);if(valid(parsed))nextData=parsed;}
   if(!nextData){
    const legacy=localStorage.getItem(baseKey);
    if(legacy){const parsed=JSON.parse(legacy);if(valid(parsed)){nextData=parsed;localStorage.setItem(nextKey,legacy);localStorage.removeItem(baseKey);}}
   }
  }catch{storageError=true;}
  key=nextKey;data=nextData??blank();entered=false;render();return true;
 },
 lockStorage(){
  key=baseKey+'-signed-out';data=blank();entered=false;timer=null;render();
 },
 applyRemote(profileId,payload){
  if(!['d','g'].includes(profileId)||!payload)return false;
  const candidate=structuredClone(data);candidate[profileId]=payload;
  if(!valid(candidate))return false;
  data[profileId]=payload;
  try{localStorage.setItem(key,JSON.stringify(data));}catch{}
  render();return true;
 },
 notify:toast,
 refresh:render
};
setInterval(()=>{if(timer)showTimer();},250);
render();if(storageError)toast('O navegador bloqueou o armazenamento.');

