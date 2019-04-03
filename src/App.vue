<template>
  <v-app class="element">
    <Drawer/>
    <Toolbar/>


    <v-content>
      <router-view/>
    </v-content>
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

    }
  }
</script>

<style>
  .element::-webkit-scrollbar { width: 0 !important }
</style>
