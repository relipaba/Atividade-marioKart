let index_atual = 0;

function mudarSlide(direcao) {
  const trilho = document.getElementById("carrossel_slides");
  const total_slides = trilho.children.length;

  index_atual += direcao;

  if (index_atual >= total_slides) {
    index_atual = 0;
  } else if (index_atual < 0) {
    index_atual = total_slides - 1;
  }

  const deslocamento = index_atual * -100;
  trilho.style.transform = `translateX(${deslocamento}%)`;
}

let lista_treino = [];
let filtro_atual = "todos";
const pista_input = document.getElementById("pista_input");
const btn_adicionar = document.getElementById("btn_adicionar");
const lista_pistas = document.getElementById("lista_pistas");
const contador_pistas = document.getElementById("contador_pistas");
const btn_limpar_tudo = document.getElementById("btn_limpar_tudo");
const botoes_filtro = document.querySelectorAll(".btn_filtro");

pista_input.addEventListener("keypress", (evento) => {
  if (evento.key === "Enter") {
    adicionar_pista();
  }
});

btn_adicionar.addEventListener("click", adicionar_pista);
btn_limpar_tudo.addEventListener("click", limpar_tudo);

function adicionar_pista() {
  const nome = pista_input.value.trim();
  if (!nome) return;

  lista_treino.push({ nome: nome, status: "pendente" });
  pista_input.value = "";
  renderizar_lista();
}

function alternar_status(i) {
  lista_treino[i].status =
    lista_treino[i].status === "pendente" ? "concluido" : "pendente";
  renderizar_lista();
}

function remover_pista(i) {
  lista_treino.splice(i, 1);
  renderizar_lista();
}

function limpar_tudo() {
  lista_treino = [];
  renderizar_lista();
}

function renderizar_lista() {
  const filtrados = lista_treino.filter((item) => {
    if (filtro_atual === "pendente") return item.status === "pendente";
    if (filtro_atual === "concluido") return item.status === "concluido";
    return true;
  });

  lista_pistas.innerHTML = filtrados
    .map((item) => {
      const i = lista_treino.indexOf(item);
      const eConcluido = item.status === "concluido";

      return `
            <li class="item_pista ${item.status}">
                <span>${item.nome}</span>
                <div class="acoes_item">
                    <button class="btn_acao btn_concluir" onclick="alternar_status(${i})">
                        ${eConcluido ? "Desfazer" : "Concluir"}
                    </button>
                    <button class="btn_acao btn_remover" onclick="remover_pista(${i})">
                        Excluir
                    </button>
                </div>
            </li>
        `;
    })
    .join("");

  const total = lista_treino.length;
  const pendentes = lista_treino.filter(
    (item) => item.status === "pendente",
  ).length;
  const concluidas = lista_treino.filter(
    (item) => item.status === "concluido",
  ).length;
  contador_pistas.textContent = `Total: ${total} pistas (${pendentes} pendentes | ${concluidas} dominadas)`;
}

botoes_filtro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoes_filtro.forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    filtro_atual = botao.getAttribute("data-filtro");
    renderizar_lista();
  });
});

const formulario = document.getElementById("form_pesquisa");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const apelido = document.getElementById("apelido").value.trim();
  const email = document.getElementById("email").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const plataforma = document.getElementById("plataforma").value;
  const nota = document.getElementById("nota").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (
    nome === "" ||
    apelido === "" ||
    email === "" ||
    idade === "" ||
    plataforma === "" ||
    nota === "" ||
    comentario === ""
  ) {
    alert(
      "Erro: Por favor, preencha todos os campos obrigatórios do formulário!",
    );
    return;
  }

  if (!email.includes("@")) {
    alert("Erro: O e-mail informado deve conter o caractere '@'.");
    return;
  }

  const idadeNumero = Number(idade);
  if (idadeNumero < 5 || idadeNumero > 120) {
    alert("Erro: Por favor, insira uma idade válida entre 5 e 120 anos.");
    return;
  }

  alert(
    "Sucesso! Pesquisa enviada com sucesso. Obrigado por participar, " +
      nome +
      "!",
  );

  formulario.reset();
});

function mostrarResposta(idResposta) {
  const caixa = document.getElementById(idResposta);

  if (caixa.style.display === "none") {
    caixa.style.display = "block";
  } else {
    caixa.style.display = "none";
  }
}

const inputBusca = document.getElementById("busca_faq");

inputBusca.addEventListener("input", function () {
  const textoDigitado = inputBusca.value.toLowerCase();
  const itensFaq = document.querySelectorAll(".faq_item");

  for (let i = 0; i < itensFaq.length; i++) {
    const perguntaTexto = itensFaq[i]
      .querySelector(".faq_pergunta")
      .textContent.toLowerCase();

    if (perguntaTexto.indexOf(textoDigitado) !== -1) {
      itensFaq[i].style.display = "block";
    } else {
      itensFaq[i].style.display = "none";
    }
  }
});
