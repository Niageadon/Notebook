<template>
  <div class="content">
    <types></types>
  </div>
</template>

<script>

  import types from "../components/noteType"
  export default {
    name: "Test",

    components:{
      types
    },

    data(){
      return{

      }
    },

  }
</script>

<style scoped>
  .content{
    max-width: 100px;
  }

  .element{
    width: 40px;
    height: 40px;
    background-color: red;
  }
</style>
