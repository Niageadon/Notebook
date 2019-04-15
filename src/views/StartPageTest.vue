<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <!--:style="{ background: `rgb(${red}, ${green}, ${blue})` }"-->



    <v-container fluid>
      <v-layout wrap xs12 justify-center>
        <v-flex xs12 md7>
          <v-card class="elevation-13">
            <v-card-title>
              <v-layout wrap>
                <v-flex  xs6 md4 >
                  <v-select
                      v-model="newNote.recordType"
                      :items="recordTypes"
                      item-text="state"
                      item-value="abbr"
                      label="Select"
                      persistent-hint
                      single-line
                  ></v-select>
                </v-flex> <!--note type-->
                <v-flex xs6 md4 class="offset-md1 offset-xs0">
                  <v-checkbox  append-icon="warning"  label="Important" v-model="newNote.isImportant"></v-checkbox>
                </v-flex> <!--"Important" checkbox-->
              </v-layout>
            </v-card-title>
            <v-divider/>

            <v-form v-model="validateRules.valid">
              <v-layout xs12 wrap column>
                <v-menu
                  ref="dateMenu"
                  v-model="newNote.dateMenu"
                  box
                  :close-on-content-click="false"
                  :nudge-right="50"
                  :return-value.sync="newNote.date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="newNote.date"
                      label="Set note date"
                      prepend-inner-icon="date_range"
                      readonly
                      box
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker  v-model="newNote.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="newNote.dateMenu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dateMenu.save(newNote.date)">Select</v-btn>
                  </v-date-picker>
                </v-menu><!--date-->

                <v-text-field
                    label="Headline"
                    prepend-inner-icon="title"
                    box
                    v-model="newNote.title"
                ></v-text-field><!--title-->

                <v-textarea
                    v-on:keydown.tab="newNote.body = doTabulation(newNote.body,$event)"
                    box
                    name="input-7-4"
                    label="Main text"
                    v-model="newNote.body"
                    :rules="validateRules.bodyRule"
                ></v-textarea><!--body-->
              </v-layout>
            </v-form>

            <v-card-actions >
              <v-layout xs12 wrap >
                <v-flex  align-self-end  xs12 >
                  <v-btn
                      large
                      block
                      :disabled="!validateRules.valid"
                      @click="addNote"
                      color="primary">
                    Publish
                    <v-icon class="ml-2">cloud_download</v-icon>
                  </v-btn>
                </v-flex> <!--button-->
              </v-layout>
            </v-card-actions> <!--button-->
          </v-card>
        </v-flex>

        <v-flex mt-5 xs12 md7>
          <v-select
              v-model="selectedRecordTypeToShow"
              :items="recordTypes"
              item-text="state"
              item-value="abbr"
              label="Chose type"
              persistent-hint
          ></v-select>

          <v-flex xs12>
            <v-radio-group row v-model="selectedRecordTypeToShow" :mandatory="false">
              <v-container >
              <v-layout align-center wrap>
                  <v-radio label="Note" value="note"></v-radio>
                  <v-radio label="Task" value="task"></v-radio>
                  <v-radio label="Reminder" value="reminder"></v-radio>
                  <v-radio label="Med" value="med"></v-radio>
              </v-layout>
              </v-container>
            </v-radio-group>
          </v-flex>



        </v-flex>
      </v-layout>
    </v-container> <!--New note-->

    <v-container>
      <v-layout wrap justify-center>
        <v-flex mt-4 pb-4 xs12 md11 v-for="note in getRecord[selectedRecordTypeToShow]" :key="note.date">
          <div >
            <div style="text-align: center" class="font-weight-black display-1 font-italic">{{note.date}}</div>
            <v-card class="elevation-10">
              <v-card-title class="headline grey lighten-2 font-weight-bold">{{note.title}}</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="title">
                <v-textarea v-model="note.body"
                            readonly
                            flat
                            auto-grow
                >
                </v-textarea>
              </v-card-text>
              <!--<v-responsive>
                <v-img  src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"> </v-img>
              </v-responsive>-->
              <v-card-actions>
                <v-dialog v-model="recordOnEdition">
                <template v-slot:activator="{ on }">
                  <v-btn
                      @click="editRecord(note.date)"
                      color="red lighten-2"
                      dark
                      v-on="on"
                  >
                    Редактировать запись
                  </v-btn>
                </template>

                  <v-card class="elevation-24">
                    <v-card-title>hey</v-card-title>
                    <v-divider/>
                    <v-card-text>
                      <v-text-field
                          label="Headline"
                          prepend-inner-icon="title"
                          v-model="editedRecord.title"
                      ></v-text-field>
                      <v-textarea
                          v-on:keydown.tab="editedRecord.body = doTabulation(editedRecord.body,$event)"
                          auto-grow
                          box
                          v-model="editedRecord.body">
                      </v-textarea>
                    </v-card-text>
                    <v-card-actions> <v-btn @click="saveEditChanges(note.i)" >Save changing</v-btn> </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </div>

        </v-flex>
      </v-layout>
    </v-container> <!--Note's array-->
  </div>
