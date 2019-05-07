<template>
  <div class="content">
    <v-layout wrap xs12>
      <v-flex xs3 v-for="(content, i) in contentTypes" :key="i">
      <div class="element"></div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "noteType",

    data(){
      return{
      contentTypes:['Note', 'Task', 'Reminder', 'Med']
      }
    },

  }
</script>

<style scoped>
  .content{

  }

  .element{
    width: 40px;
    height: 40px;
    background-color: red;
  }
</style>
