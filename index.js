import { moduls } from './module.js';
moduls();

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: ''
  },
  methods: {
    addToCart(goodId) {
      this.makePOSTRequest('/addToCart', JSON.stringify({goodId}));
    },    
    makeGETRequest(url) {
      return new Promise( (resolve, reject) => {
        let xhr;
    
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject( 'Microsoft.XMLHTTP');
        }
        
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4 ) return;
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        };
    
        xhr.open('GET', url);
        xhr.send();
      })  
    },
    makePOSTRequest(url, data) {
      return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = () => {
          if (xhr.readyState !== 4) return;
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            this.showError('Ошибка обработки запроса');
            reject(xhr.status)
          }
        };

        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
        xhr.send(data);
      })
    },
    filterGoods(value) {
      this.currentSearch = new RegExp(value, 'i');
    },
    toggleCart() {
      this.$refs.cart.toggleCart();
    },
    changeVisibleCart() {
      this.$refs.cart.changeVisibleCart(); 
    } 
  },
  async mounted() {
    const goods = await this.makeGETRequest(`/catalogData`);
    this.goods = goods;
    this.filteredGoods = goods; 
  }
})

//module.js



// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class GoodsItem {
//   constructor(product_name = 'Товар не выбран', price = 0) {
//     this.product_name = product_name;
//     this.price = price;
//   }
//   render() {
//     return `
//       <div class='goods-item'>
//       <img src='' alt=''>
//       <h3 class='subtitle'>${this.product_name}</h3>
//       <div class='price'>${this.price} руб.</div>
//       <button class='btn-add-cart btn'>Добавить</button>
//     </div>`;
//   }
// }

// class GoodsList {
//   constructor (el = '.goods-list') {
//     this.el = el;
//     this.goods = [];
//     this.filteredGoods = [];
//   }
  
//   async fetchGoods() {
//     try {
//       const goods = await makeGETRequest(`${API_URL}/catalogData.json`);
//       this.goods = JSON.parse(goods);
//       this.filteredGoods = [ ...this.goods];   
//       return this.goods;
//     } catch (error) {
//       return error;
//     }    
//   }
//   render(html = '') {
//     const listHtml = this.goods.reduce((acc, good) => {
//       const goodItem = new GoodsItem(good.product_name, good.price);
//       return acc += goodItem.render();
//     }, '');
//     document.querySelector(this.el).innerHTML = html + listHtml;
//   }
//   get totalSum() {
//     return this.goods.reduce((sumGoods, good) => {
//       if(good.price)
//       return sumGoods += Number(good.price)
//     },0)
//   }
//   render() {
//     const listHtml = this.filteredGoods.reduce((acc, good) => {
//       const goodItem = new GoodsItem(good.product_name, good.price);
//       return acc += goodItem.render();
//     }, '');
//     document.querySelector(this.el).innerHTML = listHtml;
//   }
// }

// class Cart extends GoodsList {
//   add() {
//     return makeGETRequest(`${API_URL}/addToBasket.json`);
// 	}
//   delete() {
//     return makeGETRequest(`${API_URL}/deleteFromBasket.json`)
//   }

//   fetchGoods() {
//     return makeGETRequest(`${API_URL}/getBasket.json`).then((res) => {
//       const cart = JSON.parse(res);
//       this.goods = cart.content;
//     }).catch(e => e);
//   }
// }

// class CartItem extends GoodsItem {
//   constructor(product_name = 'Товар не выбран', price = 0, count = 1) {
//     super(product_name, price);
//     this.count = count;
//   }
  
//   set setCount(count) {
//     this.count +=count;
//   }

//   get getCount() {
//     return this.count;
//   }
// }

// const init = async () => {
//   try {
//     const list = new GoodsList();
//     addEventHandlers(list);
//     await list.fetchGoods();
//     list.render();    
//   } catch (e) {
//     console.error(e);
//   }
// };