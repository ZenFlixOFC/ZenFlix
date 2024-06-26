let __path = process.cwd()
const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const router  = express.Router();
const { fetchJson } = require(__path + '/lib/fetcher.js');

///LISTA DAS APIKEYS PREMIUM
const keyprem = [
"JG" //Permanente
];

async function getBuffer(url) {
he = await fetch(url).then(c => c.buffer())
return he
}
async function Kibar(url) {
he = await fetch(url).then(c => c.json())
return he
}
function MathRandom(nans) {
he = nans[Math.floor(Math.random() * nans.length)]
return he
}

///CHECAR PLANOS
router.get('/checarplano', async(req, res, next) => {
apikey = req.query.apikey;
if(!apikey) return res.json({ ERROR: `Coloque o parametro apikey` })
if(keyprem.includes(apikey)) {
res.json({ status: `Plano: ATIVO`, ApiKey: `${apikey}` })
} else {
res.json({ status: `Plano: INATIVO`, ApiKey: `NONE` })
}})

///PAGS / PLAYS
router.get('/api', async(req, res, next) => {
pasta = req.query.pasta;
search = req.query.search;
if(!pasta) return res.json({ ERROR: `Coloque o parametro pasta` })
if(!search) return res.json({ ERROR: `Coloque o parametro search` })
try {
res.sendFile(__path + `/views/${pasta}/${search}.html`)
} catch {
res.json({ status: `INATIVO`, obs: `Não foi encontrado aquivo aqui!.` })
}})

//─────────ೋღ 🌺 ღೋ─────────

const categorias = [`comedia`, `animacao`, `animes`, `series`, `contato`, `categorias`, `download`];
categorias.forEach(categoria => {
router.get(`/${categoria}`, async (req, res, next) => {
res.sendFile(__path + `/views/abas/${categoria}.html`);
});
});

const responsesPath = path.join(__path, '/public/search.json');
let responses;

try {
  responses = JSON.parse(fs.readFileSync(responsesPath));
} catch (err) {
  console.error('Erro ao carregar respostas do arquivo JSON:', err);
  responses = {};
}

