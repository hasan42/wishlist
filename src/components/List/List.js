import Item from '../Item/Item.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'List',
  props: ['name', 'id', 'done'],
  components: {
    Item
  },
  data () {
    return {
      collapseActive: false,
      items: [],
      form: {
        name: '',
        link: '',
        description: '',
        price: '',
        category: ''
      }
    }
  },
  computed: {
    itemsStore () {
      return this.$store.getters['items/getItems'](this.id)
    },
    showMinPrice () {
      return this.$store.getters['items/getMinPrice'](this.id)
    },
    showMaxPrice () {
      return this.$store.getters['items/getMaxPrice'](this.id)
    }
  },
  mounted: function () {
    this.collapseName = 'collapse-' + this.id;
    this.$store.commit('items/getItemsRemote')
  },
  methods: {
    showCollpase () {
      this.collapseActive = !this.collapseActive
    },
    toggleDone: function (id) {
      this.$store.commit('category/toggleDone', this.id)
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.form.category = this.id
      // console.log(this.form)
      this.$store.commit('items/addItem', this.form)
      this.items = this.$store.getters['items/getItems'](this.id)
      this.form = {
        name: '',
        link: '',
        description: '',
        price: '',
        category: ''
      }
    },
    delIt: function (id) {
      this.$store.commit('category/delCategory', this.id)
      this.$store.commit('items/delItemsByCategory', this.id)
    }
  }
}
