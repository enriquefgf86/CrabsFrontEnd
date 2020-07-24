<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <v-card dark elevation-24 id="loginCard">
          <v-card-text>
            <h4 class="display-2 font-weight-bold">Login</h4>
            <hr />
            <br />
            <v-form @submit.prevent="loginUser()">
              <v-text-field
                clearable
                v-model="username"
                label="Username"
                type="text"
                color="white"
                counter="10"
              ></v-text-field>
              <v-text-field
                clearable
                v-model="password"
                label="Password"
                type="password"
                color="white"
              ></v-text-field>
              <br />
              <v-btn type="submit" color="grey darken-2" :disabled="!validatorForm" large>Enter</v-btn>
            </v-form>
            <v-btn  class='d-flex justify-center' color="transparent"  small router-link to ='/signup'>Sign Up</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LoginComponent",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["loginUser"]),

    loginUser() {
      return this.$store.dispatch("loginUser", {
        userName: this.username,
        userPassword: this.password
      });
    }
  },

  computed: {
    validatorForm() {
      return this.username != "" && this.password != "";
    }
  },
  created() {},
  watch: {}
};
</script>

<style>
#loginCard {
  padding: 20px;
  border: 1px;
  border-radius: 50px;
  background-color:rgba(10, 10, 10, .8);
  margin-top:4rem
}
</style>