<template>
  <v-container>
    <SignUpComponent></SignUpComponent>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SignUpnView",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["getAllGames"]),
    getUserStatusOk() {
      if (this.getAllGames.player) {
        return this.$router.push("/");
      } else {
        return;
      }
    }
  },
  created() {
    this.getAllGames;
  },
  watch: {}
};
</script>

<style>
</style>