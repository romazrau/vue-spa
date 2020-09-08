import Vue from 'vue';

//匯入/安裝 Vuex 與 VueRouter
import Vuex from 'vuex'; //vuex套件須先安裝(npm install vuex)
import VueRouter from 'vue-router'; //vue-router套件須先安裝(npm install vue-router)
Vue.use(Vuex); //Install a Vue.js plugin: Vuex.
Vue.use(VueRouter); //Install a Vue.js plugin: Vue-Router.

//匯入 單檔元件(Single File Ccomponents)
/*
之前的全域/區域元件可能僅適合中小型的專案，對於較複雜的專案，一般會使用單檔元件(.vue) 。
單檔元件可解決全域/區域元件所遭遇的問題，例如:
1. 字串模板無法提供syntax highlighting功能且不易排版
2. 元件的模板不支援CSS
等等
*/
import App from './App.vue'; 
import shop from './components/Shop.vue';
import cart from './components/Cart.vue';

import Activity from './components/Activity.vue';
import Community from './components/Community.vue'

//匯入 jQuery
import $ from 'jquery'; //jquery套件需先安裝(npm install jquery)(註: 因index.html會匯入jQuery，左列在真正佈署到Web Server上時是不需的)

//匯入 自定義樣式表
import './stylesheets/style.css';

Vue.config.productionTip = true;//設定在瀏覽器之Console上顯示「生產模式提示」訊息

//---------------Vuex.Store---------------//
var store = new Vuex.Store({
    state: {
        prodList: [],
        cart: []
    },
    getters: {
        getProdList: function (state) {
            return state.prodList;
        },
        getUnitsInStockForProd(state) {
            return function (prodid) {//元件呼叫本getter時傳遞一個引數(prodid)進來->需回傳一個function 
                var prod = state.prodList.find(p => p.productid == prodid);
                return prod.unitsinstock;
            }
        },
        getNumOfItemsInCart: function (state) {
            return state.cart.length;
        },
        getItemsInCart: function (state) {
            return state.cart;
        },
        getTotalPriceForCart: function (state) {
            var total = 0;
            for (var i = 0; i < state.cart.length; i++) {
                var unitprice = state.cart[i].unitprice;
                var quantity = state.cart[i].quantity;
                total += unitprice * quantity;
            }
            return total;
        }
    },
    mutations: {
        loadProdList: function (state, prods) {
            state.prodList = prods;
        },
        insertProdIntoCart: function (state, prod) {
            //將商品項目加入購物車
            var cartItem = {};
            cartItem.productid = prod.productid;
            cartItem.productname = prod.productname;
            cartItem.photo = prod.photo;
            cartItem.unitprice = prod.unitprice;
            cartItem.quantity = 1; //***
            state.cart.push(cartItem);
            //該商品的庫存量扣1
            prod.unitsinstock--;
        },
        minusQtyForItemInCart: function (state, itemInCart) {
            if (itemInCart.quantity <= 0)
                return;
            //扣購物車商品項目之購買數量
            itemInCart.quantity--;
            //加該商品的庫存量
            var prod = state.prodList.find(p => p.productid == itemInCart.productid);
            prod.unitsinstock++;
        },
        plusQtyForItemInCart: function (state, itemInCart) {
            var prod = state.prodList.find(p => p.productid == itemInCart.productid)
            if (prod.unitsinstock > 0) {//庫存量>0
                //加購物車商品項目之購買數量
                itemInCart.quantity++;
                //減該商品的庫存量
                prod.unitsinstock--;
            }
        }
    },
    actions: {
        //從Web伺服器載入商品列表(products.json)
        loadProdList: function (context) {
            $.ajax({
                method: 'get',
                url: './products.json',
                dataType: 'json',
                success: function (data) {
                    context.commit('loadProdList', data); //commit mutation with payload: data
                }
            });
        }
    }
});

//---------------VueRouter---------------//
var routes = [
    {
        path: "/shop",
        name: "shop",
        component: shop
    },
    {
        path: "/cart",
        name: "cart",
        component: cart
    },
    {
        path: "/*",
        redirect: "/shop"
    },

    {
        path: "/activity",
        name: "activity",
        component: Activity
    },
    {
        path: "/community",
        name: "community",
        component: Community
    },

];
var router = new VueRouter({   
    routes: routes
});

//---------------root Vue instance---------------//
new Vue({   
    router: router,
    store: store,
    render: h => h(App), //字串模板的代替方案。
                         //該渲染函數接收一個createElement方法作為第一個參數來建立VNode(Virtual Node)。
                         //也可寫成render: function(h){ return h(App); } 
                         //App為經vue-loader處理解析過的單檔元件(Single File Component)
    created: function () {
        this.$store.dispatch('loadProdList');//從Web伺服器載入商品列表(products.json)
    }
}).$mount('#app');
