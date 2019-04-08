<template>
  <v-app class="element">
    <Drawer/>
    <Toolbar/>


    <v-content>
      <router-view/>
    </v-content>

    <template v-if="getError">
      <v-snackbar
          :multi-line="true"
          :timeout="5000"
          @input="closeError()"
          value="true"
          @click="closeError()"
          :color="authenticationSuccess? green: error"
      >
        {{ getError }}
        <v-btn
            dark
            flat
            @click="closeError()">
            Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
  // @ is an alias to /src


  import Drawer from "@/views/main/Drawer";
  import Toolbar from "@/views/main/Toolbar";
  export default {
    name: 'home',
    components: {
      Toolbar,
      Drawer

    },

    date(){
      return{
      }
    },

    methods:{
      closeError(){
        this.$store.dispatch('clearError')
      }
    },

    computed: {
      getError(){
        return this.$store.getters.ERRORMESSAGE
      },

      authenticationSuccess(){
        return this.$store.dispatch()
      }


    },

    created(){

    }
  }
</script>

<style>
  .element::-webkit-scrollbar { width: 0 !important }
</style>
