AJUDE UM AMIGO — V2 (com ADM sem redeploy)

O que mudou:
- Rank NÃO sobe sozinho.
- Maior valor fica sempre em cima.
- Você edita o rank em /admin.html sem precisar “atualizar o site”.
  (Os dados ficam salvos no Netlify Blobs via Netlify Function.)

✅ 1) SUBIR NO NETLIFY
- Faça deploy desta pasta (drag & drop ou via Git).
- IMPORTANTe: este projeto usa Netlify Functions.

✅ 2) ATIVAR A SENHA DO ADM
No Netlify, vá em:
Site settings → Environment variables → Add variable
Nome: ADMIN_TOKEN
Valor: (uma senha forte que só você sabe)

Depois, redeploy (só para aplicar a variável).

✅ 3) USAR O ADM
Abra:
https://SEU-SITE.netlify.app/admin.html
Digite a senha ADMIN_TOKEN e edite.

OBS:
- O áudio pode ser bloqueado por autoplay. Use o botão “Som”.
- O rank público se atualiza sozinho a cada 10 segundos.

Arquivos:
- index.html (página principal)
- admin.html (painel admin)
- musica.mp3 (música)
- netlify/functions/rank.js (API que salva/lê rank)
