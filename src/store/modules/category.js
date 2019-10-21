import Axios from 'axios'
// initial state
const state = {
  category: [
    { id: 1, name: 'Овощи', done: false },
    { id: 2, name: 'Фрукты', done: true }
  ]
}

// getters
const getters = {
  getCategorys: (state) => {
    return state.category
  }
}

// actions
const actions = {}

// mutations
const mutations = {
  getCategoryRemote(){
    Axios.get('category.php')
      .then(function (response) {
          // console.log(response);
          state.category = response.data;
      })
      .catch(function (error) {
          // console.log(error);
      });
  },
  toggleDone (state, id) {
    let el = state.category.find(item => item.id === id)
    el.done = el.done === '1' ? '0' : '1';

    let formData = new FormData();
    formData.append('actions', 'toggle done');
    formData.append('id', id);
    formData.append('done', el.done);
    Axios({
        method: 'POST',
        url: 'category.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
        //handle success
        // console.log(response)
        mutations.getCategoryRemote()
      })
      .catch(function (response) {
        //handle error
        // console.log(response)
      });
  },
  addCategory (state, name) {
    // let maxId = Math.max.apply(Math, state.category.map(item => item.id))
    // maxId = maxId == -Infinity ? 0 : maxId
    // console.log(maxId)
    // state.category.push({
    //   id: maxId + 1,
    //   name: name,
    //   done: false
    // })

    let formData = new FormData();
    formData.append('actions', 'add new');
    formData.append('name', name);
    Axios({
      method: 'post',
      url: 'category.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
      //handle success
      // console.log(response)
      mutations.getCategoryRemote()
    })
    .catch(function (response) {
      //handle error
      // console.log(response)
    });
  },
  delCategory (state, id) {
    // let el = state.category.findIndex(item => item.id === id)
    // state.category.splice(el, 1)

    let formData = new FormData();
    formData.append('id', id);
    Axios.delete('category.php', {params: {'id': id}})
      .then(function (response) {
        //handle success
        // console.log(response)
        mutations.getCategoryRemote()
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
