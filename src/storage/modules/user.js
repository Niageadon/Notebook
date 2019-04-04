import  * as fireBase from 'firebase'

class User {
  constructor(id){
    this.id = id
  }
}

export default {
  state: {
    user: null,
  },

  getters: {


  },

  mutations: {
    setUser(state, payload){
      state.user = payload
    }

  },

  actions: {
    registerUser({commit}, {email, password}){
      fireBase.auth().createUserWithEmailAndPassword(email, password)
        .then(user =>{
          console.log(user);
        commit('setUser', new User(user.uid))
        })
    }
  }




}
