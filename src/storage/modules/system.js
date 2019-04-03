export default {
  state: {
    drawer: false,
  },

  mutations: {
    toggleDrawer(state){
      state.drawer = !state.drawer;
    }
  },

  getters: {
    DRAWER: state =>{
      return state.drawer
    }

  },

  actions: {
    setDrawer(state){
      state.commit('toggleDrawer')
    }
  }
}
