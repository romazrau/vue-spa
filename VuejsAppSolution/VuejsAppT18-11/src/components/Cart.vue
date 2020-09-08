<!--single-file component (Cart.vue)-->

<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="#">購 物 車</a>
                <button class="navbar-toggler" type="button">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'cart'}"><i class="fa fa-shopping-cart"></i>{{numOfItemsInCart}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="card">
            <div class="card-header pl-5 h5">
                總計： <span>{{totalPriceForCart}}</span> 元
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>項目</th>
                            <th>品號</th>
                            <th>圖片</th>
                            <th>品名</th>
                            <th>單價</th>
                            <th>數量</th>
                            <th>小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in itemsInCart" v-bind:key="item.productid">
                            <td>{{index+1}}</td>
                            <td>{{item.productid}}</td>
                            <td><img :src="item.photo" width="90" height="90" /></td>
                            <td>{{item.productname}}</td>
                            <td>{{item.unitprice}}</td>
                            <td>
                                <button class="btn btn-sm"
                                        :class="{'btn-danger': !unitsInStockForProd(item.productid),'btn-light': unitsInStockForProd(item.productid)>0}"
                                        :disabled="!unitsInStockForProd(item.productid)" @click="plusQtyForItemInCart(item)">
                                    +
                                </button>
                                {{item.quantity}}
                                <button class="btn btn-sm" :class="{'btn-danger': item.quantity<=0,'btn-light': item.quantity>0}"
                                        :disabled="!item.quantity" @click="minusQtyForItemInCart(item)">
                                    -
                                </button>
                            </td>
                            <td>{{item.unitprice*item.quantity}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer pl-5 text-right">
                <router-link :to="{name: 'shop'}" class="btn btn-info">返回商品列表</router-link>
                <button class="btn btn-danger"><i class="fa fa-credit-card"></i> 結 帳</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    //匯入/安裝 Vuex 
    import Vuex from 'vuex'
    Vue.use(Vuex) //Install a Vue.js plugin: Vuex.

    export default {
        computed: {
            ...Vuex.mapGetters({  //Mapping Vuex.Stroe's getters to local computed properties
                numOfItemsInCart: 'getNumOfItemsInCart',
                itemsInCart: 'getItemsInCart',
                totalPriceForCart: 'getTotalPriceForCart',
                unitsInStockForProd: 'getUnitsInStockForProd'
            })
        },
        methods: {
            ...Vuex.mapMutations(['plusQtyForItemInCart', 'minusQtyForItemInCart'])
            // map `this.plusQtyForItemInCart(itemInCart)` to `this.$store.commit('plusQtyForItemInCart', itemInCart)` (以此類推)
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

