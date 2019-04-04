<template>
  <div >
    <v-btn @click="saveNotes"> Send to locale storage</v-btn>
    <v-btn @click="sortNotes"> Sort notes</v-btn>

    <v-container fluid>
      <v-layout xs12 justify-center>
        <v-flex xs12 md7>
          <v-card class="elevation-13">
            <v-card-title>
              <v-layout wrap>
                <v-flex  xs6 md4 >
                  <v-select
                      v-model="newNote.noteType"
                      :items="noteTypes"
                      item-text="state"
                      item-value="abbr"
                      label="Select"
                      persistent-hint
                      single-line
                  ></v-select>
                </v-flex> <!--note type-->
                <v-flex xs6 md4 class="offset-md1 offset-xs0">
                  <v-checkbox  append-icon="warning"  label="#Important" v-model="newNote.isImportant"></v-checkbox>
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
      </v-layout>
    </v-container> <!--New note-->

    <v-container  >
      <v-layout wrap justify-center>
        <v-flex mt-4 pb-4 xs12 md11 v-for="note in records[showType]" :key="note.date">
          <div v-if="!records[showType][note.id].editing">
            <div style="text-align: center" class="font-weight-black display-1 font-italic">{{note.date}}</div>
            <v-card class="elevation-10">
              <v-card-title class="headline font-weight-bold">{{note.title}}</v-card-title>
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
                <v-btn @click="toggleEditingStatus(note.id)">Редактировать запись</v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-else>
            <div style="text-align: center" class="font-weight-black display-1 font-italic">Editing</div>
            <v-card class="elevation-24">
              <v-card-title>hey</v-card-title>
              <v-divider/>
              <v-card-text>
                <v-text-field
                    label="Headline"
                    prepend-inner-icon="title"
                    v-model="editNote.title"
                ></v-text-field>
                <v-textarea
                    v-on:keydown.tab="editNote.body = doTabulation(editNote.body,$event)"
                    box v-model="editNote.body"></v-textarea>
              </v-card-text>
              <v-card-actions> <v-btn @click="toggleEditingStatus(note.id)">Save changing</v-btn> </v-card-actions>
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
        showType: 'note',
        editMode: false,
        noteTypes: [
          'Note', 'Task', 'Reminder', 'Medical'
        ],

        validateRules:{
          valid: false,
          bodyRule: [
            v => !!v || 'Enter text',
          ]
        },

        newNote:{
          dateMenu: false,
          noteType: 'Note',
          id: 0,
          date: '',
          title: '',
          body: '',
          isImportant: false,
          editing: false
        },

        editNote:{
          noteType: '',
          date: '',
          title: '',
          body: '',
        },

        records:{
          note:[],
          task:[],
          reminder:[],
          medical:[]
        }


      }
    },

    methods:{
      addNote(){
        //this.notes.push(this.newNote.note)
        let noteType = this.newNote.noteType.toLowerCase();
        this.newNote.id = this.records[noteType].length;

        let pushNote = {
          id:           this.newNote.id,
          date:         this.newNote.date,
          isImportant:  this.newNote.isImportant,
          title:        this.newNote.title,
          body:         this.newNote.body,
          editing:      this.newNote.editing,
        };

        let duplicateId = this.checkForDuplicate(noteType, pushNote.date);
        console.log(duplicateId)
        if (duplicateId === -1) {
          //no duplicates
          this.records[noteType].push(pushNote)
        }
        else {
          // add body
          this.records[noteType][duplicateId].body += '\n\n' + pushNote.body;

          // add title
          if(this.records[noteType][duplicateId].title === ''){
            this.records[noteType][duplicateId].title = pushNote.title;
          }
          else if (!(pushNote.title === '')){this.records[noteType][duplicateId].title += '\u0009' + '&' + '\u0009' + pushNote.title;
          }

        }
        //this.notes.push(pushNote)
      },

      checkForDuplicate(noteType, date){
        let duplicate = false;
        let id = 0;
        // console.log(this.records[noteType][0].date);
        for (let i = 0; i < this.records[noteType].length; i++){
          if(date === this.records[noteType][i].date){
            duplicate = true;
            id = i;
          }
        }
        return duplicate? id : -1
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

      toggleEditingStatus(id){
        if (!this.editMode) {
          this.editMode = true;
          this.records[this.showType][id].editing = true;

          this.editNote.noteType =  this.showType;
          this.editNote.date =      this.records[this.showType][id].date;
          this.editNote.title =     this.records[this.showType][id].title;
          this.editNote.body =      this.records[this.showType][id].body;
        }
        else if (this.records[this.showType][id].editing){
          //if note are on edit mode (single note edit)

          this.records[this.showType][id].date   = this.editNote.date;
          this.records[this.showType][id].title  = this.editNote.title;
          this.records[this.showType][id].body   = this.editNote.body;

          this.editMode = false;
          this.records[this.showType][id].editing = false;
        }
      },

      doTabulation(text, event){
        event.preventDefault(); // disable tabulation
        return text + '\u0009'  // add tab
      },

      saveNotes() {
        const parsed = JSON.stringify(this.records);
        localStorage.setItem('records', parsed);
      },

      sortNotes(){
        this.records.note = this.records.note.sort(
          function compareAge(noteA, noteB) {
            let a = noteA.date.slice(0, 4) + noteA.date.slice(5, 7) + noteA.date.slice(8, 10);
            let b = noteB.date.slice(0, 4) + noteB.date.slice(5, 7) + noteB.date.slice(8, 10);
            return b - a;
          });
        console.log('sorted')
      }

    },

    computed:{

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

    }
  }
</script>

<style scoped>



</style>


