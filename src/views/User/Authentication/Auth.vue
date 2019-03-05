<template>
  <v-container >
    <v-layout  align-center justify-center >
      <v-flex md8 xs12>
        <v-card  class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  prepend-icon="person"
                  v-model="userData.name"
                  v-validate="'required|max:10|min:3'"
                  :error-messages="errors.collect('login')"
                  label="Name"
                  data-vv-name="login"
                  required
              ></v-text-field>
              <v-text-field
                  class="mt-2"
                  prepend-icon="lock"
                  v-model="userData.password"
                  v-validate="'required|max:30|min:3'"
                  :error-messages="errors.collect('password')"
                  label="Password"
                  data-vv-name="password"
                  required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Registration</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
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
        },

        custom: {
          login: {
            max: 'The name field may not be greater than 10 characters',
            min: 'fff'
            // custom messages
          },
          password: {
            max: 'The name field may not be greater than 10 characters',
            min: 'fff'
          },
          select: {
            required: 'Select field is required'
          }
        }
      }
    },


  }
</script>

<style scoped>

</style>
