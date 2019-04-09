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
    success: false,
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
    SUCCESS: state =>{
      return state.success
    }

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

    setSuccess(state, payload){
      state.success = payload
    },

  },

  actions: {
    async registerUser({commit}, {email, password}){
      commit('setLoading', true);
      commit('setError', '');
      commit('setSuccess', false);

      /*fireBase.auth().createUserWithEmailAndPassword(email, password)
        .then (user =>{
          console.log(user);
          console.log('hey');
          commit('setLoading', false);
          commit('setUser', new User(user.user.uid));
          commit('setSuccess', true);
        })
        .catch (error =>{
          console.log(error);
          commit('setLoading', false);
          commit('setError', error.message);

        })*/
        try {
          const user = await fireBase.auth().createUserWithEmailAndPassword(email, password);
          commit('setUser', new User(user.uid));
          commit('setSuccess', true);
        }
        catch(error){
          commit('setLoading', false);
          commit('setError', error.message);
          //throw error
        }
        finally {
          commit('setLoading', false);
        }


    },

    async login({commit}, {email, password}){
      commit('setLoading', true);
      commit('setSuccess', false);
      commit('setError', '');

      try {
        const user = await fireBase.auth().signInWithEmailAndPassword(email, password);
        commit('setSuccess', true);
      }
      catch (error){
        commit('setError', error.message);
      }
      finally {
        commit('setLoading', false);
      }

      /*fireBase.auth().signInWithEmailAndPassword(email, password)
        .then(login =>{
          console.log('login', login);
          commit('setLoading', false);
        })
        .catch(error =>{
          console.log('error', error);
          commit('setError', error.message);
          commit('setLoading', false);
        })*/
    },

    clearError({commit}){
      commit('setError', '')
    },

    doneAuthentication({commit}){
      commit('setSuccess', false)
    }
  }




}
