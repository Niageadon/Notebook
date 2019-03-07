<template>
  <v-container >
    <v-layout  align-center justify-center >
      <v-flex md8 xs12>
        <v-card  class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form validation>
              <v-text-field
                  prepend-icon="person"
                  v-model="userData.name"
                  :rules="nameRules"
                  label="Name"

              ></v-text-field>
              <v-text-field
                  class="mt-2"
                  prepend-icon="lock"
                  v-model="userData.password"
                  :rules="passwordRules"
                  label="Password"

                  type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="'/Registration'" >Registration</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onLogin()">Login</v-btn>
          </v-card-actions>
        </v-card>
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
        },

        nameRules: [
          v => !!v || 'Enter login',
        ],
        passwordRules: [
          v => !!v || 'Enter password',
        ],

      }
    },

    methods:{
      onLogin(){

    }
    }

  }
</script>

<style scoped>

</style>
