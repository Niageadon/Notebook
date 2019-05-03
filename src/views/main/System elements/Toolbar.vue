<template>
  <div>
    <v-toolbar
    app
    fixed
    absolute
    clipped-left
    >
      <v-btn small round @click="changeDrawer"><v-icon >toc</v-icon> </v-btn>
      <div v-if="getLoadingStatus" class="lds-circle"><div></div></div>
      <div>{{getUsername}}</div>

      <v-spacer/>
      <div class="hidden-sm-and-down" v-for="(link,i) in Links" :key="i">
        <v-btn @click="selectButtonEvent(link.title)" flat="" :to="link.href">
          <v-icon>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
      </div>

      <!--<div class="hidden-sm-and-down"> &lt;!&ndash;PC menu&ndash;&gt;
        <v-btn flat="" :to="'/'"> <v-icon > home </v-icon> Home </v-btn>
       <v-btn flat="" :to="'/Login'"> <v-icon > lock </v-icon> Login </v-btn>
      </div>
-->
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
            <!--<v-list-tile
                v-for="(link, index) in Links"
                :key="index"
                @click=""
            >
              <v-list-tile-title>{{ link.title }}</v-list-tile-title>
            </v-list-tile>-->
            <div
                v-for="(link, index) in Links"
                :key="index">
              <v-btn
                  :to="link.href"
                  @click="selectButtonEvent(link.title)"> {{link.title}}</v-btn>
            </div>
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


      }
    },

    methods:{
      ...mapMutations({
        toggle: 'toggleDrawer'
      }),

      changeDrawer(){
        this.$store.dispatch('setDrawer')
      },

      selectButtonEvent(buttonType){
        switch (buttonType) {
          case 'Logout': this.$store.dispatch('logout'); break;

          default: break;
        }
      }


    },

    computed:{
      isUserAuthorized(){
        return this.$store.getters.isUserAuthorized
      },

      Links(){
        if(this.isUserAuthorized)
          return[
            {href:"/", icon:"home", title:"Home"},
            {href:"/", icon:"android", title:"Logout"}
          ];
        else
          return[
            {href:"/", icon:"home", title:"Home"},
            {href:"/Login", icon:"lock", title:"Login"},
            {href:"/Registration", icon:"how_to_reg", title:"Registration"}
          ]
      },

      getLoadingStatus(){
        return this.$store.getters.SYSTEMLOADING
      },

      getUsername(){
        return this.$store.getters.USERNAME
      }
    },
  }
</script>

<style scoped>
  .lds-circle {
    display: inline-block;
    transform: translateZ(1px);
  }
  .lds-circle > div {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 6px;
    border-radius: 50%;
    background: #000000;
    animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes lds-circle {
    0%, 100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }


</style>
