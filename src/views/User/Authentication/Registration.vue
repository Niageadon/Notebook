<template>
  <v-container >
    <v-layout  align-center justify-center >
      <v-flex md8 xs12>
        <v-card  class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration </v-toolbar-title>
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
                  :rules="rules"
                  label="Password"

                  type="password"
              ></v-text-field>
              <v-text-field
                  class="mt-2"
                  prepend-icon="lock"
                  v-model="userData.confirmPassword"
                  :rules="rules"
                  label="Confirm password"
                  type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-alert
              v-if="alertType === 'info'"
              class="pa-3"
              :value="true"
              type="info"
              transition="scale-transition">
              {{alertInfoMessage}}
          </v-alert>

          <v-card-actions>
            <v-btn color="primary" @click="toogleAlert()" > Check </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="doRegistration()">Registration</v-btn>
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
        alertType: 'info',
        alertInfoMessage: 'Введите логин и пароль',
        alertMessage : 'f',
        userData:{
          name: '',
          password: '',
          confirmPassword: '',
          id: '',
          accessLevel: 0
        },

        nameRules: [
          v => !!v || 'Введите логин',
          v => (v && v.length <= 12) || 'Максимальная длинна пароля: 12 символов'
        ],
        passwordRules: [
          v => !!v || 'Введите пароль',
          v => (v && v.length >= 6) || 'Минимальная длинна пароля: 6 символов'
        ],

      }
    },

    methods:{
      doRegistration(){
      if (this.userData.password === this.userData.confirmPassword){
        this.alertMessage = 'Пароли не совпадают';
      }
      },

      toogleAlert(){
        this.alert = !this.alert
      }
    },

    computed:{
      rules () {
        const rules = [];

        if (this.userData.password) {
          const rule =
            v => (!!v && v) === this.match ||
              'Values do not match'

          rules.push(rule)
        }

        const rule1 = v => !!v || 'Введите пароль';
        rules.push(rule1);
        /*const rule2 = v => (v && v.length >= 6) || 'Минимальная длинна пароля: 6 символов';
        rules.push(rule2);*/
        return rules
      }
    }
  }
</script>

<style scoped>

</style>
