import  * as fireBase from 'firebase/app'
import 'firebase/database'
import userState from './user'

export default {


  state: {

    duplicateId: -1,
    currentRecordType: 'note',
    records:{
      note:[],
      task:[],
      reminder:[],
      med:[]
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

    setRecordsArray(state, payload){
      state.records = payload;
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

    setLoading(state, payload){
      state.loading = payload;
    },
  },

  actions: {
    async NewRecord({state, commit}, {recordType, newRecord}){
      //console.log(recordType, newRecord);
      commit('setCurrentRecordType', recordType);
      let recordNotNull = state.records[recordType].length;
      if (recordNotNull) // if not null
        commit('checkForDuplicate', {recordType, newRecord});

      //можно будет делать запрос по дате и по ответу определять дубликат ли
      if(state.duplicateId === -1)
      {// при отсутствии дубликата
        commit('addNewRecord', {recordType, newRecord});
        if (recordNotNull) commit('sortRecords', recordType);
      }
      else
      {
        commit('addContentToRecord', {recordType, newRecord});
      }

      let user = userState.state.user;
      console.log(user)
      console.log(newRecord)
      const db = fireBase.firestore();
      try
      {
        //console.log(newRecord)
        await db.collection("users").doc(user).collection(state.currentRecordType)
          .doc(newRecord.date).set(newRecord);

      }
      catch (e) {
        throw e
      }
    },

    async saveEditRecord({commit}, payload){
      //commit('setEditRecord', payload);

    },

    async sendRecordsToServer(){
      /*try {
      fireBase.database().ref('records').push
      }*/
    },

    setCurrentRecordType({commit}, payload){
      // получаем текущий отображаемый тип запесей
      commit('setCurrentRecordType', payload)
    },

    async getRecordsFromServer({commit}){
      //commit('setLoading', true);
      let userID = userState.state.user;
      let records = {};
      const noteFB = fireBase.firestore().collection('users').doc(userID)
        .collection('note');//.doc().collection('2019-04-19')//.doc('data');
      const taskFB = fireBase.firestore().collection('users').doc(userID)
        .collection('task');
      const reminderFB = fireBase.firestore().collection('users').doc(userID)
        .collection('reminder');
      const medFB = fireBase.firestore().collection('users').doc(userID)
        .collection('med');

      try{
        const note    = await noteFB.get();
        const task    = await taskFB.get();
        const reminder  = await reminderFB.get();
        const med     = await medFB.get();

        records['note']     = note.docs.map(doc => ({/*__id: doc.id, */...doc.data()}));
        records['task']     = task.docs.map(doc => ({...doc.data()}));
        records['reminder']   = reminder.docs.map(doc => ({...doc.data()}));
        records['med']      = med.docs.map(doc => ({...doc.data()}));
        /*records.docs.forEach(doc => {
          markers.push(doc.data());
        })*/
        commit('setRecordsArray', records);
        commit('setLoading', false);

        //commit

      }
      catch (e) {
        commit('setLoading', false);
        throw e;
        //console.log(e)
      }
    }
  }

}
