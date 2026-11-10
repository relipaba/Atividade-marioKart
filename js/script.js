let index_atual = 0;

function mudarSlide(direcao) {
  const trilho = document.getElementById("carrossel_slides");
  const total_slides = trilho.children.length;

  index_atual += direcao;

  // Retorna ao início ou vai para o final se estourar o limite
  if (index_atual >= total_slides) {
    index_atual = 0;
  } else if (index_atual < 0) {
    index_atual = total_slides - 1;
  }

  // Move exatamente 100% da largura por slide
  const deslocamento = index_atual * -100;
  trilho.style.transform = `translateX(${deslocamento}%)`;
}
