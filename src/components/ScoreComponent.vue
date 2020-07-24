<template>
  <v-container>
    <v-content v-if="getShotScoreGames">
      <div v-if=" getShotScoreGames"></div>
      <v-card id="cardScore">
        <v-card-title class="d-flex justify-space-between"><h4>Score Poll</h4><img @click="routering" router-link to="/" id="backImg" src="../assets/goBack.png" alt="back"/></v-card-title>
        <v-container>
          <v-data-table id="cardScoreTable"  :headers="headers" :items="arrayOfScores">
            <template v-slot:item="row">
              <tr>
                <td>{{row.item.player}}</td>
                <td>{{row.item.games_played}}</td>
                <td>{{row.item.score}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ScoreComponent",
  props: { ScoreComponent: Object },
  data() {
    return {
      state: this.$store.state,
      arrayOfScores: []
    };
  },
  methods: {
    ...mapActions(["allGames", "scorePlayer"]),
    getGames() {
      return this.$store.dispatch("scorePlayer");
    },
    routering(){
      return this.$router.push('/')
    },
  },
  computed: {
    ...mapGetters(["getAllGames", "getScorePlayer"]),

    

    getShotScoreGames() {
      return this.$store.getters.getScorePlayer;
    },
    tableScore() {
      let conforming = this.$store.getters.getScorePlayer.player_details_all;
      console.log(conforming);
      console.log(this.$store.getters.getScorePlayer.player_details_all);
      // let arrayOfScores = [];

      conforming.forEach(element => {
        let playerObject = {
          player: element.player_name,
          wins: 0,
          lost: 0,
          score: 0,
          keeps: 0,
          games_played: 0,
          shots: {
            turn_and_shots: []
          }
        };

        element.details_score_game.forEach(score => {
          switch (score.game_score) {
            case -1.0:
              playerObject.lost += 1;
              playerObject.score = playerObject.score - 1;
              playerObject.games_played = playerObject.games_played + 1;
              break;
            case 0.0:
              playerObject.keeps += 1;
              playerObject.score = playerObject.score + 0.0;
              playerObject.games_played = playerObject.games_played + 1;
              break;

            case 1.0:
              playerObject.wins += 1;
              playerObject.score = playerObject.score + 1;
              playerObject.games_played = playerObject.games_played + 1;
              break;
            default:
              break;
          }
          let counter = 0;
          score.shots_in_game.forEach(shot => {
            counter++;
            playerObject.shots.turn_and_shots.push(
              new Object({
                game: score.game_id,
                per_game: {
                  turn: counter,

                  details: {
                    shot_dice1: shot.shot_dice_1,
                    shot_dice2: shot.shot_dice_2
                  }
                }
              })
            );
          });
        });

        this.arrayOfScores.push(playerObject);
        console.log(playerObject);
        console.log(this.arrayOfScores);
      });
      return (
        this.arrayOfScores.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          } else if (a.score > b.score) {
            return -1;
          } else if (a.score == b.score) {
            return a.wins + a.lost + a.keeps < b.wins + b.lost + b.keeps;
          }
        }),
        console.log(this.arrayOfScores)
      );
    },
    headers() {
      return [{ text: "Player" }, { text: "Games" }, { text: "Score" }];
    }
  },
  created() {
    this.getGames();
    this.allGames;
    this.getShotScoreGames;
    this.tableScore;
    console.log(this.getGames());
    console.log(this.getShotScoreGames);
    console.log(this.state);
    console.log(this.tableScore);
  },
  watch: {}
};
</script>

<style>
#cardScore {
  background-color: rgba(255,255,255,0.2);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 20px;
  color:white
}

#cardScoreTable {
  background-color: rgba(255,255,255,0.3);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 20px;
  font-weight: bold;
}
#backImg{
  width:30px;
  height:30px
}
</style>
