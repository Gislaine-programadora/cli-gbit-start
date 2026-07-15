<div align="center">

<img width="516" height="159" alt="GBIT START" src="https://github.com/user-attachments/assets/6236a75b-5f60-4d53-9ec6-56eb9377bf63" />

# 🚀 GBIT START

### Open any project in seconds

**Version:** `1.0.0`

<p>

<img src="https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/NPM-11-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=000000" />

</p>



</div>

---



<div align="center">

# 🚀 gbit-start

**Abra qualquer projeto existente com um único comando.**

Instala dependências, resolve conflitos de versão automaticamente e entrega a URL pronta pra visualizar — sem você precisar descobrir qual comando rodar.

📦 ## 🔗 Links

 📦 [NPM Package](https://www.npmjs.com/package/gbit-start)
 💻 [GitHub Repository](https://github.com/gislaine-programadora/cli-gbit-start)

  
</div>

---

## ✨ O que é

Você clonou um repositório, baixou um projeto antigo, ou pegou um código de outra pessoa — e agora precisa descobrir: é `npm install` ou `yarn`? É `npm run dev` ou `npm start`? Vai dar erro de versão?

O `gbit-start` resolve isso automaticamente. Aponte ele pra qualquer projeto e ele cuida do resto.

## 🚀 Uso

```bash
# Dentro da pasta de um projeto já existente
gbit-start

# Ou passando um link de repositório (ele clona pra você)
gbit-start https://github.com/usuario/algum-projeto.git

# Ou passando o caminho de uma pasta
gbit-start ../outro-projeto
```

## 🎯 Dois modos, um comando só

O `gbit-start` reconhece automaticamente o que você quer fazer, sem precisar de flags ou opções extras.

### 📂 Modo 1 — Abrir um projeto que você já tem

Rode dentro da pasta de um projeto existente (ou passe o caminho dele):

```bash
npx gbit-start
```

Ele instala as dependências, descobre o comando certo (`dev`, `start` ou `serve`) e entrega a URL pronta.

### 🌐 Modo 2 — Clonar e abrir um repositório do GitHub

Passe o link do repositório, e o `gbit-start` clona, instala e roda tudo em sequência — sem você precisar digitar `git clone`, entrar na pasta, ou lembrar qual comando usar:

```bash
gbit-start https://github.com/usuario/nome-do-repositorio.git
```

Em ambos os casos, o resultado é o mesmo: dependências instaladas, projeto rodando, e a URL destacada numa caixinha com confete. 🎉


## ⚙️ O que ele faz, passo a passo

1. **Localiza o projeto** — usa a pasta atual, clona um repositório (se você passar um link), ou aponta pra um caminho local
2. **Instala as dependências**, tentando em cascata até funcionar:
   - `npm install`
   - `npm install --legacy-peer-deps` (se a primeira falhar)
   - `npm install --force` (última tentativa)
  

      
3. **Descobre sozinho o comando certo**, lendo o `package.json` e procurando (nessa ordem): `dev` → `start` → `serve`
4. **Roda o projeto** e fica de olho na saída do terminal até encontrar a URL local (`http://localhost:...`)
5. **Mostra tudo pronto** com confete colorido e a URL destacada numa caixinha


## 🌐 Funciona com qualquer stack

| Tipo de projeto | Como o `gbit-start` reage |
|---|---|
| Next.js, React (Vite/CRA), Node/Express | Detecta o `package.json`, instala e roda o script certo automaticamente |
| HTML puro (sem `package.json`) | Detecta o `index.html` e sobe um servidor estático na hora, com `npx serve` |
| Nenhum dos dois | Mostra um erro claro explicando o que faltou |



## 📦 Instalação

```bash
npx gbit-start
```

Ou, se preferir instalar globalmente:

```bash
npm install -g gbit-start
gbit-start
```



## 🛠️ Tecnologias

- Node.js
- [chalk](https://www.npmjs.com/package/chalk) — cores no terminal
- [ora](https://www.npmjs.com/package/ora) — spinners de carregamento
- [figlet](https://www.npmjs.com/package/figlet) + [gradient-string](https://www.npmjs.com/package/gradient-string) — logo ASCII colorido

## 🗺️ Roadmap

- [ ] Suporte a Yarn e pnpm como alternativa ao npm
- [ ] Detecção de porta ocupada e sugestão automática de porta livre
- [ ] Modo silencioso (`--quiet`) sem o confete, pra uso em scripts/CI

## 🤝 Ecossistema Gbit

| Ferramenta | Descrição |
|---|---|
| [`gbit-next`](https://github.com/Gislaine-programadora) | Cria projetos Next.js prontos, com templates completos |
| [`create-gbit-app`](https://github.com/Gislaine-programadora) | Projetos fullstack completos (Backend + Frontend Vite/TS + Smart Contracts) |
| [`gbit-start`](https://github.com/Gislaine-programadora) | Este CLI — abre qualquer projeto existente |



<img width="1254" height="657" alt="image" src="https://github.com/user-attachments/assets/35af29e1-4d30-4c49-830a-78fadef782ba" />






## 📄 Licença

MIT © [Gislaine Cristina Lopes Fernandes](https://github.com/Gislaine-programadora)
