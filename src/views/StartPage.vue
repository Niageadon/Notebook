<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-carousel>
            <v-carousel-item
                v-for="(item,i) in carousel"
                :key="i"
                :src="item.src"
                height="300">
              <v-card class="carouselDescriprion ml-2"><h1>hey</h1></v-card>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl>
      <v-layout wrap >
        <v-flex xs12 md6 v-for="i in 10" :key="i">
          <v-card>
            <v-card-title>suka</v-card-title>
            <v-card-media>
              <v-img src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"> </v-img>

            </v-card-media>
            <v-card-actions>
              <v-btn>ff</v-btn>

            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "StartPage",

    data(){
      return{
        carousel:[
          {
            //src: require('../assets/biba.png')
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ],

        categories:[
          {
            name: 'name',
            description: 'dd'
          },

        ]
      }
    }
  }
</script>

<style scoped>
  .carouselDescriprion{
    opacity: 0.5;
  }


</style>
