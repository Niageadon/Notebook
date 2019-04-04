<template>
  <v-container >
    <v-layout  align-center justify-center >
      <v-flex md8 xs12>
        <v-card  class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                  prepend-icon="person"
                  v-model="userData.email"
                  :rules="nameRules"
                  label="Name">
              </v-text-field> <!--Login-->
              <v-text-field
                  class="mt-2"
                  prepend-icon="lock"
                  v-model="userData.password"
                  :rules="passwordRules"
                  label="Password"
                  type="password">
              </v-text-field> <!--Password-->
              <v-text-field
                  class="mt-2"
                  prepend-icon="lock"
                  v-model="userData.confirmPassword"
                  :rules="passwordRules2"
                  label="Confirm password"
                  type="password">
              </v-text-field> <!--Confirm-->
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="doRegistration()">Registration</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Registration",

    data() {
      return{
        valid: false,
        userData:{
          email: '',
          password: '',
          confirmPassword: '',
          id: '',
          accessLevel: 0
        },

        nameRules: [
          v => !!v || 'Enter login',
          v => (v && v.length <= 32) || 'Maximum length: 32 characters'
        ],
        passwordRules: [
          v => !!v || 'Enter password',
          v => (v && v.length >= 4) || 'Minimum length: 4 characters'
        ],
        passwordRules2: [
          v => !!v || 'Enter confirm password',
          v => (v && v.length >= 4) || 'Minimum length: 4 characters',
          v => v === this.userData.password || 'Passwords do not match'
        ],

      }
    },

    methods:{
      doRegistration(){
      if (this.$refs.form.validate()){
        console.log('hey')
        this.$store.dispatch('registerUser', this.userData)
      }
      },

    },

    computed:{

    }
  }
</script>

<style scoped>

</style>
