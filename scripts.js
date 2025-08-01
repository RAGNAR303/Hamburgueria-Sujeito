const menu = document.getElementById("menu");
const cartModal = document.getElementById("card-modal");
const exitModal = document.getElementById("close-modal-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const cartBtn = document.getElementById("card-btn");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warning");

let cart = [];

// Abrir modal
cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

// Fechar modal clicando fora ou no botão "fechar"
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal || event.target === exitModal) {
    cartModal.style.display = "none";
  }
});

// Delegação de eventos para botões .add-to-btn
menu.addEventListener("click", function (event) {
  const button = event.target.closest(".add-to-btn");
  if (button) {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    addToCart(name, price);
  }
});

// Função para adicionar produto ao carrinho
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.qtd += 1;
    Toastify({
      text: `${existingItem.name} quantidade foi para (${existingItem.qtd})`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
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
      text: `${name} foi adicionado`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#3f0bea",
      },
    }).showToast();
  }

  updateCartModal();
}

// Função para atualizar o modal do carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemElement.innerHTML = `
      <div class="flex justify-between bg-white p-1 px-2 shadow-lg mt-1 rounded">
        <div class="flex flex-col gap-1">
          <p class="font-bold">${item.name}</p>
          <p>Qtd: ${item.qtd}</p>
          <p class="font-bold">R$ ${item.price.toFixed(2).replace(".", ",")}</p>
        </div>
        <div class="flex items-center">
          <button class="bg-slate-900 py-1 px-2 rounded font-bold text-white cartRemoveBtn" data-name="${
            item.name
          }">
            Remover
          </button>
        </div>
      </div>
    `;

    total += item.price * item.qtd;
    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.innerHTML = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
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
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];
    if (item.qtd > 1) {
      item.qtd -= 1;
      updateCartModal();
      Toastify({
        text: `${item.name} Quantidade reduzida!`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#1d1313",
        },
      }).showToast();
    } else {
      cart.splice(index, 1);
      updateCartModal();
      Toastify({
        text: `${item.name} excluído com sucesso!`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#f3214e",
        },
      }).showToast();
    }
  }
}

// Verificar se o input de endereço está vazio
addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressWarn.classList.add("hidden");
    addressInput.classList.remove("border-red-500");
  }
});

// Verificar se tem item no carrinho e se o endereço está preenchido
checkoutBtn.addEventListener("click", function () {
  const isOpen = checkRestaurantOpen();

  if (!isOpen) {
    Toastify({
      text: "Estamos fechados no momento!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ef4403, #ef4444)",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  const cartItems = cart
    .map((item) => {
      return `${item.name}, Quantidade: (${item.qtd}), Preço: R$${item.price
        .toFixed(2)
        .replace(".", ",")} |`;
    })
    .join("");

  const message = encodeURIComponent(cartItems);
  const phone = "5511965668190";

  window.open(
    `https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,
    "_blank"
  );

  cart = [];
  updateCartModal();
});

// Verificar horário de funcionamento
function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
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
