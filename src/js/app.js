import router from './router.js';
import store from './store.js';
import App from './App.vue';

Vue.component("loading", require("./components/Loading.vue"));
Vue.component("error", require("./components/Error.vue"));

new Vue({
    router,
    store: new Vuex.Store(store),
    render: h => h(App)
}).$mount('#app');
