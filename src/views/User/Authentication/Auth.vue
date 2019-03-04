<template>
  <v-container>
    <v-layout justify-space-around xs6>
      <v-flex xs6 mt-5>
        <v-text-field
        v-model="userData.name"
        v-validate="'required|max:10'"
        label="Name"
        >

        </v-text-field>

        <v-text-field
        v-model="userData.password"

        label="Password"
        >

        </v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Auth",

    $_veeValidate: {
      validator: 'new'
    },

    data() {
      return{
        userData:{
          name: '',
          password: '',
          id: '',
          accessLevel: 0
        }
      }
    },


  }
</script>

<style scoped>

</style>
