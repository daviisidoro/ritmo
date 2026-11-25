# Firebase do Ritmo Duo

1. Ative Authentication > Sign-in method > E-mail/senha e Google.
2. Em Authentication > Settings, use uma política de senha de pelo menos 8 caracteres e mantenha a proteção contra enumeração de e-mails ativada.
3. Em Authentication > Settings > Authorized domains, adicione apenas os domínios usados pelo aplicativo.
4. Crie o Cloud Firestore em modo de produção.
5. Publique o conteúdo de firestore.rules nas Regras do Firestore. As regras exigem e-mail verificado e limitam a leitura aos dois membros do casal.
6. Mantenha o App Check ativado para Web quando a chave de reCAPTCHA estiver disponível.
7. Restrinja a chave Web no Google Cloud aos domínios do Ritmo Duo e somente às APIs Firebase necessárias.

O app usa `users`, `inviteCodes` e `households`. Cada casal possui dois documentos de perfil dentro de `households/{id}/profiles`.

O objeto `firebaseConfig` identifica o projeto no cliente e não é uma credencial administrativa. Nunca adicione chaves privadas, contas de serviço ou tokens administrativos ao diretório `dist`.
