<template>
  <v-container v-if="getAllGames">
    <v-card id="cardTable">
      <v-spacer></v-spacer>
      <v-card id="cardColor" dark>
        <v-card-title>
          List of Games
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

            <td>{{row.item.game_status[row.item.game_status.length-1].status}}</td>

            <td>
              <v-btn
                router-link
                :to="`/game/selected/${row.item.game_id}`"
                v-if="currentPlayer==row.item.game_player&& currentPlayer!=null"
              >Access</v-btn>
              <div v-else>
                <v-btn router-link
                :to="`/game/selected/statistic/${row.item.game_id}`">Check shots</v-btn>
                <v-btn>Graphics</v-btn>
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
    onButtonClick(item) {
      console.log("click on " + item.no);
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
          console.log(statusFinal);
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

    await console.log(this.getAllGames);
    await this.getLastGameStatus;
    await console.log(this.getLastGameStatus);
    await console.log(this.lastGameStatus);
    await console.log(this.currentPlayer);
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
</style>