</template>

<script>

  export default {
    name: "StartPage",

    data(){
      return{
        //db: this.firebase.firestore(),
        recordOnEdition: false, //для v-dialog
        selectedRecordTypeToShow: 'note',
        recordTypes: [
          'note', 'task', 'reminder', 'med'
        ],
        noteColors: {
          note: '',
          task: '',
          reminder: '',
          med: '',
        },

        validateRules:{
          valid: false,
          bodyRule: [
            v => !!v || 'Enter text',
          ]
        },

        newNote:{
          dateMenu: false,
          recordType: 'note',
          date: '',
          title: '',
          body: '',
          isImportant: false,
        },

        editedRecord:{
          recordId: -1,
          recordType: '',
          date: '',
          title: '',
          body: '',
        },

      }
    },

    methods:{
      addNote() {
        //this.notes.push(this.newNote.note)
        let recordType = this.newNote.recordType.toLowerCase();

        let newRecord = {
          date:         this.newNote.date,
          isImportant:  this.newNote.isImportant,
          title:        this.newNote.title,
          body:         this.newNote.body,
          editing:      this.newNote.editing,
        };
        this.$store.dispatch('NewRecord', {recordType, newRecord})

      },

      getCurrentDate(){
        // auto select current date
        let currentDate = new Date;
        let year = currentDate.getFullYear();
        let day = currentDate.getDate();
        day = (day.toString().length === 1)? '0' + day : day;
        let month = currentDate.getMonth() + 1;
        month = (month.toString().length === 1)? '0' + month : month;
        return(year + '-' + month + '-' + day )
      },



      doTabulation(text, event){
        event.preventDefault(); // disable tabulation
        return text + '\u0009'  // add tab
      },

      /*      saveNotes() {
        const parsed = JSON.stringify(this.records);
        localStorage.setItem('records', parsed);
      },*/

      findArrayIndexByDate(date){
        for(let i = 0; i < this.getRecord[this.selectedRecordTypeToShow].length; i++){
          if(date === this.getRecord[this.selectedRecordTypeToShow][i].date)
            return i
        }
        return -1
      },

      editRecord(date){
        let recordId = this.editedRecord.recordId = this.findArrayIndexByDate(date);
        //this.editedRecord = this.getRecord[this.selectedRecordTypeToShow][recordId];
        let record = this.getRecord[this.selectedRecordTypeToShow][recordId]
        this.editedRecord.recordType  = this.selectedRecordTypeToShow;
        this.editedRecord.date        = record.date;
        this.editedRecord.title       = record.title;
        this.editedRecord.body        = record.body;
      },

      saveEditChanges(){
        let editedRecord = this.editedRecord;
        this.$store.dispatch('saveEditRecord', editedRecord);
        this.recordOnEdition = false;
      },
    },

    computed:{
      getRecord(){
        return this.$store.getters.RECORDS;
      }
    },

    mounted(){
      this.newNote.date = this.getCurrentDate(); //get date for auto-write to v-date field

      if (localStorage.getItem('records')) {
        try {
          this.records = JSON.parse(localStorage.getItem('records'));
        } catch(e) {
          localStorage.removeItem('records');
        }
      }
    },

    watch: {
      selectedRecordTypeToShow(){
        this.$store.dispatch('setCurrentRecordType', this.selectedRecordTypeToShow);
        //console.log(this.selectedRecordTypeToShow)
      },

    }
  }
</script>

<style scoped>
  .autoH{
    height: auto;
  }


</style>


