<!--single-file component (Shop.vue)-->

<template>
    <div id="app">
        <div id="container">
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="#">商品列表</a>
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
            <fieldset class="border pl-4">
                <legend class="w-auto" style="font-size:1em;">篩選條件</legend>
                <form class="filter">
                    <label>品號: <input type="text" v-model="productid" size="20" placeholder="請輸入品號關鍵字" /></label>
                    <label>品名: <input type="text" v-model="productname" size="20" placeholder="請輸入品名關鍵字" /></label>
                </form>
            </fieldset>
            <table class="table table-striped table-hover" id="shop-table">
                <thead>
                    <tr>
                        <th>品號</th>
                        <th>圖片</th>
                        <th class="width-large justify-left">品名</th>
                        <th>單價</th>
                        <th>庫存量</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in itemList" :key="item.productid">
                        <td>{{item.productid}}</td>
                        <td><img :src="item.photo" width="70" height="70" /></td>
                        <td class="width-large justify-left">{{item.productname}}</td>
                        <td>{{item.unitprice}}</td>
                        <td>{{item.unitsinstock}}</td>
                        <td>
                            <button class="btn btn-sm"
                                    :class="{'btn-primary':item.unitsinstock>0, 'btn-light':item.unitsinstock<=0}"
                                    :disabled="!item.unitsinstock"
                                    @click="insertProdIntoCart(item)">
                                加入購物車
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="paginator1"></div>
        </div>
    </div>
</template>

<script>    
    import Vue from 'vue'
    //匯入/安裝  Vuex 
    import Vuex from 'vuex'
    Vue.use(Vuex) //Install a Vue.js plugin: Vuex.
    //匯入 jQuery
    import $ from 'jquery'; //jquery套件需先安裝(npm install jquery)
    //匯入 自定義函數
    import tableRowsPagination from '../javascripts/myPaginator.js';
    //匯入 自定義樣式表
    import '../stylesheets/myPaginator.css';

    export default {
        name: 'Shop',
        data: function () {
            return {
                productid: '',
                productname: ''
            }
        },
        methods: {            
            ...Vuex.mapMutations(['insertProdIntoCart'])
               // map `this.insertProdIntoCart(prod)` to `this.$store.commit('insertProdIntoCart', prod)`
        },
        computed: {
            ...Vuex.mapGetters({  //Mapping Vuex.Stroe's getters to local computed properties
                prodList: 'getProdList',
                numOfItemsInCart: 'getNumOfItemsInCart',
            }),
            //itemList用於儲存使用者篩選的products資料
            itemList: function () {
                if (!this.prodList) //Ajax fetch products.json 尚未完成
                    return [];
                else {
                    var vm = this;
                    return this.prodList.filter(
                        function (prod) {
                            return prod.productid.toString().indexOf(vm.productid) >= 0 &&
                                prod.productname.toUpperCase().indexOf(vm.productname.toUpperCase()) >= 0;                           
                        });
                }
            }
        },
        updated: function () {//Data變更->DOM變更->將<tbody>之<tr>重新分頁
            //以jQuery處理每個<table>的<tr>的分頁
            var rows = $("table:eq(0) tr:has(td)");
            var paginator = $("#paginator1");
            tableRowsPagination(rows, paginator, 4, 10);
            //tableRowsPagination(rows, paginator, lengthPerPage, pageAnchorsPerBatch);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

