import  * as fireBase from 'firebase/app'
import 'firebase/database'
import userState from './user'

export default {
  state: {
    writeDone: false,
    record: '',
    duplicateId: -1,
    currentRecordType: 'note',
    records: {note:[], task:[], reminder:[], med:[]},
    existRecord:{},
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
      state.records[type][recordId].date = payload.date;
      state.records[type][recordId].body = payload.body;
    },

    setLoading(state, payload){
      state.loading = payload;
    },

    setExistRecord(state, payload){
      state.existRecord = payload;
    },

    setWriteDone(state, payload){
      state.writeDone = payload;
    },

    setRecord(state, payload){
      state.record = payload;
    },

  },

  actions: {

    async NewRecord({state, commit}, {recordType, newRecord}){
      /////////////////////////////////////////////
      // Проверяем наличие записи с текущей датой, делая запрос на сервер
      //    | если нету, то заполняем данные и загружаем на сервер
      //    | есть есть, то выгружаем имеющиеся данные, редактируем их и отправвляем на сервер обновлённую версию
      /////////////////////////////////////////////
      const fb = fireBase.firestore();
      //commit('setWriteDone', true);               //забираем данные из текстового редактора
      const userID = userState.state.user;
      //let newRecord = {date:'2019-04-01'};
      commit('setCurrentRecordType', recordType);
      let record = newRecord;
      let test = {};
      record.body = state.record;
      // check for date duplicate

      let duplicate = false;
      try
      {
      await fb.collection('users').doc(userID).collection('records').doc('data')
        .collection(recordType).doc(newRecord.date).get()
        .then( doc =>{
          if(doc.exists){                                       // при существовании записи для текущей даты
            //commit('setExistRecord', doc.data());
            duplicate = true;
            record.body = doc.data().body + '<br>' + record.body;   // дополняем имеющийся текст
            record.isImportant = record.isImportant || doc.data().isImportant;
          }
          else {
            throw 'network error';
          }
        });
      }
      catch(e){
        // system error: bad connection
      }

      //console.log(record);
      //console.log(isRecordExist)

      // check for duplicate
      //const duplicate = await db.collection(recordType)
      //console.log(duplicate);

      //let recordNotNull = state.records[recordType].length;
      //if (recordNotNull) // if not null
      //  commit('checkForDuplicate', {recordType, newRecord});

      //можно будет делать запрос по дате и по ответу определять дубликат ли
      /*if(state.duplicateId === -1)
      {// при отсутствии дубликата
        commit('addNewRecord', {recordType, newRecord});
        if (recordNotNull) commit('sortRecords', recordType);
      }
      else
      {
        commit('addContentToRecord', {recordType, newRecord});
      }*/



      //const isRecordExist = await fireBase.firestore().collection('users').doc(userID)
      //  .collection(recordType).doc(newRecord.date).get();//.collection()//.doc('data');*/
      //const isRecordExist = await fireBase.firestore().ref().get();//.collection()//.doc('data');

      // console.log(isRecordExist);
      //let user = userState.state.user;
      //console.log(user)
      //console.log(newRecord)
      if(state.record === ''){throw "body is empty"}

      try
      {
        //console.log(newRecord)
        await fb.collection("users").doc(userID).collection('records').doc('data')
          .collection(state.currentRecordType).doc(record.date).set(record);

      }
      catch (e) {
        throw e
      }

      if(duplicate){
        // если был дубликат, то забираем с сервера обновленную запись
        try
        {
          await fb.collection("users").doc(userID).collection('records').doc('data')
            .collection(state.currentRecordType).doc(record.date).get()
          .then((doc) => {
            //state.records[recordType][record.date].body = doc.data().body;
            console.log(doc);
            console.log(state.records[recordType])
          })
        }
        catch (e){
          throw e
        }
      }

      //commit('setWriteDone', false);

    },

    async saveEditRecord({commit}, payload){
      //commit('setEditRecord', payload);
    },

    setCurrentRecordType({commit}, payload){
      // получаем текущий отображаемый тип запесей
      commit('setCurrentRecordType', payload)
    },

    writeRecord({commit}, payload){
      commit('setRecord', payload)
    },

    async getRecordsFromServer({commit}){
      //commit('setLoading', true);
      let userID = userState.state.user;
      let records = {note:{}, task:{}, reminder:{}, med:{}};
      const noteFB = fireBase.firestore().collection('users').doc(userID).collection('records')
        .doc('data').collection('note');//.doc().collection('2019-04-19')//.doc('data');
      const taskFB = fireBase.firestore().collection('users').doc(userID).collection('records')
        .doc('data').collection('task');
      const reminderFB = fireBase.firestore().collection('users').doc(userID).collection('records')
        .doc('data').collection('reminder');
      const medFB = fireBase.firestore().collection('users').doc(userID).collection('records')
        .doc('data').collection('med');

      try{
        // Получаем данные с FB
        const note      = await noteFB.get();
        const task      = await taskFB.get();
        const reminder  = await reminderFB.get();
        const med       = await medFB.get();

        // Заполняем объект данными
        // Загрузка идёт с конца, для упрощения последующей сортировки
        const arrNote  = note.docs.map(doc => ({/*__id: doc.id, */...doc.data()}));
        for(let i = arrNote.length - 1; i > -1; i--) {
          records.note[arrNote[i].date] = arrNote[i]
        }
        const arrTasks = task.docs.map(doc => ({...doc.data()}));
        for(let i = arrTasks.length - 1; i > -1; i--) {
          records.task[arrTasks[i].date] = arrTasks[i]
        }
        const arrRem = reminder.docs.map(doc => ({...doc.data()}));
        for(let i = arrRem.length - 1; i > -1; i--) {
          records.reminder[arrRem[i].date] = arrRem[i]
        }
        const arrMed = med.docs.map(doc => ({...doc.data()}));
        for(let i = arrMed.length - 1; i > -1; i--) {
          records.med[arrMed[i].date] = arrMed[i]
        }

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
