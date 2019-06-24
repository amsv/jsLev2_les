const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (this.status === 200 ) {
        resolve(this.response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error("Ошибка сети"));
    };
    xhr.send();
  });
}

class GoodsItem {
  constructor(product_name = "Товар не выбран", price = 0) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
      <div class="good-item">
      <img src="" alt="">
      <h3 class="subtitle">${this.product_name}</h3>
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
    makeGETRequest(`${API_URL}/catalogData.json`)
      .then(
        response => JSON.parse(response)
        ,
        error => alert(`Rejected: ${error}`)
      )
      .then((res) => res.forEach( ell =>this.goods.push(ell) )) 
      .then(() => this.render()); 
  }
  render(html = "") {
    const listHtml = this.goods.reduce((acc, good) => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      return acc += goodItem.render();
    }, '');
    document.querySelector(this.el).innerHTML = html + listHtml;
  }
  countTotalPrice() {
    return this.goods.reduce((sumGoods, good) => {
      return sumGoods + good.price
    },0)
  }
}

class Cart extends GoodsList {
  add(product_name, price, count) {
		let indexGood = this.goods.findIndex((elem) => elem.product_name === product_name);
		if( indexGood === -1 ) {
			this.goods.push({product_name: product_name, price: price, count: count})
		} else {
			this.goods[indexGood].count += count;
		}
	}
  delete(product_name, count) {
    let indexGood = this.goods.findIndex((elem) => elem.product_name === product_name);
    if( indexGood !== -1) {
      if ((this.goods[indexGood].count - count) > 0) {
        this.goods[indexGood].count -= count;
      } else {
        this.goods.splice(indexGood,1);          
      }
    }
  }
  renderCart() {
    this.render("<h2>Ваша карзина:</h2>");
  }
}

const list = new GoodsList();
list.fetchGoods();
list.countTotalPrice();

const cart = new Cart(".cart-list");
cart.add("Процессор",7000,1);
cart.add("Стилус",2000,1);
cart.add("Стилус",1,1);
cart.add("Стилус",1,2);
cart.add("кулер",500,3);
cart.delete("кулер",2);
cart.renderCart();



