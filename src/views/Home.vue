<template>
  <v-container v-if="allGames">
    <v-layout row wrap>
      <v-flex column xs8 class="d-flex justify-space-around">
        <v-btn
          @click="createNewGame"
          id="newGame"
          v-if="getAllGames.player!=null||getAllGames.player!=undefined"
        >
          New
          <img id="newGameImage" src="../assets/newGame.png" alt="newgame" />
        </v-btn>

        <v-btn id="leaderBoard" @click="routerScore">
          Score
          <img id="leaderBoardImage" src="../assets/leaderBoard.png" alt="leaderboard" />
        </v-btn>
      </v-flex>
      <v-flex column xs4 class="d-flex justify-end">
        <v-btn
          id="logOut"
          @click="logOut"
          v-if="getAllGames.player!=null||getAllGames.player!=undefined"
        >
          Log Out
          <img id="logOutImage" src="../assets/logOut.png" alt="out" />
        </v-btn>
      </v-flex>
    </v-layout>

    <GameComponent></GameComponent>
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },

  components: {},
  methods: {
    ...mapActions(["allGames", "logOutUser", "createGame", "scorePlayer"]),

    logOut() {
      return this.$store.dispatch("logOutUser");
    },
    createNewGame() {
      return this.$store.dispatch("createGame");
    },
    async routerScore() {
      return (
        await this.$store.dispatch("allGames"),
        await this.$store.dispatch("scorePlayer"),
        await this.$router.push("/scorePoll")
      );
    },
  },
  computed: {
    ...mapGetters(["getAllGames"]),
  },
  created() {
    // this.getAllGames;
    // // console.log(this.getAllGames);
  },
  watch: {},
};
</script>
<style>
/* #gameView{
  background-image:url("../assets/tableCasino.png");
  background-size: cover;
  background-repeat: no-repeat;
} */

#leaderBoard {
  background-color: transparent;
  color: white;
}
#leaderBoardImage {
  height: 30px;
  width: 35px;
}
#newGame {
  background-color: transparent;
  color: white;
}
#newGameImage {
  height: 30px;
  width: 45px;
}
#logOut {
  background-color: transparent;
  color: white;
}
#logOutImage {
  height: 30px;
  width: 30px;
}
#cardColor {
  background-color: rgba(255, 255, 255, 0.3);
}

#letter {
  background-color: rgba(8, 8, 8, 0.3);
  border-radius: 10px;
  padding-right: 0.3rem;
  padding-left: 0.3rem;
  padding-bottom: 0.2rem;
  cursor: pointer;
}
</style>
