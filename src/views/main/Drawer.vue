<template>
  <div>
    <v-navigation-drawer
        app
        fixed
        disable-resize-watcher=""
        clipped
        :value="getDrawerState">


      <v-switch py-1
                :label="`Sorting`"
                :color="'green'"
                class="switchClass"
      ></v-switch>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: "Drawer",

    data(){
      return{
      }
    },

    methods:{

    },

    computed:{
      getDrawerState(){
        //console.log(this.$store.state.drawer)
        //return this.$store.state.drawer
        return this.$store.getters.DRAWER
      }

    },
  }
</script>

<style scoped>

</style>
