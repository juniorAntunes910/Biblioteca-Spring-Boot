const URL_API = "http://localhost:8080/Book"

async function carregarLivro() {

    try{
    const resposta = await fetch(URL_API);
    const livros = await resposta.json();
    const tabela = document.getElementById("tabela-livros");
    tabela.innerHTML = "";

    livros.forEach(livro => {
        tabela.innerHTML += `
        <tr>
        <td>${livro.title}</td>
        <td>${livro.available ? 'Emprestado' : 'Disponivel'}</td>
            <td>
                <button onclick="deletarLivro(${livro.id})">Excluir</button>
            </td>
        </tr>
                `;
    });

}catch (error){
    console.error("Erro ao conectar o spring " , error)
}
}

carregarLivro();
