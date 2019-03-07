<template>
  <div>
    <v-toolbar
    app
    >
      <v-btn small round=""><v-icon @click="">toc</v-icon> </v-btn>
      <h2> hey</h2>


      <v-spacer/>
       <v-btn flat="" :to="'/'"> <v-icon > home </v-icon> Home </v-btn>
       <v-btn flat="" :to="'/Login'"> <v-icon > lock </v-icon> Login </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: "Toolbar"
  }
</script>

<style scoped>


</style>
