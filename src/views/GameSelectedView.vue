<template>
  <v-container v-if="gameSelected">
    <!-- Welcoming Nav bar -->
    <v-layout wrap row>
      <v-flex column md8>
        <h4 id="welcomePlayer">Welcome :{{gameSelected.game_player}}</h4>
      </v-flex>
      <v-flex column md4 class="d-flex justify-end">
        <v-btn id="logOut" @click="logOut">
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

    <v-layout wrap row>
      <v-flex>
        <!-- Shot Dice Button -->
        <v-btn
          id="rollShot"
          v-if="lastStatus.status=='Keeps'"
          :disabled="lastStatus.status!='Keeps'"
          @click="newShot();shotDiceSound(require('../assets/diceRoll.mp3'))"
        >
          Throw
          <img id="rollShotImage" src="../assets/rollShot.png" alt="rollshot" />
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex column md8>
        <!-- Dices -->
        <button ref="shot1" id="dice1"></button>

        <button ref="shot2" id="dice2"></button>
      </v-flex>

      <v-flex column md4>
        <v-card dark id="logsCard" elevation-24>
          <v-card-text>
            <h4 class="display-1 font-weight-bold">
              <img id="crabicon" src="../assets/crabIcon.png" alt="crab" /> State
            </h4>
            <hr />
            <br />
          </v-card-text>

          <!-- Estado del Juego -->
          <v-layout>
            <v-flex row wrap class="d-flex justify-center">
              <h3>{{lastStatus.status=="Keeps"?"Game Hot !!":lastStatus.status}}</h3>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <!-- Division de Listado de disparos -->
          <v-layout>
            <v-flex row wrap class="d-flex justify-center">
              <h3>Shots Log</h3>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>
          <br />

          <!-- Columnas Listado de disparos -->
          <v-layout row wrap>
            <v-flex column wrap sm3 class="d-flex justify-center">Total</v-flex>
            <v-flex column wrap sm7 class="d-flex justify-center" style="margin-left:20px">Each Dice</v-flex>
          </v-layout>

          <!--Contenedor  Columnas Listado de disparos -->
          <v-container ref="scroll" id="scrollAreaDice">
            <v-layout
              v-for="(shots ,index) in gameSelected.game_shot"
              :key="index"
              class="d-flex align-center justify-center"
            >
              <v-flex column wrap lg3>
                <v-card-text>{{shots.shot}}</v-card-text>
              </v-flex>

              <v-flex column wrap lg9 style="margin-left:40px">
                <v-flex row wrap>
                  <img id="imgDice" :src="dices[shots.shot_dice_1-1]" alt="dice1" />
                  <h4 style="margin-top:10px">&</h4>
                  <img id="imgDice" :src="dices[shots.shot_dice_2-1]" alt="dice1" />
                </v-flex>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-layout></v-layout>
          </v-container>
          <v-layout row wrap>
            <v-divider></v-divider>
            <br />
            <v-flex row wrap md12 class="d-flex justify-center">Shots Statistics</v-flex>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-container>
              <v-content>
                <!-- Columnas Listado de disparos -->
                <v-layout row wrap>
                  <v-flex column wrap sm3 class="d-flex justify-end">Result</v-flex>
                  <v-flex column wrap sm7 class="d-flex justify-end">Times Thrown</v-flex>
                </v-layout>
                <v-container id="scrollAreaStatistics">
                  <v-layout v-for="(shots, index) in arrayShots" :key="index">
                    <v-flex class="d-flex justify-center" column wrap md5>{{index}}</v-flex>
                    <v-flex class="d-flex justify-center" column wrap md7>{{shots}} times</v-flex>
                  </v-layout>
                </v-container>
              </v-content>
            </v-container>
          </v-layout>

          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "GameSelectedview",
  props: ["gameCrabId"],
  data() {
    return {
      shots: {
        shot1: null,
        shot2: null,
      },
      class1: "revol",
      class2: "revol",
      state: false,

      lastStatus: {},

      dices: [
        require("../assets/dice1.png"),
        require("../assets/dice2.png"),
        require("../assets/dice3.png"),
        require("../assets/dice4.png"),
        require("../assets/dice5.png"),
        require("../assets/dice6.png"),
      ],
      arrayShots: [],
    };
  },
  // props:{GameSelectedview:Object},
  methods: {
    ...mapActions(["allGames", "throwDices", "logOutUser", "allShots"]),

    logOut() {
      return this.$store.dispatch("logOutUser");
    },
    newShot() {
      this.getLastShot;
      var references = this.$refs;
      var refDice1 = references.shot1;
      var refDice2 = references.shot2;

      this.objectRepeatedShots;

      // const assets = "http://carysmills.com/uploads/";
      // // const assets = "../assets/dice";

      return (
        this.$store.dispatch("throwDices", this.gameSelected.game_id),
        refDice1.classList.toggle("dic1"),
        refDice2.classList.toggle("dic2"),
        setTimeout(() => {
          refDice1.classList.toggle("revol"),
            refDice2.classList.toggle("revol");
        }, 5500)
      );
    },
    shotAgain() {
      return this.getLastShot;
    },
    shotDiceSound(sound) {
      if (sound) {
        let audio = new Audio(sound);
        setTimeout(() => {
          audio.play();
        }, 0.1);
      }
    },
    scrollToEnd() {
      let references = this.$refs;
      let container = references.scroll;
      let scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
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
      return this.$store.getters.getSelectedGame(this.gameCrabId);
    },
    getLastShot() {
      this.shots.shot1 = null;
      this.shots.shot2 = null;

      return (
        (this.lastStatus = this.gameSelected.game_status[
          this.gameSelected.game_status.length - 1
        ]),
        this.gameSelected.game_shot[this.gameSelected.game_shot.length - 1],
        (this.shots.shot1 = this.gameSelected.game_shot[
          this.gameSelected.game_shot.length - 1
        ].shot_dice_1),
        (this.shots.shot2 = this.gameSelected.game_shot[
          this.gameSelected.game_shot.length - 1
        ].shot_dice_2)
      );
    },
    getUserStatusOk() {
      if (this.getAllGames.player == null) {
        return this.$router.push("/login");
      } else {
        return;
      }
    },
    async objectRepeatedShots() {
      let shots =await  this.getallShotsPlayer;
      let arrayShots = await [];
      let prefix = "Dice";
      let countDice = {};
      await this.getallShotsPlayer.player_auth_shots_detail.forEach(async (shot) => {
        arrayShots.push(shot.shot);
      });

      return (this.arrayShots = arrayShots.reduce(
        (array, shotDice) => ({
          ...array,

          [shotDice]: (array[shotDice] || 0) + 1,
        }),
        {}
      ));
    },
  },

  async created() {
    await this.allGames;
    await this.allShots();
    await this.gameSelected;
    await this.getAllGames;
    await this.getallShotsPlayer;
    await this.throwDices;
    await this.newShot;
    await this.getUserStatusOk;
    await this.objectRepeatedShots;
    console.log(this.objectRepeatedShots);
    console.log(this.lastStatus);
    console.log(this.getUserStatus);
    console.log(this.getallShotsPlayer);
    console.log(this.$store.getters);
    console.log(this.allShots());
    console.log(this.arrayShots);
  },
  mounted() {
    this.scrollToEnd();
    if (this.getAllGames.player != null) {
      this.objectRepeatedShots;
      this.arrayShots
    }
  },
  updated() {
    this.scrollToEnd();
    this.objectRepeatedShots;
    this.arrayShots
  },
  watch: {
    getLastShot() {
      let booster = this.gameSelected.game_shot[
        this.gameSelected.game_shot.length - 1
      ];
      var references = this.$refs;
      var refDice1 = references.shot1;
      var refDice2 = references.shot2;

      this.getLastShot;

      console.log(refDice1);
      console.log(refDice2);
      // const assets = "http://carysmills.com/uploads/";
      // //  const assets = "../assets/dice";

      refDice1.classList.toggle("dic1"),
        refDice2.classList.toggle("dic2"),
        setTimeout(() => {
          refDice1.classList.toggle("revol"),
            refDice2.classList.toggle("revol");
        }, 500);

      refDice1.style.background =
        "url(" + this.dices[this.shots.shot1 - 1] + ")";
      refDice1.style.backgroundSize = "contain";

      refDice2.style.background =
        "url(" + this.dices[this.shots.shot2 - 1] + ")";
      refDice2.style.backgroundSize = "contain";
    },
  },
};
</script>

