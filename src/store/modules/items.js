import Axios from 'axios'
// initial state
const state = {
  items: [
    { id: 1, name: 'Картошка', link: 'http://potate.com', description: 'qwe', category: 1, price: 10, done: false },
    { id: 2, name: 'Банан', link: 'http://banan.com', description: '', category: 2, price: 20, done: true },
    { id: 3, name: 'Яблоко', link: 'http://apple.com', description: '', category: 2, price: 30, done: false },
    { id: 4, name: 'Капуста', link: '', description: '', category: 1, price: 40, done: true }
  ]
}

// getters
const getters = {
  getItems: (state) => category => {
    return state.items.filter(item => item.category === category)
  },
  getMinPrice: (state) => category => {
    let arr = state.items.filter(item => item.category === category)
    let min = Math.min.apply(Math, arr.map(item => item.price))
    min = min == Infinity ? 0 : min
    return min
  },
  getMaxPrice: (state) => category => {
    let arr = state.items.filter(item => item.category === category)
    let max = Math.max.apply(Math, arr.map(item => item.price))
    max = max == -Infinity ? 0 : max
    return max
  }
}

// actions
const actions = {}

// mutations
const mutations = {
  getItemsRemote(){
    Axios.get('items.php')
      .then(function (response) {
          // console.log(response);
          state.items = response.data;
      })
      .catch(function (error) {
          // console.log(error);
      });
  },
  toggleDone (state, id) {
    let el = state.items.find(item => item.id === id)
    el.done = el.done === '1' ? '0' : '1';


    let formData = new FormData();
    formData.append('actions', 'toggle done');
    formData.append('id', id);
    formData.append('done', el.done);
    Axios({
        method: 'POST',
        url: 'items.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
        //handle success
        // console.log(response)
        mutations.getItemsRemote()
      })
      .catch(function (response) {
        //handle error
        // console.log(response)
      });
  },
  delItem (state, id) {
    // let el = state.items.findIndex(item => item.id === id)
    // state.items.splice(el, 1)

    Axios.delete('items.php', {params: {'id': id}})
      .then(function (response) {
        //handle success
        // console.log(response)
        mutations.getItemsRemote()
      })
      .catch(function (response) {
        //handle error
        // console.log(response)
      });
  },
  delItemsByCategory (state, id) {
    // let lengthArr = state.items.length - 1
    // while (lengthArr >= 0) {
    //   if (state.items[lengthArr].category === id) {
    //     state.items.splice(lengthArr, 1)
    //   }
    //   lengthArr -= 1
    // }

    Axios.delete('items.php', {params: {'category': id}})
      .then(function (response) {
        //handle success
        // console.log(response)
        mutations.getItemsRemote()
      })
      .catch(function (response) {
        //handle error
        // console.log(response)
      });
  },
  addItem (state, newItem) {
    // let maxId = Math.max.apply(Math, state.items.map(item => item.id))
    // maxId = maxId == -Infinity ? 0 : maxId
    // console.log(maxId)
    // console.log(newItem)
    // state.items.push({
    //   id: maxId + 1,
    //   name: newItem.name,
    //   link: newItem.link,
    //   image: newItem.image,
    //   category: newItem.category,
    //   price: newItem.price,
    //   done: false
    // })
    // console.log(state.items)

    let formData = new FormData();
    formData.append('actions', 'add new');
    formData.append('name', newItem.name);
    formData.append('link', newItem.link);
    formData.append('description', newItem.description);
    formData.append('category', newItem.category);
    formData.append('price', newItem.price);
    Axios({
      method: 'post',
      url: 'items.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
      //handle success
      // console.log(response)
      mutations.getItemsRemote()
    })
    .catch(function (response) {
      //handle error
      // console.log(response)
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
