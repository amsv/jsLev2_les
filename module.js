export const moduls = () => {
  Vue.component('button-cart', {
    template: `
    <button class="btn btn-primary" @click="$emit(\'update-value\')"><slot></slot></button>
    `
  });

  Vue.component('input-search-good', {
    template: `
        <input type="search" placeholder="Найти" class="form-control search-input" v-model="inputVal">
    `,
    props: ['value'],
    data() {
      return { inputVal: this.value }
    },
    watch: {
      inputVal(val) {
        this.$emit('input', val);
      }
    }
  })
  
  Vue.component('button-search', {
    template: `
    <button class="btn btn-primary" @click="$emit(\'update-search\')"><slot></slot></button> 
    `
  });
  
  
  Vue.component('cart', {
    template: `
    <div class="modal cart-modal" v-show="isVisibleCart">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="changeVisibleCart">
              <span>&times;</span>
            </button>
            <h4 class="modal-title">Корзина</h4>
          </div>
          <div class="modal-body">
            <hr>
              <img src="" alt="" class="good-img">
              <h3 class="good-subtitle"></h3>
              <div class="good-price"></div>              
            <hr>      
          </div>
        </div>  
      </div>  
    </div>
    `,
    data:() => ({
      isVisibleCart: false
    }),
    methods: {
      changeVisibleCart() {
        this.isVisibleCart = !this.isVisibleCart; 
      }  
    }
  })
  
  Vue.component('goods-item', {
    props: ["good"],
    template: `
      <div class="goods-item">
        <img src="" alt="" class="good-img">
        <h3 class="good-subtitle">{{ good.product_name }}</h3>
        <div class="good-price">{{ good.price }}&#32;руб.</div>
        <button class="btn btn-primary btn-add-cart" @click="$emit('add-to-cart-list', good.id)">Добавить</button>
      </div>
    `
  });
  
  Vue.component('goods-list', {
    props: ['goods'],
    computed: {
      isGoodsEmpty() {
        return this.goods.length === 0;
      },
    },
    methods: {
      addToCartList(goodId) {
        this.$emit('add-to-cart', goodId);
      }
    },
    template: `
      <div v-if="!isGoodsEmpty" class="goods-list">
         <goods-item v-for="good in goods" :key="good.id_product" :good="good" @add-to-cart-list="addToCartList"></goods-item>
      </div>
      <div v-else class="goods-not-found">
        <h2>Нет данных</h2>
      </div>`
  });
}