<style>
#dice1,
#dice2 {
  background: none;
  border: none;
  outline: none;
  width: 100px;
  height: 100px;
  position: absolute;
  background-size: contain;
  transition: background 0.3s;
  transition: opacity 1.5s;
}
#dice1 {
  top: 170px;
  left: 520px;
  /* position:relative; */
  /* background-image: url(http://carysmills.com/uploads/4.png); */
  /* background-image: url("../assets/dice2.png"); */
}
#dice2 {
  top: 270px;
  left: 420px;
  /* position:relative; */
  /* background-image: url(http://carysmills.com/uploads/1.png); */
  /* background-image: url("../assets/dice6.png"); */
}
.revol {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
.dic1 {
  -webkit-animation-name: dic1;
  animation-name: dic1;
}

@keyframes dic1 {
  from {
    transform: none;
    left: -180px;
  }
  15% {
    transform: translate3d(-55%, 0, 0) rotate3d(0, 0, 1, -100deg);
  }
  30% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, 300deg);
  }
  45% {
    transform: translate3d(-51%, 0, 0) rotate3d(0, 0, 1, -10deg);
  }
  60% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, -20deg);
  }
  75% {
    transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -100deg);
  }
  to {
    transform: none;
  }
}

.dic2 {
  animation-name: dic2;
}

