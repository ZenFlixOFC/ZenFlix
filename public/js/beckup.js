// Dados simulados da API
const apiDataArray = [
{ link: "pags?s=a-familia-buscape", img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRhvAvA9kTqprzYlFzRTGZJcnkhy_P6iOqHH7bPsp4jSnxBL08", title: "A Familia Buscape" },
{ link: "pags?s=angry-birds-2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsVBHUIdbSf8sseeRBcNsVub7X7yFWHqG1lj1YbbXws5S1DWA5rHsN5qa6&s=10", title: "Angry Birds 2: O Filme"},
{ link: "pags?s=elementos", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDdab6m1R38wYdsAjwcuGacJ80G27bD5oV0HlVR6aJoTS_3S3v", title: "Elementos" },
{ link: "pags?s=o-segredo-dos-animais", img: "https://br.web.img3.acsta.net/medias/nmedia/18/94/12/17/20304560.jpg", title: "O Segredo dos Animais" },
];

// Função para criar elementos HTML e exibir dados na página
function displayData(apiDataArray) {
const content = document.getElementById('apiContent');
            
// Limpar conteúdo existente
content.innerHTML = '';

apiDataArray.forEach(data => {
const div = document.createElement('div');
div.innerHTML = `
<!-- NEW ITEM -->
<div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 col">
<div class="item">
<a href="/${data.link}">
<div class="imagem"> <img original-src="${data.img}" alt="" title="" class="img-responsive" />
</div>
<h2 class="titulo">${data.title}</h2>
</a>
</div>
</div>
<!-- END ITEM -->
`;
content.appendChild(div);
});
}

// Chame a função para exibir os dados
displayData(apiDataArray);