export default {
  name: 'Item',
  props: ['id', 'name', 'link', 'description', 'price', 'done'],
  mounted: function () {
    // console.log(this)
  },
  methods: {
    toggleDone: function (id) {
      this.$store.commit('items/toggleDone', this.id)
    },
    delIt: function (id) {
      this.$store.commit('items/delItem', this.id)
    }
  }
}
