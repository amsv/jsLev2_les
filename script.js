const goods = [
  { title: "Шорты", price: 150 },
  { title: "Носки", price: 50 },
  { title: "Свитер", price: 500 },
  { title: "Ботинки", price: 1500 },
  { title: "Футболка", price: 150 },
  { title: "Платье", price: 5000 },
  { title: "Плавки", price: 400 },
  { title: "Шарф", price: 800 },
  { title: "Шапка", price: 550 },
  { title: "Сандали", price: 1000 },
  { title: "Шляпа", price: 1100 },
  { title: "Пальто", price: 10000 },
  { title: "Майка", price: 150 },
  { title: "Пуховик", price: 15000 },
]

const renderGoodsItem = (title = "Товар не выбран", price = "0") => `<div class="good-item"><img src="" alt=""><h3 class="subtitle">${title}</h3><div class="price">${price} руб.</div><button class="btn-add-cart btn">Добавить</button>
</div>`;

const renderGoodsList = ( list = [{title:"Товар не выбран", price: "0"}] ) =>  document.querySelector(".good-list").innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join("");
// значение innerHTML строка, а результат map массив. При присвоение происходит привидения массива к строке с соединением елементов массива запятыми. Используя join("") можно элементы массива соеденить "" и превести к строке, а затем эту строку присвоить innerHTML

renderGoodsList(goods);
