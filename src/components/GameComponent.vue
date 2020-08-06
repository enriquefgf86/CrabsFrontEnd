<template>
  <v-container v-if="getAllGames">
    <v-card id="cardTable">
      <v-spacer></v-spacer>
      <v-card id="cardColor" dark>
        <v-card-title>
          <img id="gamesList" src="../assets/gamesList.png" alt="games">
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Player"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-card>

      <v-data-table
        id="cardTableDetail"
        :headers="headers"
        :items="getAllGames.all_games"
        :items-per-page="5"
        :sort-by="['game_player']"
        :sort-desc="[false, true]"
        :search="search"
      >
        <template v-slot:item="row">
          <tr>
            <td>Game #{{row.item.game_id}}</td>

            <td>{{row.item.game_player}}</td>

            <td class="d-flex flex-row align-center">
              <!-- <img
                id="winners"
                v-if="row.item.game_status[row.item.game_status.length-1].status=='Wins'"
                src="../assets/emoji.gif"
                alt="winner"
              />
              <img
                id="looser"
                v-if="row.item.game_status[row.item.game_status.length-1].status=='Looses'"
                src="../assets/looserEmoji.gif"
                alt="looser"
              />
              <img
                id="keeps"
                v-if="row.item.game_status[row.item.game_status.length-1].status=='Keeps'"
                src="../assets/keepsOn.gif"
                alt="keeps"
              /> -->

              <!-- <h4>{{row.item.game_status[row.item.game_status.length-1].status}}</h4> -->
              <img

                id="Looser"
                v-if="row.item.game_status[row.item.game_status.length-1].status=='Looses'"
                src="../assets/looser.gif"
                alt="Looser"
              />
              <img
                id="winner"
                v-if="row.item.game_status[row.item.game_status.length-1].status=='Wins'"
                src="../assets/winner.gif"
                alt="winner"
              />
              <img
                id="Keeps"
                v-if="row.item.game_status[row.item.game_status.length-1].status=='Keeps'"
                src="../assets/keeps.gif"
                alt="keeps"
              />

            </td>

            <td>
              <v-btn
                router-link
                :to="`/game/selected/${row.item.game_id}`"
                v-if="currentPlayer==row.item.game_player&& currentPlayer!=null"
              >Access</v-btn>
              <div v-else>
                <v-btn router-link id="record" :to="`/game/selected/statistic/${row.item.game_id}`">
                  Record
                  <img id="recordImg" src="../assets/record.png" alt="record" />
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "GameComponent",
  props: { GameComponent: Object },
  data() {
    return {
      lastGameStatus: [],
      currentPlayer: null,
      search: "",
      dialogWindow: false,
    };
  },
  methods: {
    ...mapActions(["allGames"]),
    allGamesJson() {
      return this.$store.dispatch("allGames");
    },
  },
  computed: {
    ...mapGetters(["getAllGames"]),
    getLastGameStatus() {
      if (this.getAllGames.player != null) {
        var status = this.getAllGames.all_games;
        var player = this.getAllGames.player;
        this.lastGameStatus = [];
        this.currentPlayer = null;

        // for (let i = 0; i <script status.length; i++) {
        //   var gamesStatus = status[i].game_status;
        //   let statusFinal = gamesStatus.splice(-1);
        //   this.lastGameStatus.push(statusFinal[0].status);
        //   console.log(statusFinal);
        // }///este modalidad funciona igual

        status.forEach((element) => {
          var gamesStatus = element.game_status;
          var statusFinal = gamesStatus[gamesStatus.length - 1];
          this.lastGameStatus.push(statusFinal.status);
          // console.log(statusFinal);
        });
        this.currentPlayer = player.player_name;
      }
    },
    
    headers() {
      if (this.getAllGames.all_games) {
        return [
          {
            text: "Game",
            sortable: true,
            value: "game_id",
          },
          {
            text: "Player",
            sortable: true,
            value: "game_player",
          },
          {
            text: "Status",
            sortable: false,
            // value: "game_status.status"
          },
          {
            text: "Permission",
            sortable: false,
            // value: "permission"
          },
        ];
      }
    },
  },
  async created() {
    await this.allGames();
    await this.getAllGames;
    await this.allGamesJson;
await this.getLastGameStatus;
    // await console.log(this.getAllGames);
    
    // await console.log(this.getLastGameStatus);
    // await console.log(this.lastGameStatus);
    // await console.log(this.currentPlayer);
  },
  watch: {},
};
</script>

<style>
/* #table{
  background-image: url('../assets/descarga.png');
} */
#cardTable {
  background-color: rgba(255, 255, 255, 0.2);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 20px;
  color: white;
}

#cardTableDetail {
  background-color: rgba(255, 255, 255, 0.5);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 20px;
  font-weight: bold;
}
#cardColor {
  background-color: rgba(255, 255, 255, 0.3);
}
#recordImg {
  width: 35px;
  height: 35px;
}
#record {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

#winners {
  width: 50px;
  height: 45px;
}
#winner{
  width: 50px;
  height: 45px;
}
#looser {
  width: 50px;
  height: 50px;
}
#keeps {
  width: 40px;
  height: 40px;
}
#Looser,#Keeps{
   width: 50px;
  height: 35px;
}
#gamesList{
  position: relative;
  width:100px;
  height:40px
}
</style>