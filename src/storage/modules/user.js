import  * as fireBase from 'firebase/app'
//import {try} from "q";

class User {
  constructor(id){
    this.id = id
  }
}

export default {
  state: {
    user: null,
    loadingUserInfo: false,
    success: false,  //успешный логин или регистрация
    errorMessage: '',

  },

  getters: {
    LOADINGUSERINFO: state =>{
      return state.loadingUserInfo
    },
    USER: state =>{
      return state.user
    },
    ERRORMESSAGE: state =>{
      return state.errorMessage
    },
    SUCCESS: state =>{
      return state.success
    },
    isUserAuthorized: state =>{
      return state.user !== null
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
      state.loadingUserInfo = payload
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
        commit('setUser', new User(user.user.uid));
      }
      catch (error){
        commit('setError', error.message);
      }
      finally {
        commit('setLoading', false);
      }
    },

    clearError({commit}){
      commit('setError', '')
    },

    doneAuthentication({commit}){
      commit('setSuccess', false)
    },

    async logout({commit}){
      await fireBase.auth().signOut()
      setTimeout(() =>{
        commit('setUser', null);}, 300)
    },

    autoLogin({commit}, payload){
      commit('setUser', payload.uid)
    }
  }




}