router.get('/search', async (req, res, next) => {
const search = req.query.s;
try {
const response = generateResponse(search);
if (response) {
// Gere elementos HTML com base na resposta
const htmlElements = response.map(data => `
<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 col">
<div class="item">
<a href="${data.link}">
<div class="imagem"><img original-src="${data.img}" alt="${data.title}" title="${data.title}" class="img-responsive" /></div>
<h2 class="titulo">${data.title}</h2>
</a>
</div>
</div>
`).join('');

res.send(`
<!DOCTYPE html>
<html class="no-js" dir="ltr" lang="pt-BR" prefix="og: https://ogp.me/ns#">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
<link media="all" href="/css/Main-CSS.css" rel="stylesheet"/>
<meta name="description" content="Assista a filmes e séries gratuitamente, somente aqui no ZenFlix!"/>
<link rel="icon" href="https://telegra.ph/file/260c54fe1b68841d3ebe8.png"/>
<title>ZenFlix</title>

<link rel="stylesheet" id="open-sans-css" href="https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&#038;subset=latin%2Clatin-ext&#038;ver=4.9.9" type="text/css" media="all"/>
</head>
<body data-rsssl="1">
<div class="wrapper">

<header class="mHeader">
<div class="topHeader">
<div class="container">
<div class="menuBTN">
<img src="/icons/menuAK.png" alt="Menu">
<span>Menu</span>
</div>
<div class="buscaBTNdskt"> Bom Ep :)</div>
<div class="buscaBTN"><span>Busca</span> 
<img src="/icons/buscaAK.png" alt="Busca">
</div>
</div>
</div>
<div class="containerHeader">
<div class="container">
<h3 class="topHeaderFrase">Filmes e Séries Grátis Para Você Assistir!</h3>
<div class="rl_BuscaContainer">
<form method="get" action="/search">
<input type="text" name="s" placeholder="Buscar por filmes series etc...">
<button type="submit">Buscar</button>
</form>
</div>
</div>
</div>
</header>
<div class="sideMenuLeft">
<div class="closeSideMenu"></div>
<nav>
<ul class="sideMenuItens">
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/download">BAIXAR APP ZENFLIX</a></li>
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/contato">CONTATO</a></li>
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/">HOME</a></li>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/categorias">CATEGORIAS</a></li>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/series">SERIES</a></li>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/animes">ANIMES</a></li>
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
</ul>
</nav>
</div>
<main class="fundo">

<div class="container">
<br>
<span class="titulo text-uppercase" style="color:#fff;"> Resultados Para:
<h1 style="display:inline;"><strong style="text-transform:uppercase;"> ${search}</strong></h1></span>
<br/>
<font size="2.5">Não encontrou o que procurava? Envie uma mensagem <a href="mailto:zenflix.dev@gmail.com" class="button_link loop btn_small">clicando aqui</a> e adicionaremos em até 48 horas.</font>
</div>

<br>

<div class="container">
<div class="clear"></div>
<div class="listagem row">

<!-- FILMES ABAIXO -->

${htmlElements}

<!-- FIM -->

</div>
</div>

</main>
<div class="mainFooter">
<div class="mainCreditosFooter">Filmes e Séries online grátis para você assistir a qualquer hora do seu dia!</div>
</div>
</div>

<script defer src="/js/Main-JS.js"></script>
</body>
</html>
`);
} else {
res.send(`
<!DOCTYPE html>
<html class="no-js" dir="ltr" lang="pt-BR" prefix="og: https://ogp.me/ns#">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
<link media="all" href="/css/Main-CSS.css" rel="stylesheet"/>
<meta name="description" content="Assista a filmes e séries gratuitamente, somente aqui no ZenFlix!"/>
<link rel="icon" href="https://telegra.ph/file/260c54fe1b68841d3ebe8.png"/>
<title>ZenFlix</title>

<link rel="stylesheet" id="open-sans-css" href="https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&#038;subset=latin%2Clatin-ext&#038;ver=4.9.9" type="text/css" media="all"/>
</head>
<body data-rsssl="1">
<div class="wrapper">

<header class="mHeader">
<div class="topHeader">
<div class="container">
<div class="menuBTN">
<img src="/icons/menuAK.png" alt="Menu">
<span>Menu</span>
</div>
<div class="buscaBTNdskt"> Bom Ep :)</div>
<div class="buscaBTN"><span>Busca</span> 
<img src="/icons/buscaAK.png" alt="Busca">
</div>
</div>
</div>
<div class="containerHeader">
<div class="container">
<h3 class="topHeaderFrase">Filmes e Séries Grátis Para Você Assistir!</h3>
<div class="rl_BuscaContainer">
<form method="get" action="/search">
<input type="text" name="s" placeholder="Buscar por filmes series etc...">
<button type="submit">Buscar</button>
</form>
</div>
</div>
</div>
</header>
<div class="sideMenuLeft">
<div class="closeSideMenu"></div>
<nav>
<ul class="sideMenuItens">
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/download">BAIXAR APP ZENFLIX</a></li>
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/contato">CONTATO</a></li>
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/">HOME</a></li>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/categorias">CATEGORIAS</a></li>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/series">SERIES</a></li>
    <li id="menu-item-11298" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-11298"><a href="/animes">ANIMES</a></li>
    <div class="doble-dote" style="margin: 15px 0 15px  0;"></div>
</ul>
</nav>
</div>
<main class="fundo">

<div class="container">
<br>
<span class="titulo text-uppercase" style="color:#fff;"> 0 Resultados para:
<h1 style="display:inline;"><strong style="text-transform:uppercase;"> ${search}</strong></h1></span>
<br/>
<font size="2.5">Não encontrou o que procurava? Envie uma mensagem <a href="mailto:zenflix.dev@gmail.com" class="button_link loop btn_small">clicando aqui</a> e adicionaremos em até 48 horas.</font>
</div>

<br>

</main>
<div class="mainFooter">
<div class="mainCreditosFooter">Filmes e Séries online grátis para você assistir a qualquer hora do seu dia!</div>
</div>
</div>

<script defer src="/js/Main-JS.js"></script>
</body>
</html>
`);
}} catch (error) {
res.status(500).send('Erro interno do servidor');
}});

function generateResponse(message) {
  const matchingKey = findMatchingKey(message, Object.keys(responses));
  return matchingKey ? responses[matchingKey] : null;
}

function findMatchingKey(input, keys) {
  const normalizedInput = input.toLowerCase();
  let bestMatch = null;
  let maxSimilarity = 0;

  keys.forEach(key => {
    const normalizedKey = key.toLowerCase();
    const similarity = calculateSimilarity(normalizedInput, normalizedKey);

    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      bestMatch = key;
    }
  });

  return maxSimilarity > 0.7 ? bestMatch : null;
}

function calculateSimilarity(s1, s2) {
  const intersection = [...new Set([...s1].filter(char => s2.includes(char)))].join('');
  const union = [...new Set([...s1, ...s2])].join('');
  return intersection.length / union.length;
}

//─────────ೋღ 🌺 ღೋ─────────

module.exports = router;