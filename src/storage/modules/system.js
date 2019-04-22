export default {
  state: {
    drawer: false,
    systemLoading: false,

  },

  mutations: {
    toggleDrawer(state){
      state.drawer = !state.drawer;
    }
  },

  getters: {
    DRAWER: state =>{
      return state.drawer
    },

    SYSTEMLOADING: state =>{
      return state.loading
    },

  },

  actions: {
    setDrawer(state){
      state.commit('toggleDrawer')
    }
  }
}
