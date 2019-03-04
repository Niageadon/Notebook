<template>
  <div>
    <v-toolbar
    app
    >
      <h2> hey</h2>
      <v-spacer/>


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
