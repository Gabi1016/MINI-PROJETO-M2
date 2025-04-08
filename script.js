const musicas = [];

class Musica {
    constructor(titulo, artista, album, genero, anoLancamento) {
        this.titulo = titulo;
        this.artista = artista;
        this.album = album;
        this.genero = genero;
        this.anoLancamento = anoLancamento;
    }
}

const tituloInput = document.getElementById('titulo');
const artistaInput = document.getElementById('artista');
const albumInput = document.getElementById('album');
const generoInput = document.getElementById('genero');
const anoLancamentoInput = document.getElementById('anoLancamento');
const btnSalvarMusica = document.getElementById("btn-salvar-musica");
const btnListarMusicas = document.getElementById("btn-listar-musicas");
const containerMusicas = document.getElementById("container-musicas");
const ulMusicasCadastradas = document.getElementById("musicasCadastradas");

btnSalvarMusica.addEventListener("click", () => {
    const musica = new Musica(
        tituloInput.value,
        artistaInput.value,
        albumInput.value,
        generoInput.value,
        anoLancamentoInput.value
    );

    musicas.push(musica);
    alert("Música adicionada com sucesso. Clique em 'Listar Músicas' para ver.");
    limparFormularioMusica();
});

btnListarMusicas.addEventListener("click", listarMusicas);

function listarMusicas() {
    ulMusicasCadastradas.innerHTML = '';
    for (let i = 0; i < musicas.length; i++) {
        criarListaMusica(i, musicas[i].titulo, musicas[i].artista, musicas[i].album, musicas[i].genero, musicas[i].anoLancamento);
    }
}

function criarListaMusica(index, titulo, artista, album, genero, anoLancamento) {
    const btnDeletar = document.createElement("button");
    const btnEditar = document.createElement("button");

    const listItem = document.createElement("li");
    listItem.classList.add("musica-card");

    const tituloMusica = document.createElement("h3");
    tituloMusica.classList.add("musica-titulo");
    tituloMusica.textContent = titulo;

    const divInformacoes = document.createElement("div");
    divInformacoes.classList.add("musica-info");

    const artistaMusica = document.createElement("p");
    artistaMusica.textContent = `Artista: ${artista}`;

    const albumMusica = document.createElement("p");
    albumMusica.textContent = `Álbum: ${album || 'N/A'}`;

    const generoMusica = document.createElement("p");
    generoMusica.textContent = `Gênero: ${genero || 'N/A'}`;

    const anoLancamentoMusica = document.createElement("p");
    anoLancamentoMusica.textContent = `Ano: ${anoLancamento || 'N/A'}`;

    btnEditar.textContent = 'Editar';
    btnDeletar.textContent = 'Deletar';

    btnEditar.addEventListener("click", () => {
        tituloInput.value = musicas[index].titulo;
        artistaInput.value = musicas[index].artista;
        albumInput.value = musicas[index].album;
        generoInput.value = musicas[index].genero;
        anoLancamentoInput.value = musicas[index].anoLancamento;
        btnSalvarMusica.textContent = 'Salvar Edição';

        btnSalvarMusica.onclick = () => {
            musicas[index].titulo = tituloInput.value.trim();
            musicas[index].artista = artistaInput.value.trim();
            musicas[index].album = albumInput.value.trim();
            musicas[index].genero = generoInput.value.trim();
            musicas[index].anoLancamento = anoLancamentoInput.value.trim();
            listarMusicas();
            limparFormularioMusica();
            btnSalvarMusica.textContent = 'Adicionar Música';
            btnSalvarMusica.onclick = btnSalvarMusicaEventListener; // Restaura o listener original
        };
    });

    btnDeletar.addEventListener("click", () => {
        musicas.splice(index, 1);
        listarMusicas();
    });

    divInformacoes.appendChild(artistaMusica);
    divInformacoes.appendChild(albumMusica);
    divInformacoes.appendChild(generoMusica);
    divInformacoes.appendChild(anoLancamentoMusica);
    divInformacoes.appendChild(btnEditar);
    divInformacoes.appendChild(btnDeletar);

    listItem.appendChild(tituloMusica);
    listItem.appendChild(divInformacoes);

    ulMusicasCadastradas.appendChild(listItem);
}

function limparFormularioMusica() {
    tituloInput.value = "";
    artistaInput.value = "";
    albumInput.value = "";
    generoInput.value = "";
    anoLancamentoInput.value = "";
}

// Guarda a função original do botão Salvar para restaurar após a edição
const btnSalvarMusicaEventListener = btnSalvarMusica.onclick;