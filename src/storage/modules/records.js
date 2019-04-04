export default {


  state: {

    records:{
      note:[{date:1}],
      task:[],
      reminder:[],
      medical:[]
    },

    duplicateId: 55,



  },

  getters: {
    RECORDS: state =>{
      return state.records
    },

    DUPLICATEID: state =>{
      return state.duplicateId
    }

  },

  mutations: {
    checkRecordsDuplicate(state, payload){
      let duplicate = false;
      let id = 0;
      for (let i = 0; i < state.records[payload.noteType].length; i++){
        if(payload.date === state.records[payload.noteType][i].date){
          duplicate = true;
          id = i;
        }
      }
      state.duplicateId = duplicate? -1: id;
    }
  },

  actions: {
    checkRecordsDuplicate({commit}, payload){
      // returns [id] if duplicate is exist, else: -1
      commit('checkRecordsDuplicate', payload)
    }
  }

}
