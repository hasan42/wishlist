import List from '../List/List.vue'

export default {
  name: 'Wish',
  components: {
    List
  },
  data () {
    return {
      lists: [],
      form: {
        name: ''
      }
    }
  },
  computed: {
    listsStore () {
      return this.$store.getters['category/getCategorys']
    }
  },
  mounted: function () {
    this.$store.commit('category/getCategoryRemote')
  },
  methods: {
    iClick() {
      console.log('iClick')
      this.$store.commit('category/getCategoryRemote')
    },
    onSubmit (evt) {
      evt.preventDefault()
      // console.log(this.form.name)
      this.$store.commit('category/addCategory', this.form.name)
      this.form.name = ''
    }
  }
}
