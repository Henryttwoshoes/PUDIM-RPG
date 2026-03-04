
// Pra adicionar uma nova pessoa é só copiar o bloco {} de alguém, colar embaixo e trocar as informações. Exemplo:
//          {
//              nome: "Nome",
//              funcao: "Função",
//              bio: "Uma biografia bonita.",
//              imagem: "imagens/Castle Story/Equipe/IMAGEM.png",
//              redes: [
//                  { icone: "imagens/Universo Branco/Instagram_icon.png.webp", texto: "Nome" },
//                  { icone: "imagens/Castle Story/redes logos/X logo.avif", texto: "@Nome" }
//              ]
//          },

// Pra adicionar uma nova categoria é só copiar o bloco {} de uma categoria inteira. Exemplo:
// {
//      nomeCategoria: "CATEGORIA B",
//      membros: [
//          {
//              nome: "Nome",
//              funcao: "Função",
//              bio: "Uma biografia bonita.",
//              imagem: "imagens/Castle Story/Equipe/IMAGEM.png",
//              redes: [] // Deixe vazio se não tiver redes
//          }
//      ]
//  }

const ddE = [
    {
        nomeCategoria: "CATEGORIA A",
        membros: [
            {
                nome: "ASTVITU",
                funcao: "Narrador",
                bio: "ASTVITU faz muitas artes bacanos. Artista de tokens e designer principal de personagens além das thumbs dos episódios.",
                imagem: "imagens/Castle Story/Equipe/AST VITU FROM BRAZILIAN sample.png",
                redes: [
                    { icone: "imagens/Universo Branco/Instagram_icon.png.webp", texto: "astvitu" },
                    { icone: "imagens/Castle Story/redes logos/X logo.avif", texto: "@ASTVITU" }
                ]
            },
            {
                nome: "Nome",
                funcao: "Função",
                bio: "Uma biografia bonita.",
                imagem: "imagens/Castle Story/Equipe/IMAGEM.png",
                redes: [
                    { icone: "imagens/Castle Story/redes logos/X logo.avif", texto: "@Nome" }
                ]
            }
        ]
    },
    {
        nomeCategoria: "CATEGORIA B",
        membros: [
            {
                nome: "Nome",
                funcao: "Função",
                bio: "Uma biografia bonita.",
                imagem: "imagens/Castle Story/Equipe/IMAGEM.png",
                redes: []
            }
        ]
    }
];

// Não precisa mexer aqui (aqui tem o Timer pra modificar)

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("carousel-equipe");
    if (!container) return;
    const estadoCarrosseis = [];
    ddE.forEach((equipe, indexEquipe) => {
        estadoCarrosseis[indexEquipe] = 0;
        const Equipe = document.createElement("div");
        Equipe.classList.add("equipe-categoria");
        let htmlMembros = "";
        let htmlDots = "";
        equipe.membros.forEach((membro, indexMembro) => {
            let redesHtml = "";
            membro.redes.forEach(rede => {
                redesHtml += `<p><img src="${rede.icone}" alt="">${rede.texto}</p>`;
            });
            htmlMembros += 
                `<div class="carousel-slide">
                    <figure class="avatars">
                        <img class="fotoart" src="${membro.imagem}" alt="${membro.nome}">
                        <figcaption class="nome"><strong>${membro.nome}</strong></figcaption>
                        <figcaption class="funcao">${membro.funcao}</figcaption>
                        <figcaption class="bio">${membro.bio}</figcaption>
                        <figcaption class="rede">
                            ${redesHtml}
                        </figcaption>
                    </figure>
                </div>`;
            htmlDots += `<div class="dot ${indexMembro === 0 ? 'active' : ''}" data-equipe="${indexEquipe}" data-slide="${indexMembro}"></div>`;
        });
        Equipe.innerHTML =
            `<h3>${equipe.nomeCategoria}</h3>
            <div class="carousel-container" id="carousel-${indexEquipe}">
                <div class="carousel-track" id="track-${indexEquipe}">
                    ${htmlMembros}
                </div>
            </div>
            <div class="carousel-dots" id="dots-${indexEquipe}">
                ${htmlDots}
            </div>`;
        container.appendChild(Equipe);
    });
    function moverCarrossel(indexEquipe, indexSlide) {
        const track = document.getElementById(`track-${indexEquipe}`);
        const dots = document.querySelectorAll(`#dots-${indexEquipe} .dot`);
        const slides = ddE[indexEquipe].membros.length;
        if (indexSlide >= slides) indexSlide = 0;
        if (indexSlide < 0) indexSlide = slides - 1;
        estadoCarrosseis[indexEquipe] = indexSlide;
        track.style.transform = `translateX(-${indexSlide * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots[indexSlide]) dots[indexSlide].classList.add('active');
    }
    let temporizador;
    function iniciarTemporizador() {
        temporizador = setInterval(() => {
            ddE.forEach((equipe, indexEquipe) => {
                if (equipe.membros.length > 1) {
                    let proximoSlide = estadoCarrosseis[indexEquipe] + 1;
                    moverCarrossel(indexEquipe, proximoSlide);
                }
            });
            // Tempo
        }, 7000); // 7000 milissegundos = 7 segundos
    }
    function resetarTemporizador() {
        clearInterval(temporizador);
        iniciarTemporizador();
    }
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const indexEquipe = parseInt(e.target.getAttribute('data-equipe'));
            const indexSlide = parseInt(e.target.getAttribute('data-slide'));
            moverCarrossel(indexEquipe, indexSlide);
            resetarTemporizador();
        });
    });
    iniciarTemporizador();
});