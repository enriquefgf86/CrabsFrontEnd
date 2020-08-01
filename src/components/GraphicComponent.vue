<template>
  <v-container v-if="gameSelected">
    <!-- <v-card height='500'> -->

    <v-layout wrap row>
      <v-flex column md8>
        <h4 id="welcomePlayer">Record Of : {{gameSelected.game_player}}</h4>
      </v-flex>
      <v-flex column md4 class="d-flex justify-end">
        <v-btn id="logOut" @click="logOut" v-if="getAllGames.player!=null">
          Log Out
          <img id="logOutImage" src="../assets/logOut.png" alt="out" />
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout wrap row>
      <v-flex class="d-flex justify-center">
        <v-btn router-link to="/" id="goHome">
          Go
          <img id="goHomeImg" src="../assets/goHome.png" alt="home" />
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex column wrap md4>
        <v-card dark id="statisticsCard" elevation-24>
          <v-card-text>
            <h4 class="display-1 font-weight-bold" style="text-align:center !important">
              <img id="crabicon" src="../assets/crabIcon.png" alt="crab" /> This Game Details
            </h4>
            <hr />
            <br />
          </v-card-text>

          <!-- Estado del Juego -->
          <v-layout>
            <v-flex
              row
              wrap
              class="d-flex justify-center"
            >{{gameSelected.game_status[gameSelected.game_status.length-1].status}}</v-flex>
          </v-layout>

          <v-divider></v-divider>

          <!-- Division de Listado de disparos -->
          <v-layout>
            <v-flex row wrap class="d-flex justify-center">
              <h3>Shots Log In This Game</h3>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>
          <br />

          <!-- Columnas Listado de disparos -->
          <v-layout row wrap>
            <v-flex column wrap sm5 class="d-flex align-center justify-center">Total in Shot</v-flex>
            <v-flex
              column
              wrap
              sm5
              class="d-flex align-center justify-center"
              style="margin-left:20px"
            >Times Shot</v-flex>
          </v-layout>

          <!--Contenedor  Columnas Listado de disparos -->
          <v-container ref="scroll" id="scrollAreaDice">
            <v-layout
              v-for="(shots ,index) in shotsInGame"
              :key="index"
              class="d-flex align-center justify-center"
            >
              <v-flex column wrap sm5>
                <v-card-text class="d-flex align-center justify-center">{{index}}</v-card-text>
              </v-flex>

              <v-flex column wrap sm5 style="margin-left:40px">
                <v-flex class="d-flex align-center justify-center" row wrap>{{shots}}</v-flex>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-container>

          <v-divider></v-divider>
        </v-card>
      </v-flex>

      <v-divider></v-divider>
      <v-flex column wrap md4>
        <v-card dark id="statisticsCard" elevation-24>
          <v-card-text>
            <h4 class="display-1 font-weight-bold" style="text-align:center !important">
              <img id="crabicon" src="../assets/crabIcon.png" alt="crab" />
              {{gameSelected.game_player}} 's records
            </h4>
            <hr />
            <br />
          </v-card-text>

          <!-- Estado del Juego -->
          <v-layout>
            <v-flex row wrap class="d-flex justify-center"></v-flex>
          </v-layout>

          <v-divider></v-divider>

          <!-- Division de Listado de disparos -->
          <v-layout>
            <v-flex row wrap class="d-flex justify-center">
              <h3>Player's Games Resume</h3>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>
          <br />

          <!-- Columnas Listado de disparos -->
          <v-layout row wrap>
            <v-flex
              column
              wrap
              sm3
              class="d-flex justify-center text-xs-center;text-align:center !important"
            >
              <h5>Game</h5>
            </v-flex>
            <v-flex
              column
              wrap
              sm3
              class="d-flex justify-center text-xs-center"
              style="margin-left:20px;text-align:center !important"
            >
              <h5>Total Each Shot</h5>
            </v-flex>
            <v-flex
              column
              wrap
              sm3
              class="d-flex justify-center text-xs-center"
              style="margin-left:20px;text-align:center !important"
            >
              <h5>Game Score</h5>
            </v-flex>
          </v-layout>

          <!--Contenedor  Columnas Listado de disparos -->
          <v-container ref="scroll" id="scrollAreaDice">
            <v-layout
              v-for="(details ,index) in playerGamesResume"
              :key="index"
              class="d-flex align-center justify-center"
              id="layoutH"
            >
              <v-flex column wrap lg3>
                <v-card-text class="d-flex flex-row justify-space-around">
                  Game
                  <h1>{{index+1}}</h1>
                </v-card-text>
              </v-flex>

              <v-flex column>
                <h6
                  style="margin-left:.6rem"
                >{{details.game_shot.length}} {{details.game_shot.length>1?"shots":"shot"}}</h6>
                <v-flex column wrap sm8 id="scoreLog">
                  <v-flex
                    column
                    wrap
                    sm6
                    v-for="(shots ,index1) in details.game_shot"
                    :key="index1"
                    class="d-flex align-center justify-end"
                    style="margin-left:1.5rem"
                  >
                    <v-card-text>{{shots.shot}}</v-card-text>
                  </v-flex>
                </v-flex>
              </v-flex>

              <v-flex column wrap lg3 class="d-flex justify-center">
                <v-flex column wrap>
                  <v-card-text>
                    <h5>{{details.game_status[details.game_status.length-1].status}}</h5>
                  </v-card-text>
                  <v-card-text>
                    <h1>{{details.game_score}}</h1>
                  </v-card-text>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-divider></v-divider>
    </v-layout>

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
// import { Doughnut } from "vue-chartjs";
// import Chart from "chart.js";

