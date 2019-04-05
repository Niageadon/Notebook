import  * as fireBase from 'firebase'
//import {try} from "q";

class User {
  constructor(id){
    this.id = id
  }
}

export default {
  state: {
    user: null,
    loading: false,
    errorMessage: '',
  },

  getters: {
    LOADING: state =>{
      return state.loading
    },
    USER: state =>{
        return state.user
    },
    ERRORMESSAGE: state =>{
        return state.errorMessage
    },

  },

  mutations: {
    setUser(state, payload){
      state.user = payload
    },

    setError(state, payload){
      state.errorMessage = payload
    },

    setLoading(state, payload){
      state.loading = payload
    },


  },

  actions: {
    async registerUser({commit}, {email, password}){
      commit('setLoading', true);
      commit('setError', '');

      try {
      const user = fireBase.auth().createUserWithEmailAndPassword(email, password);
        console.log(user);
        commit('setLoading', false);
        commit('setUser', new User(user.uid));
      }
      catch(error){
        commit('setLoading', false);
        commit('setError', error.i.message);
        throw error
      }
    }
  }




}
