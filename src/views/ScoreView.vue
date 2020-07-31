<template>
  <v-container>
      <v-content>
         <ScoreComponent></ScoreComponent>
      </v-content>
      <v-container>
      <v-content>
        <v-card id="cardColor" dark v-if="getAllGames.player==null||getAllGames.player==undefined">
          <v-layout row wrap>
            <v-flex column xs12 class="d-flex justify-center">
              <h2 id="letter">Hola Visitor,are you a user?</h2>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex column xs12 class="d-flex flex-row justify-space-around justify-start">
              <h2 id="letter">
                <v-btn small router-link to="/login" style="background-color:transparent">Yes</v-btn>
              </h2>
              <h2 id="letter">
                <v-btn small router-link to="/signup" style="background-color:transparent">No</v-btn>
              </h2>
            </v-flex>
          </v-layout>
        </v-card>
      </v-content>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
name:"ScoreView",
methods:{
    ...mapActions(["allGames", "scorePlayer"]),
},
computed:{
    ...mapGetters(["getAllGames", "getScorePlayer"])
},
created(){
}

}
</script>

<style>

</style>