<template>
  <v-container mt-5 pt-5 >

    <v-layout  align-center justify-center >
      <v-flex md8 xs12>
        <v-card  class="elevation-12">
          <v-toolbar dark :color="getStatusColor">
            <v-toolbar-title>Registration form </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                  prepend-icon="person"
                  v-model="userData.email"
                  :rules="emailRules"
                  label="E-mail">
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
            <v-btn
                :color="getStatusColor"
                :disabled="!valid"
                :loading="loadingUserInfo"
                @click="doRegistration()">
              <v-icon v-if="getSuccessStatus" >done</v-icon>
              Registration
            </v-btn>
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

        emailRules: [
          v => !!v || 'Enter e-mail',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
          v => (v && v.length <= 32) || 'Maximum length: 32 characters'
        ],
        passwordRules: [
          v => !!v || 'Enter password',
          v => (v && v.length >= 6) || 'Minimum length: 6 characters'
        ],
        passwordRules2: [
          v => !!v || 'Enter confirm password',
          v => (v && v.length >= 6) || 'Minimum length: 6 characters',
          v => v === this.userData.password || 'Passwords do not match'
        ],
      }
    },

    methods:{
      async doRegistration(){
        if (this.$refs.form.validate())
        {
          await this.$store.dispatch('registerUser', this.userData);
          if(this.getSuccessStatus) {
            setTimeout(() =>{
              this.$router.push('/Login');
              this.$store.dispatch('doneAuthentication');
            }, 1200)
          }

        }
        },


      },



    computed:{
      getSuccessStatus(){
        return this.$store.getters.SUCCESS
      },

      getStatusColor(){
        return this.getSuccessStatus? 'green' : 'primary'
      },

      getUser(){
        return this.$store.getters.USER
      },

      loadingUserInfo(){
        return this.$store.getters.LOADINGUSERINFO
      },

      /*getErrorMessage(){
        return this.$store.getters.ERRORMESSAGE
      },*/


    }
  }
</script>

<style scoped>

</style>
