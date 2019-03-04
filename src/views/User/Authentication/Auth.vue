<template>
  <v-container>
    <v-layout justify-space-around xs6>
      <v-flex xs6 >
        <v-text-field
        v-model="userData.name"
        v-validate="'required | max:18 | min:3'"
        label="Name"
        >

        </v-text-field>

        <v-text-field
        v-model="userData.name"
        v-validate="'required | max:18 | min:3'"
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

    data() {
      return{
        userData:{
          name: '',
          password: '',
          id: '',
          accessLevel: 0
        }
      }
    }
  }
</script>

<style scoped>

</style>
