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


const modal = document.getElementById("modalLivro");
const btnAbrir = document.getElementById("btnAbrirModal");
const spanFechar = document.querySelector(".fechar");
const form = document.getElementById("formlivro");

btnAbrir.onclick = () => modal.style.display = "block";
spanFechar.onclick = () => modal.style.display = "none";

form.onsubmit = async (event) => {
    event.preventDefault();

    const novoLivro = {
        title: document.getElementById("title").value,
        isbn: document.getElementById("isbn").value,
        author: document.getElementById("author").value,
        avaiable: true
    };

    try {
        const response = await fetch("http://localhost:8080/Book", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(novoLivro)
        });

        if (response.ok) {
            alert("Livro Cadastrado!");
            modal.style.display = "none";
            form.reset();
            carregarLivro();
        } else{
            const erro = await response.json();
            alert("Erro: " + (erro.message || "ISBN duplicado"));
        }
    } catch(error){
        console.log("Erro no post", error)
    }
}