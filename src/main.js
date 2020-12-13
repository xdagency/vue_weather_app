import { createApp } from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
// import store from './store/index'
// import Dashboard from './views/Dashboard'

// vue config settings
// Vue.config.productionTip = false

// Router
// Vue.use(VueRouter);

// define the routes
// const routes = [
//     { path: '/', component: HelloWorld } 
// ]

// create router instance
// const router = new VueRouter({
//     routes, // short for routes: routes
//     mode: 'history'
// })

createApp(App).mount('#app')

// new Vue({
//     router,
//     store,
//     render: h => h(App),
//   }).$mount('#app')