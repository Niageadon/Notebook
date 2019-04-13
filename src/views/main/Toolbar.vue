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
      <div class="hidden-sm-and-down"> <!--PC menu-->
        <v-btn flat="" :to="'/'"> <v-icon > home </v-icon> Home </v-btn>
       <v-btn flat="" :to="'/Login'"> <v-icon > lock </v-icon> Login </v-btn>
      </div>

      <div class="hidden-sm-and-up">
        <v-menu>
          <template #activator="{ on: menu }">
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-btn
                    color="primary"
                    dark
                    v-on="{ ...tooltip, ...menu }"
                >Dropdown</v-btn>
              </template>
              <span>Im A ToolTip</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                @click=""
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    name: "Toolbar",

    data(){
      return{
        items: [
          { title: 'Boba' },
          { title: 'Biba' },

        ]
      }
    },

    methods:{
      ...mapMutations({
        toggle: 'toggleDrawer'
      }),

      changeDrawer(){
        this.$store.dispatch('setDrawer')
      }
    },

    computed:{


    },
  }
</script>

<style scoped>


</style>
