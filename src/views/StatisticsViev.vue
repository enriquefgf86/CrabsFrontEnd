<template>
  <v-container>
    <GraphicComponent></GraphicComponent>
    
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "StatisticsView",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["allGames", "throwDices", "logOutUser", "allShots"]),
  },
  computed: {
    ...mapGetters([
      "getSelectedGame",
      "getUserStatus",
      "getAllGames",
      "getallShotsPlayer",
    ]),
  },
  created() {
    this.allGames;
    this.allShots();
    this.getAllGames;
  },
  watch: {},
};
</script>

<style>
</style>