@keyframes dic2 {
  from {
    transform: none;
    top: -200px;
  }
  15% {
    transform: translate3d(-55%, 0, 0) rotate3d(0, 0, 1, -100deg);
  }
  30% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, 300deg);
  }
  45% {
    transform: translate3d(-51%, 0, 0) rotate3d(0, 0, 1, -10deg);
  }
  60% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, -20deg);
  }
  75% {
    transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -100deg);
  }
  to {
    transform: none;
  }
}

#rollShotImage {
  width: 50px;
  height: 50px;
}
#rollShot {
  background-color: transparent;
  color: white;
}
#goHomeImg {
  width: 45px;
  height: 45px;
}
#goHome {
  background-color: transparent;
  color: white;
}

#welcomePlayer {
  color: white;
}

#logOut {
  background-color: transparent;
  color: white;
}
#logOutImage {
  height: 30px;
  width: 30px;
}
#crabicon {
  width: 40px;
  height: 40px;
}
#imgDice {
  width: 45px;
  height: 45px;
}
#scrollAreaDice {
  max-height: 150px;
  overflow: scroll;
  margin-bottom: 20px;
}

#scrollAreaDice::-webkit-scrollbar {
  width: 1em;
}

#scrollAreaDice::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#scrollAreaDice::-webkit-scrollbar-thumb {
  background-color: orange;
  outline: 1px solid orange;
  border-radius: 20px;
}

#scrollAreaStatistics {
  max-height: 80px;
  overflow: scroll;
  margin-bottom: 20px;
}
#scrollAreaStatistics::-webkit-scrollbar {
  width: 1em;
}

#scrollAreaStatistics::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#scrollAreaStatistics::-webkit-scrollbar-thumb {
  background-color: orange;
  outline: 1px solid orange;
  border-radius: 20px;
}

#logsCard {
  padding: 20px;
  border: 1px;
  border-radius: 50px;
  background-color: rgba(10, 10, 10, 0.7);
}
</style>