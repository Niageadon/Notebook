<template>
  <div>
    <v-navigation-drawer
        app
        fixed
        clipped
        v-model="getDrawerState">

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
        return this.$store.state.drawer
      }

    },
  }
</script>

<style scoped>

</style>
