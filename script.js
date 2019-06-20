class GoodsItem {
  constructor(title = "Товар не выбран", price = 0) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
      <div class="good-item">
      <img src="" alt="">
      <h3 class="subtitle">${this.title}</h3>
      <div class="price">${this.price} руб.</div>
      <button class="btn-add-cart btn">Добавить</button>
    </div>`;
  }
}

class GoodsList {
  constructor (el = ".goods-list") {
    this.el = el;
    this.goods = []
  }
  fetchGoods() {
    this.goods = [
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
	];
  }
  render() {
    const listHtml = this.goods.reduce((acc, good) => {
      const goodItem = new GoodsItem(good.title, good.price);
      return acc += goodItem.render();
    }, '');
    document.querySelector(this.el).innerHTML = listHtml;
  }
  countTotalPrice() {
      return this.goods.reduce((sumGoods, good) => {
        return sumGoods + good.price
      },0)
  }
}

class BasketItem {
  constructor(title = "Товар не выбран", price = 0, count = 0) {
    this.title = title;
    this.price = price;
    this.count = count;
  }
}

class BasketList {
  constructor () {
    this.goods = []
  }
  addBasketItem() {}//Добавить товар в корзину
  delBasketItem() {}//Удалить товар из корзины
  countPriceBasketList() {} // Подсчитать общюю стоимость корзины
  render() {}// Отрисовка корзины
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.countTotalPrice();
