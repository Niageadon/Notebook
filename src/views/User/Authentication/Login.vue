<template>
  <v-container mt-5 pt-5>
    <v-layout  align-center justify-center >
      <v-flex md8 xs12>
        <v-card  class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title> Login </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="login" validation>
              <v-text-field
                  prepend-icon="person"
                  v-model="userData.email"
                  :rules="emailRules"
                  label="E-mail"

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
            <v-btn
                color="primary"
                @click="onLogin()"
                :loading="loading">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Login",

    data() {
      return{
        successLogin: false,
        userData:{
          email: '',
          password: '',
          id: '',
          accessLevel: 0
        },

        emailRules: [
          v => !!v || 'Enter e-mail',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Enter password',
        ],

      }
    },

    methods:{
      onLogin(){
        if (this.$refs.login.validate()){
          this.$store.dispatch('login', this.userData)
        }
      }
    },

    computed:{
      /*getErrorMessage(){
        return this.$store.getters.ERRORMESSAGE
      },*/

      loading(){
        return this.$store.getters.LOADING
      },
    }

  }
</script>

<style scoped>

</style>
