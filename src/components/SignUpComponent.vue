<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <v-card dark elevation-24 id="signUpCard">
          <v-card-text>
            <h4 class="display-2 font-weight-bold">Sign Up</h4>
            <hr />
            <br />
            <v-form @submit.prevent="signUp()">
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

              <v-text-field
                clearable
                v-model="confirm"
                label="Confirm Password"
                type="password"
                color="white"
                v-bind:rules="[passwordChecker]"
              ></v-text-field>
              <br />
              <v-btn
                id="buttonSignUp"
                :disabled="!validatorForm"
                type="submit"
                color="grey darken-2"
                large
              >Enter</v-btn>
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
              to="/login"
            >Login</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog width="300" v-model="errorAuthConflict">
      <v-card width="300">
        <v-alert type="error">
          <v-flex column wrap class="d-flex flex-column align-center">
            <h5>There Is A Conflict In Databse</h5>
            <h4>user already Exists!!</h4>
          </v-flex>
        </v-alert>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignUpComponent",
  data() {
    return {
      username: "",
      password: "",
      confirm: "",
      errorAuthConflict: false,
    };
  },
  methods: {
    ...mapActions(["allGames", "signUpUser"]),
    signUp() {
      return this.$store.dispatch("signUpUser", {
        userName: this.username,
        userPassword: this.password,
      });
    },
  },

  computed: {
    ...mapGetters(["getPopError"]),
    validatorForm() {
      return (
        this.username != "" &&
        this.password != "" &&
        this.confirm != "" &&
        this.password == this.confirm
      );
    },
    passwordChecker() {
      if (this.password != this.confirm) {
        return "These Passwords do not match";
      } else return "";
    },
    //  getPopErrorConflict() {
    //   return (this.errorAuthConflict = this.$store.getters.getPopError);
    // },
  },
  created() {
    this.allGames;
    this.getPopError;
    this.getPopErrorConflict;
  },
  watch: {
    getPopError(value) {
      console.log(value);
      return (this.errorAuthConflict = value);
    },
  },
};
</script>

<style>
#signUpCard {
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