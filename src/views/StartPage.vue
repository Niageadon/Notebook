<template>
  <div>
    <v-container fluid>
      <v-layout xs12 justify-center>
        <v-flex xs12 md9>
          <v-card
          class="elevation-13">
        <v-layout xs12 wrap row>

          <v-flex xs12>
            <v-menu
                ref="dateMenu"
                v-model="dateMenu"
                box
                :close-on-content-click="false"
                :nudge-right="50"
                :return-value.sync="newNote.note.date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="newNote.note.date"
                    label="Set note date"
                    prepend-inner-icon="date_range"
                    readonly
                    box
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker  v-model="newNote.note.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dateMenu.save(newNote.note.date)">Select</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex> <!--date-->

          <v-flex xs12>
            <v-text-field
                label="Headline"
                prepend-inner-icon="title"
                box
                v-model="newNote.note.title"
            ></v-text-field>
          </v-flex> <!--title-->

          <v-flex xs12 >
            <v-textarea
                box
                name="input-7-4"
                label="Main text"
                v-model="newNote.note.body"
            ></v-textarea>
          </v-flex> <!--body-->

        </v-layout>

        <v-card-actions >
          <v-layout xs12 wrap >
            <v-flex xs12 md4 >
              <v-select
                  class="mt-0 pt-0 "
                  v-model="newNote.noteType"
                  :items="noteTypes"
                  item-text="state"
                  item-value="abbr"
                  label="Select"
                  persistent-hint
                  single-line
            ></v-select>
            </v-flex> <!--note type-->
            <v-flex xs12 md8>
              <v-btn
                block
                @click="addNote"
                color="rgba(47,56,184,0.66)"
            >
              hey
            </v-btn>
            </v-flex> <!--button-->
          </v-layout>
        </v-card-actions> <!--button-->
      </v-card>
        </v-flex>
      </v-layout>
    </v-container> <!--New note-->

    <v-container  >
      <v-layout wrap >
        <v-flex  mt-4 pb-4 xs12 v-for="note in notes" :key="note.id">
          <div style="text-align: center" class="font-weight-black display-1 font-italic">{{note.date}}</div>
          <v-card class="elevation-10">
            <v-card-title class="headline font-weight-bold">title:{{note.title}}</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="title">{{note.body}}</v-card-text>
            <!--<v-responsive>
              <v-img  src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"> </v-img>
            </v-responsive>-->
            <v-card-actions>
              <v-btn>ff</v-btn>

            </v-card-actions>

          </v-card>
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
        noteTypes: [
          'Note', 'Medical', 'Reminder'
        ],
        dateMenu: false,

        newNote:{
          noteType: 'Note',
          note:{
            id: 0,
            date: '',
            title: '',
            body: ''
          }
        },

        notes:[
          {id: 0, date: '2019.02.22',  title: 'title', body: 'body'},

        ],


      }
    },

    methods:{
      addNote(){
        this.newNote.note.id = this.notes.length + 1;
        this.notes.push(this.newNote.note)
      },

      getCurrentate(){
        // auto select current date
        let currentDate = new Date;
          let year = currentDate.getFullYear();
          let day = currentDate.getDate();
            day = (day.toString().length === 1)? '0' + day : day;
          let month = currentDate.getMonth() + 1;
            month = (month.toString().length === 1)? '0' + month : month;
        return(year + '-' + month + '-' + day )
      }
    },

    computed:{

    },

    created(){
      this.newNote.note.date = this.getCurrentate();

    }
  }
</script>

<style scoped>



</style>
