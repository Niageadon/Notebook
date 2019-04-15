import  * as fireBase from 'firebase/app'


export default {


  state: {

    duplicateId: -1,
    currentRecordType: 'note',
    records:{
      note:[],
      task:[],
      reminder:[],
      medical:[]
    },



  },

  getters: {
    RECORDS: state =>{
      return state.records
    },



  },

  mutations: {
    checkForDuplicate(state, payload){
      state.duplicateId = -1;
      // проверяет на наличие записей выбранного типа в выбранную дату, при нахождении возвращает id элемента в массиве записей
      let duplicate = false;
      let id = 0;
      for (let i = 0; i < state.records[payload.recordType].length; i++){
        if(payload.newRecord.date === state.records[payload.recordType][i].date){
          duplicate = true;
          id = i;
        }
      }
      state.duplicateId = duplicate? id: -1;
    },

    sortRecords(state, recordType){
      state.records[recordType] = state.records[recordType].sort(
        function compareAge(noteA, noteB) {
          let a = noteA.date.slice(0, 4) + noteA.date.slice(5, 7) + noteA.date.slice(8, 10);
          let b = noteB.date.slice(0, 4) + noteB.date.slice(5, 7) + noteB.date.slice(8, 10);
          return a - b;
        });
    },

    addNewRecord(state, {recordType, newRecord}){
      //console.log('ge',state, {recordType, newRecord})
      state.records[recordType].push(newRecord)
    },

    setCurrentRecordType(state, payload){
      state.currentRecordType = payload;
    },

    addContentToRecord(state, {recordType, newRecord}){
      state.records[recordType][state.duplicateId].body += '\n\n' + newRecord.body;

      // add title
      if(state.records[recordType][state.duplicateId].title === ''){
        state.records[recordType][state.duplicateId].title = newRecord.title;
      }
      else if (!(newRecord.title === ''))
      {
        state.records[recordType][state.duplicateId].title += '\u0009' + '&' + '\u0009' + newRecord.title;
      }
    },

    setEditRecord(state, payload){
      // сохраняет изменения в записи
      let recordId = payload.recordId;
      let type = state.currentRecordType;
        // при изменении типа записи if(!(payload.recordType === state.currentRecordType)){};
      state.records[type][recordId].title = payload.title;
      state.records[type][recordId].date = payload.date;
      state.records[type][recordId].body = payload.body;
    },

  },

  actions: {
    NewRecord({state, commit}, {recordType, newRecord}){
      //console.log(recordType, newRecord);
      let recordNotNull = state.records[recordType].length;

      if (recordNotNull) // if not null
        commit('checkForDuplicate', {recordType, newRecord});

      if(state.duplicateId === -1)
      {// при отсутствии дубликата
        commit('addNewRecord', {recordType, newRecord});
        if (recordNotNull) commit('sortRecords', recordType);
      }
      else
      {
        commit('addContentToRecord', {recordType, newRecord});
      }
    },

    saveEditRecord({commit}, payload){
      commit('setEditRecord', payload);
    },

    async sendRecordsToServer(){

    },

    setCurrentRecordType({commit}, payload){
      // получаем текущий отображаемый тип запесей
      commit('setCurrentRecordType', payload)
    }
  }

}
