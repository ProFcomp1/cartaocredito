const terms = [
    { term: "Juros", definition: "Taxa cobrada pelo banco por atraso no pagamento da fatura." },
    { term: "Fatura", definition: "Documento mensal que detalha os gastos feitos no cartão de crédito." },
    { term: "Limite de Crédito", definition: "Valor máximo que pode ser gasto com o cartão." },
    { term: "Pagamento Mínimo", definition: "Valor mínimo que deve ser pago para não haver atraso na fatura." },
    { term: "Anuidade", definition: "Taxa cobrada pelo banco para uso do cartão de crédito." },
    { term: "Parcelamento", definition: "Divisão de uma compra em várias parcelas mensais." },
    { term: "Custo Efetivo Total (CET)", definition: "Soma de todos os encargos e taxas do uso do cartão." },
    { term: "Rotativo", definition: "Modalidade de pagamento onde o saldo devedor é transferido para o próximo mês com a cobrança de juros." },
    { term: "Score de Crédito", definition: "Pontuação que indica a probabilidade de um cliente pagar suas contas em dia." },
    { term: "Cashback", definition: "Parte do valor gasto no cartão que é devolvido ao cliente como recompensa." },
];

let cards = [];
let firstCard = null;
let secondCard = null;
let points = 0;

// Duplicar e embaralhar os cartões
function setupCards() {
    cards = [...terms, ...terms.map(term => ({ term: term.definition, definition: term.term }))];
    cards = cards.sort(() => Math.random() - 0.5);
    
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.index = index;
        cardElement.dataset.value = card.term;
        cardElement.innerText = "🃏";
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(event) {
    const cardElement = event.target;
    const cardIndex = cardElement.dataset.index;
    const cardValue = cards[cardIndex].term;

    // Verifica se a carta já foi virada
    if (cardElement.classList.contains("flipped")) return;

    cardElement.classList.add("flipped");
    cardElement.innerText = cardValue;

    if (!firstCard) {
        firstCard = cardElement;
    } else {
        secondCard = cardElement;

        // Verifica se é um par
        if (cards[firstCard.dataset.index].definition === cardValue || cards[secondCard.dataset.index].definition === firstCard.innerText) {
            points++;
            updateScore();
            resetCards(true);
        } else {
            setTimeout(() => resetCards(false), 1000);
        }
    }
}

function resetCards(isMatch) {
    if (!isMatch) {
        firstCard.innerText = "🃏";
        secondCard.innerText = "🃏";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
    }
    firstCard = null;
    secondCard = null;
}

function updateScore() {
    document.getElementById("score").innerText = `Pontos: ${points}`;
}

setupCards();
