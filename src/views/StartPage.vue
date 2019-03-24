<template>
  <div>
    <v-container fluid>
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
                    v-on:dblclick="dateMenu = false"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newNote.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dateMenu.save(newNote.date)">Select</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex> <!--date-->

          <v-flex xs12>
            <v-text-field
                label="Headline"
                prepend-inner-icon="title"
                box
                clearable
                v-model="newNote.title"
            ></v-text-field>
          </v-flex> <!--title-->

          <v-flex xs12 >
            <v-textarea
                box
                name="input-7-4"
                label="Main text"
                v-model="newNote.body"
            ></v-textarea>
          </v-flex> <!--body-->

        </v-layout>

        <v-card-actions >
          <v-btn
              block
              color="rgba(47,56,184,0.66)"
          >
            hey
          </v-btn>
        </v-card-actions> <!--button-->
      </v-card>
    </v-container>

    <v-container >
      <v-layout wrap >
        <v-flex xs12 v-for="i in notes" :key="i.name">
          <v-card>
            <v-card-title>title:{{i.title}} date:{{i.date}}</v-card-title>
            <v-responsive>
              <v-img src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"> </v-img>

            </v-responsive>
            <v-card-actions>
              <v-btn>ff</v-btn>

            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "StartPage",

    data(){
      return{
        dateMenu: false,

        newNote:{
          date: '',
          title: '',
          body: ''
        },

        notes:[
          {date: 'завтра',  title: 'чотам', body: 'бобабиба'},

        ],


      }
    },

    computed:{

    }
  }
</script>

<style scoped>



</style>
