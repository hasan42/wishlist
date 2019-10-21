import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import category from './modules/category'
import items from './modules/items'

Vue.use(Vuex)
Vue.use(Axios)

export default new Vuex.Store({
  modules: {
    category,
    items
  }
})
