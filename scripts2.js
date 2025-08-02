document.addEventListener("DOMContentLoaded", () => {
  const hamburguer = [
    {
      name: "Hamburguer Duplo",
      price: "18.90",
      img: "/assets/hamb-1.png",
    },
    {
      name: "Hamburguer da Casa",
      price: "32.90",
      img: "/assets/hamb-2.png",
    },
    {
      name: "Hamburguer Duplo Queijo",
      price: "19.90",
      img: "/assets/hamb-3.png",
    },
    {
      name: "Hamburguer Salada",
      price: "34.90",
      img: "/assets/hamb-4.png",
    },
    {
      name: "Hamburguer Vegan",
      price: "35.90",
      img: "/assets/hamb-5.png",
    },
    {
      name: "Hamburguer Tripo",
      price: "39.90",
      img: "/assets/hamb-6.png",
    },
    {
      name: "Hamburguer Frango",
      price: "42.90",
      img: "/assets/hamb-7.png",
    },
    {
      name: "Hamburguer Tomate Temperado",
      price: "15.90",
      img: "/assets/hamb-8.png",
    },
    {
      name: "Hamburguer Rustico",
      price: "31.90",
      img: "/assets/hamb-9.png",
    },
    {
      name: "Hamburguer Big Bife",
      price: "37.90",
      img: "/assets/hamb-10.png",
    },
    {
      name: "Hamburguer Frango Grelhado",
      price: "36.90",
      img: "/assets/hamb-11.png",
    },
    {
      name: "Hamburguer Cheddar Especial",
      price: "34.90",
      img: "/assets/hamb-12.png",
    },
    {
      name: "Hamburguer Barbecue",
      price: "30.90",
      img: "/assets/hamb-13.jpeg",
    },
    {
      name: "Hamburguer Peito de Peru",
      price: "38.90",
      img: "/assets/hamb-14.png",
    },
  ];

  const containerBurguer = document.querySelector(".container-burguer");

  hamburguer.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("burguer-card");

    cartItemElement.innerHTML = `
      <div class="flex gap-2 w-full bg-gray-200 p-6 rounded-xl shadow-lg bg-cover bg-center" >
        <img src="${item.img}" alt="${
      item.name
    }" class="w-28 h-28 rounded-md hover:scale-105 hover:-rotate-2 duration-300 shadow-lg" >
        <div class="w-full">
          <p class="font-bold">${item.name}</p>
          <p class="text-sm">Pão levinho de fermentação natural da trigou, burger 160g, queijo prato e maionese da casa</p>
          <div class="flex items-center justify-between gap-2 mt-3">
            <p class="font-bold text-2xl">R$ ${item.price.replace(".", ",")}</p>
            <button class="bg-gray-900  hover:bg-slate-700 py-2 px-3 rounded add-to-btn  hover:scale-105 transition-all duration-400" data-name="${
              item.name
            }" data-price="${item.price}">
              <i class="fa fa-cart-plus text-lg text-white"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    containerBurguer.appendChild(cartItemElement);
  });
});
