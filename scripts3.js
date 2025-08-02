document.addEventListener("DOMContentLoaded", () => {
  const bebidas = [
    {
      name: "Suco Diversos 400ml Lima , Laranja....",
      price: "6.90",
      img: "/assets/refri-8.png",
    },
    {
      name: "Coca-Cola lata 350ml",
      price: "5.90",
      img: "/assets/refri-1.png",
    },
    {
      name: "Guaraná Lata 350ml",
      price: "5.90",
      img: "/assets/refri-2.png",
    },
    {
      name: "Sprit lata 600ml",
      price: "5.90",
      img: "/assets/refri-5.png",
    },
    {
      name: "Coca-Cola Zero 350ml",
      price: "5.90",
      img: "/assets/refri-6.png",
    },
    {
      name: "Fata Uva 350ml",
      price: "5.90",
      img: "/assets/refri-7.png",
    },
    {
      name: "Fanta 350ml",
      price: "5.90",
      img: "/assets/refri-10.png",
    },
    {
      name: "Fanta 600ml",
      price: "9.90",
      img: "/assets/refri-9.png",
    },
    {
      name: "Guaraná 600ml",
      price: "9.90",
      img: "/assets/refri-3.webp",
    },
    {
      name: "Coca-Cola 600ml",
      price: "9.90",
      img: "/assets/refri-4.png",
    },
  ];

  const containerBebidas = document.querySelector(".container-bebidas");

  bebidas.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("bebidas-card");

    cartItemElement.innerHTML = `
      <div class="flex gap-2 w-full bg-gray-200 p-6 rounded-xl shadow-lg bg-cover bg-center ">
        <img src="${item.img}" alt="${
      item.name
    }" class="w-28 h-28 rounded-md hover:scale-105 hover:-rotate-2 duration-300 shadow-lg">
        <div class="w-full">
          <p class="font-bold">${item.name}</p>
          <div class="flex items-center justify-between gap-2 mt-3">
            <p class="font-bold text-2xl">R$ ${item.price.replace(".", ",")}</p>
            <button class="bg-gray-900  hover:bg-slate-700  py-2 px-3 rounded add-to-btn hover:scale-105 transition-all duration-400" data-name="${
              item.name
            }" data-price="${item.price}">
              <i class="fa fa-cart-plus text-lg text-white"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    containerBebidas.appendChild(cartItemElement);
  });
});
