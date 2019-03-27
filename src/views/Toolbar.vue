<template>
  <div>
    <v-toolbar
    app
    fixed
    absolute
    clipped-left
    >
      <v-btn small round @click="changeDrawer"><v-icon >toc</v-icon> </v-btn>
      <h2> hey</h2>

      <v-spacer/>
       <v-btn flat="" :to="'/'"> <v-icon > home </v-icon> Home </v-btn>
       <v-btn flat="" :to="'/Login'"> <v-icon > lock </v-icon> Login </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    name: "Toolbar",

    methods:{
      ...mapMutations({
        toggle: 'toggleDrawer'
      }),

      changeDrawer(val){
        this.$store.dispatch('setDrawer', val)
      }
    },

    computed:{


    },
  }
</script>

<style scoped>


</style>
