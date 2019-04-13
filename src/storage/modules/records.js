import  * as fireBase from 'firebase/app'


export default {


  state: {

    records:{
      note:[],
      task:[],
      reminder:[],
      medical:[]
    },

    duplicateId: -1,



  },

  getters: {
    RECORDS: state =>{
      return state.records
    },



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
    },


  },

  actions: {
    async sendRecordsToServer(){

    }
  }

}
