<!--single-file component (App.vue)-->

<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">美食家超市</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-menu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="main-menu">
            <ul class="navbar-nav mr-auto">
              <li
                v-for="nav in navs"
                :key="nav.id"
                :class="['nav-item', { active: currentRouteName == nav.id }]"
              >
                <router-link
                  class="nav-link"
                  :to="{ name: nav.to }"
                  @click="currentRouteName = nav.id"
                >{{ nav.title }}</router-link>
              </li>
            </ul>

            <div
              v-for="nav in myNavs"
              :key="nav.id"
              :id="nav.id"
              :class="['li_menutitle', 'header_nav', { active: currentRouteName == nav.id }]"
            >
              <router-link
                :to="{ name: nav.to }"
                class="nav-underline"
                @click="currentRouteName = nav.id"
              >
                {{ nav.title }}
                <br />
                {{ nav.title2 }}
              </router-link>
            </div>
          </div>
        </div>
      </nav>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      navs: [
        { id: "shop", title: "商品列表", to: "shop" },
        { id: "cart", title: "購物車2", to: "cart" },
      ],
      currentRouteName: "",
      myNavs: [
        { id: "navbar_activity", title: "Activity", title2: "活動",  to: "activity" },
        { id: "navbar_community", title: "Community",  title2: "社團", to: "community" },
      ],
    };
  },
};
</script>

<style></style>
