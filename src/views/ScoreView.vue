<template>
  <v-container>
      <v-content>
         <ScoreComponent></ScoreComponent>
      </v-content>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
name:"ScoreView",
methods:{
    ...mapActions(["allGames", "allScoreShotsPerPlayer"]),
},
computed:{
    ...mapGetters(["getAllGames", "getAllScoreShotsPerPlayer"])
}

}
</script>

<style>

</style>