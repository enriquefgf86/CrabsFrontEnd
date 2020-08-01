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
    <!-- go home button -->
    <v-layout wrap row>
      <v-flex class="d-flex justify-center">
        <v-btn router-link to="/" id="goHome">
          Go
          <img id="goHomeImg" src="../assets/goHome.png" alt="home" />
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- throw dice and tips layout -->
    <v-layout wrap row>
      <!-- Shot Dice Button -->
      <v-flex column sm6>
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

      <!-- tips part -->
      <v-flex 6 ref="tipsPanel" column sm v-if="lastStatus.status=='Keeps'">
        <v-container id="container">
          <h4 id="tipsContainerTitle">Show Tips</h4>
        </v-container>

        <v-container id="container">
          <div id="tipsContainer">
            <div>
              <h4 id="h4Color">Dont Loose</h4>
              <v-switch color inset v-model="dialogTipsLoose"></v-switch>
            </div>

            <div>
              <div>
                <h4 id="h4Color">General Tips</h4>
                <v-switch inset color="green" v-model="dialogTips"></v-switch>
              </div>
            </div>

            <div>
              <h4 id="h4Color">How to Win</h4>
              <v-switch inset v-model="dialogTipsWin"></v-switch>
            </div>
          </div>
        </v-container>
      </v-flex>
    </v-layout>

    <!-- dices animation area and stattistics -->
    <v-layout row wrap>
      <!-- Dices -->
      <v-flex column md8>
        <button ref="shot1" id="dice1"></button>

        <button ref="shot2" id="dice2"></button>
      </v-flex>

      <!-- statistics -->
      <!-- State -->
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

          <!-- Winning Point -->
          <v-layout column wrap v-if="lastStatus.status=='Keeps'">
            <v-flex row wrap sm12 class="d-flex justify-center">Winning point</v-flex>
            <v-flex
              v-if="gameSelected.game_shot.length==1"
              row
              wrap
              sm12
              class="d-flex justify-center"
            >Awaiting for your first shot</v-flex>
            <v-flex
              v-else-if="gameSelected.game_shot.length>1"
              row
              wrap
              sm12
              class="d-flex justify-center"
            >
              <h4 id="winPoint">{{gameSelected.game_shot[1].shot}}</h4>
            </v-flex>
          </v-layout>

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
                <v-flex row wrap v-if="shots.shot!=0">
                  <img id="imgDice" :src="dices[shots.shot_dice_1-1]" alt="dice1" />
                  <h4 style="margin-top:10px">&</h4>
                  <img id="imgDice" :src="dices[shots.shot_dice_2-1]" alt="dice1" />
                </v-flex>

                <v-flex row wrap v-else>
                  <img id="imgDice" src="../assets/dice0.png" alt="dice1" />
                  <h4 style="margin-top:10px">&</h4>
                  <img id="imgDice" src="../assets/dice0.png" alt="dice1" />
                </v-flex>

                <v-divider></v-divider>
              </v-flex>
            </v-layout>
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
                    <v-flex
                      v-if="index!=0"
                      class="d-flex justify-center"
                      column
                      wrap
                      md7
                    >{{shots}} times</v-flex>
                    <v-flex v-else class="d-flex justify-center" column wrap md7>Starting Game</v-flex>
                  </v-layout>
                </v-container>
              </v-content>

              <!-- Pop Ups de tips -->

              <!-- tip general -->
              <v-dialog v-model="dialogTips" width="300">
                <v-card width="300" dark elevation-24 id="loginCard">
                  <h4 class="font-weight-bold">Tips in General</h4>
                  <hr />
                  <br />

                  <div v-if="gameSelected.game_shot[1]!=undefined" class="d-flex flex-row">
                    <h4>
                      You are still in game and your winning point is
                      {{gameSelected.game_shot[1].shot}}
                      .That means you must keep rolling
                      dices until you get the same
                      {{gameSelected.game_shot[1].shot}}
                      , but be really CAREFUL!!!, because if you shot a
                      <img
                        id="importantIcon1"
                        src="../assets/7.gif"
                        alt="7"
                      />, is over!!!.
                    </h4>
                  </div>
                  <div v-else>
                    <p>You are in game but you haven't thrown any dice.</p>

                    <p>The rules are simple:</p>
                    <p>
                      Avoid throwing
                      <img id="importantIcon" src="../assets/2.gif" alt="2" />,
                      <img id="importantIcon" src="../assets/3.gif" alt="3" />, or
                      <img id="importantIcon" src="../assets/12.gif" alt="12" /> at first,
                      cause you would loose.
                    </p>
                    <p>
                      If your first result is
                      <img id="importantIcon1" src="../assets/7.gif" alt="7" /> or
                      <img id="importantIcon2" src="../assets/11.gif" alt="11" />, then you win
                    </p>
                    <p>Any other result would be a winning point that you might have to repeat to win.</p>
                    <p>
                      Important
                      <img
                        id="importantIcon"
                        src="../assets/important.gif"
                        alt="important"
                      /> !!!:
                    </p>In that process o trying to get a second shot equal to the winning point if you got a 7 then you loose!!!
                    <img
                      id="cryingIcon"
                      src="../assets/imageedit_1_4578716691.gif"
                      alt="important"
                    />
                  </div>
                </v-card>
              </v-dialog>

              <!-- tip para ganar -->
              <v-dialog v-model="dialogTipsWin" width="300">
                <v-card width="300" dark elevation-24 id="loginCard">
                  <v-card-text>
                    <h4 class="font-weight-bold">Tips for Win</h4>
                    <hr />
                  </v-card-text>
                  <div>
                    <p>Basic Rules:</p>
                    <ul>
                      <li>
                        <p>If you threw at first</p>
                        <p>
                          <img id="importantIcon1" src="../assets/7.gif" alt="7" /> or
                          <img id="importantIcon" src="../assets/11.gif" alt="11" /> then welcome to the winners club!!!
                          <img
                            id="importantIcon"
                            src="../assets/claps.gif"
                            alt="claps"
                          />
                        </p>
                      </li>
                      <li>
                        <p>
                          Otherwise, if you have a winning point , you must to repeat it before a
                          <img
                            id="importantIcon1"
                            src="../assets/7.gif"
                            alt="7"
                          />
                          gets
                          thrown again
                        </p>
                      </li>
                    </ul>
                  </div>
                </v-card>
              </v-dialog>

              <!-- tip para evitar perder -->
              <v-dialog v-model="dialogTipsLoose" width="300">
                <v-card width="300" dark elevation-24 id="loginCard">
                  <v-card-text>
                    <h4 class="font-weight-bold">Tips about Loose</h4>
                    <hr />
                  </v-card-text>
                  <div>
                    <p>Basic Rules:</p>
                    <ul>
                      <li>
                        <p>If you threw at first</p>
                        <p>
                          <img id="importantIcon" src="../assets/2.gif" alt="2" />,
                          <img id="importantIcon" src="../assets/3.gif" alt="3" />, or
                          <img id="importantIcon" src="../assets/12.gif" alt="12" /> ,then Is over for you!!!
                        </p>
                      </li>
                      <li>
                        <p>
                          Rise your prise to God in case you have a winning point , cause if you got a
                          <img
                            id="importantIcon1"
                            src="../assets/7.gif"
                            alt="7"
                          /> you also got served!!!
                        </p>
                      </li>
                    </ul>
                  </div>
                </v-card>
              </v-dialog>
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

      dialogTips: false,
      dialogTipsWin: false,
      dialogTipsLoose: false,

      dices: [
        require("../assets/dice1.png"),
        require("../assets/dice2.png"),
        require("../assets/dice3.png"),
        require("../assets/dice4.png"),
        require("../assets/dice5.png"),
        require("../assets/dice6.png"),
        require("../assets/dice0.png"),
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
      let shots = await this.getallShotsPlayer;
      let arrayShots = await [];
      let countDice = {};
      // console.log(shots.player_auth_shots_detail);
      if (shots.player_auth_shots_detail != undefined) {
        await shots.player_auth_shots_detail.forEach((shot) => {
          arrayShots.push(shot.shot);
        });

        return (this.arrayShots = arrayShots.reduce(
          (array, shotDice) => ({
            ...array,

            [shotDice]: (array[shotDice] || 0) + 1,
          }),
          {}
        ));
      } else {
        return;
      }
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
    await this.tipsRandomPopUp;
    this.removerTips;
    // console.log(this.lastStatus);
    // console.log(this.gameSelected);
  },
  mounted() {
    this.scrollToEnd();
    if (this.getAllGames.player != null) {
      this.objectRepeatedShots;
      this.arrayShots;
    }
  },
  updated() {
    this.scrollToEnd();

    this.objectRepeatedShots;

    this.arrayShots;

    if (this.dialogTipsLoose == true) {
      setTimeout(() => {
        this.dialogTipsLoose = false;
      }, 7000);
    }
    if (this.dialogTipsWin == true) {
      setTimeout(() => {
        this.dialogTipsWin = false;
      }, 7000);
    }
    if (this.dialogTips == true) {
      setTimeout(() => {
        this.dialogTips = false;
      }, 10000);
    }
    if (this.gameSelected.game_player == null||this.gameSelected.game_player == undefined) {
      this.$router.push("/");
    }
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

      // console.log(refDice1);
      // console.log(refDice2);

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
}
#dice2 {
  top: 270px;
  left: 420px;
}
.revol {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.dic1 {
  animation-name: dic1;
}

@keyframes dic1 {
  from {
    transform: none;
    left: -180px;
  }
  20% {
    transform: translate3d(-55%, 0, 0) rotate3d(0, 0, 1, -100deg);
  }
  40% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, 300deg);
  }
  60% {
    transform: translate3d(-51%, 0, 0) rotate3d(0, 0, 1, -10deg);
  }
  80% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, -20deg);
  }
  100% {
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
  20% {
    transform: translate3d(-55%, 0, 0) rotate3d(0, 0, 1, -100deg);
  }
  40% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, 300deg);
  }
  60% {
    transform: translate3d(-51%, 0, 0) rotate3d(0, 0, 1, -10deg);
  }
  80% {
    transform: translate3d(50%, 0, 0) rotate3d(0, 0, 1, -20deg);
  }
  100% {
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
#winPoint {
  animation: crescendo 1.5s alternate infinite ease-in;
}

@keyframes crescendo {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(2.5);
  }
}

#winPointTip {
  animation: crescendo1 1.5s alternate infinite ease-in;
}

@keyframes crescendo1 {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(2.5);
  }
}
#h4Color {
  color: white;
  background-color: rgba(10, 10, 10, 0.7);
  border-radius: 10px;
  padding-right: 0.3rem;
  padding-left: 0.3rem;
  margin-top: 0.3rem;
}
#tipsContainer,
#tipsContainerTitle {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  width: 400px;
}
#tipsContainerTitle {
  color: white;
}
#container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
#switchBack {
  background-color: red;
}
#importantIcon {
  width: 20px;
  height: 20px;
  position: relative;
  margin-bottom: -5px;
}
#importantIcon1 {
  width: 25px;
  height: 20px;
  position: relative;
  margin-bottom: -5px;
}
#importantIcon2 {
  width: 25px;
  height: 20px;
  margin-bottom: -5px;
}
#cryingIcon {
  width: 25px;
  height: 25px;
}
.toNone {
  display: none;
}
</style>