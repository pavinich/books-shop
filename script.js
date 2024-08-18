const items = [
  {
    title: "Моя книга животных",
    publishing: "РОБИНС",
    languages: ["рус"],
    price: 18,
    img: "./img/animals.jpg",
    rating: 3.8,
  },
  {
    title: "Агния Барто. Стихи детям",
    publishing: "ЭКСМО",
    languages: ["рус"],
    price: 23,
    img: "./img/barto.jpg",
    rating: 4.3,
  },
  {
    title: "Body. Части тела",
    publishing: "CLEVER",
    languages: ["рус", "eng"],
    price: 9,
    img: "./img/body.jpg",
    rating: 2.2,
  },
  {
    title: "Развиваем зрение с рождения»",
    publishing: "РОБИНС",
    languages: ["рус"],
    price: 17,
    img: "./img/development.jpg",
    rating: 4.7,
  },
  {
    title: "Мир вокруг",
    publishing: "МАНН, ИВАНОВ И ФЕРБЕР",
    languages: ["рус"],
    price: 19,
    img: "./img/encyclopedia.jpg",
    rating: 2.5,
  },
  {
    title: "Russian Fairy Tales",
    publishing: "АСТ",
    languages: ["eng"],
    price: 13,
    img: "./img/fairytales.jpg",
    rating: 4.5,
  },
  {
    title: "Колобок",
    publishing: "Мозаика-Синтез",
    languages: ["рус"],
    price: 13,
    img: "./img/kolobok.jpg",
    rating: 4.9,
  },
  {
    title: "Лабиринты по городам и странам",
    publishing: "CLEVER",
    languages: ["рус"],
    price: 19,
    img: "./img/labyrinths.jpg",
    rating: 4.4,
  },
  {
    title: "Маленький принц. The Little Prince",
    publishing: "Детская литература",
    languages: ["рус", "eng"],
    price: 21,
    img: "./img/littlePrince.jpg",
    rating: 4.8,
  },
  {
    title: "Теремок",
    publishing: "Мозаика-Синтез",
    languages: ["рус"],
    price: 14,
    img: "./img/teremok.jpg",
    rating: 3.2,
  },
  {
    title: "Винни-Пух",
    publishing: "Детвора",
    languages: ["рус"],
    price: 47,
    img: "./img/winnie.jpg",
    rating: 3.7,
  },
  {
    title: "Harry Potter",
    publishing: "Scholastic",
    languages: ["eng"],
    price: 47,
    img: "./img/harryPotter.jpg",
    rating: 5.0,
  },
];


let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareShopItem(shopItem) {
  const { title, publishing, languages, img, price, rating } = shopItem;
  
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = publishing;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price} р.`;

  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const languagesHolder = item.querySelector(".languages");

  languages.forEach((lang) => {
    const element = document.createElement("span");
    element.textContent = lang;
    element.classList.add("lang");
    languagesHolder.append(element);
  });

  return item;
}

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  
  if (!arr.length) {
    nothingFound.textContent = "По вашему запросу ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  
  if (a.title < b.title) {
    return -1;
  }
  
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }

  renderItems(currentState);
});


const searchInput = document.querySelector("#search-input");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );

  currentState.sort((a, b) => sortByAlphabet(a, b));

  sortControl.selectedIndex = 0;

  renderItems(currentState);
}

searchInput.addEventListener("search", applySearch);