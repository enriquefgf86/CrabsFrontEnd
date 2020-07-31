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
            <v-btn router-link to="/" id="goHome" class="d-flex align-end">
              Go
              <img id="goHomeImg" src="../assets/goHome.png" alt="home" />
            </v-btn>
            <v-btn
              class="d-flex justify-center"
              color="transparent"
              small
              router-link
              to="/signup"
            >Sign Up</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog width="300" v-model="errorAuth">
      <v-card width="300">
        <v-alert type="error">
          <v-flex column wrap class="d-flex flex-column align-center">
            <h5>Problem on Password or User Name</h5>
            <h4>Try Again!!</h4>
          </v-flex>
        </v-alert>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LoginComponent",
  data() {
    return {
      username: "",
      password: "",
      errorAuth: false,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),

    loginUser() {
      return this.$store.dispatch("loginUser", {
        userName: this.username,
        userPassword: this.password,
      });
    },
  },

  computed: {
    ...mapGetters(["getPopError"]),
    validatorForm() {
      return this.username != "" && this.password != "";
    },
    async showHideAlert() {
      return (this.errorAuth = await this.$store.getters.getPopError);
    },
  },
  updated() {
    this.showHideAlert;
  },
  created() {
    this.showHideAlert;
    console.log(this.showHideAlert);
    console.log(this.$store.getters.getPopError);
  },
  watch: {
    getPopError(value) {
      console.log(value);
      return (this.errorAuth = value);
    },
  },
};
</script>

<style>
#loginCard {
  padding: 20px;
  border: 1px;
  border-radius: 50px;
  background-color: rgba(10, 10, 10, 0.8);
  margin-top: 4rem;
}
#goHome {
  background-color: transparent;
  color: white;
}
</style>