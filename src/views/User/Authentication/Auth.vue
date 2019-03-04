<template>
  <v-container>
    <v-layout justify-space-around xs6>
      <v-flex xs6 mt-5>
        <v-text-field
        v-model="userData.name"
        v-validate="'required|max:10|min:3'"
        :error-messages="errors.collect('name')"
        label="Name"
        data-vv-name="name"
        required
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
        },

        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters',
            min: 'fff'
            // custom messages
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