export default {
  name: "GraphicComponent",
  props: ["staticCrabId"],
  data() {
    return {
      shotsInGame: [],
      playerGamesResume: [],
    };
  },

  methods: {
    ...mapActions([
      "allGames",
      "throwDices",
      "logOutUser",
      "logOutUser",
      "allShots",
    ]),

    logOut() {
      if (this.getAllGames.player != null) {
        return this.$store.dispatch("logOutUser");
      } else return;
    },
  },
  computed: {
    ...mapGetters([
      "getSelectedGame",
      "getUserStatus",
      "getAllGames",
      "getallShotsPlayer",
    ]),
    gameSelected() {
      return this.$store.getters.getSelectedGame(this.staticCrabId);
    },
    async getGameStatistics() {
      let gameShots = this.gameSelected.game_shot;
      let shotInGame = await [];

      await gameShots.forEach(async (shot) => {
        shotInGame.push(shot.shot);
      });

      return (this.shotsInGame = shotInGame.reduce(
        (array, shotDice) => ({
          ...array,

          [shotDice]: (array[shotDice] || 0) + 1,
        }),
        {}
      ));
    },

    async getAllGamesPlayerStatistic() {
      let totalGames = this.getAllGames.all_games;
      const player = this.gameSelected.game_player;
      const keysobject = ["game", "shot_result", "score_game"];
      let filteredPlayerGames = [];
      await totalGames.forEach(async (game) => {
        if (player == game.game_player) {
          filteredPlayerGames.push(game);
        }
      });

      return (this.playerGamesResume = filteredPlayerGames);
    },
  },
  async created() {
    await this.getGameStatistics;
    await this.getAllGamesPlayerStatistic;
    // console.log(this.getGameStatistics);
    // console.log(this.gameSelected);
    // console.log(this.shotsInGame);
    // console.log(this.getAllGamesPlayerStatistic);
    // console.log(this.playerGamesResume);
  },
  watch: {},
};
</script>

<style>
#statisticsCard {
  padding: 20px;
  border: 1px;
  border-radius: 50px;
  background-color: rgba(10, 10, 10, 0.7);
}

#scoreLog {
  max-height: 80px;
  overflow: scroll;
  margin-bottom: 20px;
}
#scoreLog::-webkit-scrollbar {
  width: 1em;
}

#scoreLog::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#scoreLog::-webkit-scrollbar-thumb {
  background-color: orange;
  outline: 1px solid orange;
  border-radius: 20px;
}

#layoutH {
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 4px;
  border-radius: 10px;
}
</style>