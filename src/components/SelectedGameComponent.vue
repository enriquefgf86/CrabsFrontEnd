<template>
  <v-container>
    <div>
      {{gameSelected}}
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SelectedGameComponent",
  props: ["gameCrabId"],
  data() {
    return {};
  },
  // props:{SelectedGameComponent:Object},
  methods: {
    ...mapActions(["oneGame", "allGames"])
  },
  computed: {
    ...mapGetters(["getSelectedGame", "getAllGames"]),

    gameSelected(){

        return this.getSelectedGame(this.gameCrabId)
    }
  },
  async created() {
      await this.gameSelected;
      await console.log(this.gameSelected);

  },
  watch: {}
};
</script>

<style>
</style>