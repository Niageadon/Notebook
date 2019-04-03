export default {
  state: {

    records:{
      note:[{date:1}],
      task:[],
      reminder:[],
      medical:[]
    },



  },

  mutations: {

  },

  getters: {
    RECORDS: state =>{
      return state.records
    },

    checkRecordsDuplicate(state, noteType, date){
      // returns [id] if duplicate is exist, else: -1
      let duplicate = false;
      let id = 0;
      for (let i = 0; i < state.records[noteType].length; i++){
        if(date === state.records[noteType][i].date){
          duplicate = true;
          id = i;
        }
      }
      console.log(duplicate, id)
      return duplicate? id : -1
    }

  },

  actions: {

  }

}
