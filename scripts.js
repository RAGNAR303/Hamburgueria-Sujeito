const menu = document.getElementById("menu");
const cartBtn = document.getElementById("add-to-btn");
const cartModal = document.getElementById("card-modal");
const exitModal = document.getElementById("close-modal-btn");
const checkoutbtn = document.getElementById("checkout-btn");
const cardBtn = document.getElementById("card-btn");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const andressInput = document.getElementById("address");
const andressWarn = document.getElementById("address-warnig");

// Abrir modal

let cart = [];

cardBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

// Fechar modal Clicando fora ou no Botao "fechar"
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal || event.target === exitModal) {
    cartModal.style.display = "none";
  }
});

// pegando "event" dentro da DOM com o ID "menu" mais pegando um ID especifico
menu.addEventListener("click", function (event) {
  // console.log(event.target);

  let parentBtn = event.target.closest("#add-to-btn");

  if (parentBtn) {
    // Pegando o atributo que esta dentro da button usando a ID
    const name = parentBtn.getAttribute("data-name");
    const price = parseFloat(parentBtn.getAttribute("data-price"));
    // const img = parentBtn.getAttribute("data-img");
    // Mandado para função os parametros para colocar no carrinho

    addToCart(name, price);
  }
});

// Funçao de adcionar produto no carrinho
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    // se o item já existe, aumenta apenas a quantidade + 1
    existingItem.qtd += 1;
    Toastify({
      text: `${existingItem.name} foi adicinado`,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#37e32e",
      },
    }).showToast();
  } else {
    cart.push({
      name,
      price,
      qtd: 1,
    });

    
    Toastify({
      text: `Quantidade atualizada : ${existingItem.name} para: ${existingItem.qtd} `,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#3f0bea",
      },
    }).showToast();
  }

  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  // "forEach" percorre o array

  cart.forEach((item) => {
    // criando uma "div" com nome  "cartItemElement"
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    // Renderiza as a div na dom
    cartItemElement.innerHTML = `
   <div class="flex justify-between bg-white p-1 px-2 shadow-lg mt-1 rounded">
    <div class="flex flex-col gap-1">
        <p class="font-bold"> ${item.name}</p>
        <p >Qtd: ${item.qtd}</p>
        <p class="font-bold">R$ ${item.price.toFixed(2)}</p>
    </div>
    <div class="flex items-center">
    <button class="bg-slate-900 py-1 px-2 rounded font-bold text-white cartRemoveBtn" 
    data-name="${item.name}">
        Remover
    </button>
    </div>
   </div>
`;
    // Multiplicando o quantidade com preço
    total += item.price * item.qtd;
    // Renderiza o informações do pedido no modal de carrinho
    cartItemsContainer.appendChild(cartItemElement);
  });
  // Coloca a resultado do total e formatar como moeda no moda de carrinho
  cartTotal.innerHTML = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  // Acessa o tamanho do Array e coloca como contador de Qtd de produtos
  cartCount.innerHTML = cart.length;
}

// Remover item do carrinho

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("cartRemoveBtn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  // Verifica se o item tem no cart e manda a posição em uma variável
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];
    if (item.qtd > 1) {
      item.qtd -= 1;
      updateCartModal();
      Toastify({
        text: "Quantidade reduzida!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#1d1313",
        },
      }).showToast();
    } else {
      cart.splice(index, 1);
      updateCartModal();
      Toastify({
        text: "Item Excluido com sucesso!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#f3214e",
        },
      }).showToast();
    }
  }
}

// Verifando se esta vazio o input

andressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    andressWarn.classList.add("hidden");
    andressInput.classList.remove("border-red-500");
  }
});

// Verificado se tem item no carrinho ou se o input de endereço esta ou nao vazio para colocar um mensagem
checkoutbtn.addEventListener("click", function () {
  const isOpen = checkRestaurantOpen();

  if (!isOpen) {
    Toastify({
      text: "Estamos Fechado no momento!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ef4403, #ef4444)",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) return;
  if (andressInput.value === "") {
    andressWarn.classList.remove("hidden");
    andressInput.classList.add("border-red-500");
    return;
  }

  const cartItems = cart
    .map((item) => {
      return `${item.name}, Quantidade: (${item.qtd}) , Preço: R$${item.price} |`;
    })
    .join("");

  console.log(cartItems);

  const message = encodeURIComponent(cartItems);
  const phone = "5511965668190";

  window.open(
    `https://wa.me/${phone}?text=${message} Endereço: ${andressInput.value}`,
    "_blank"
  );

  cart = [];
  updateCartModal();
});

// indentifica se o Horário de funcinamento
function checkRestaurantOpen() {
  // pegando dia atual
  const data = new Date();

  // tira  a hora de "data"  atual
  const hora = data.getHours();
  //  retorna bolean = true ou false
  return hora >= 18 && hora < 22;
}

const spanAberto = document.getElementById("date-aberto");
const spanFechado = document.getElementById("date-fechado");

const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanAberto.classList.add("flex");
  spanFechado.classList.add("hidden");
} else {
  spanAberto.classList.add("hidden");
  spanFechado.classList.add("flex");
}
