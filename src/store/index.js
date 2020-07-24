import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["allGamesData", "scorePlayer", "userRegisteredState"],
    }),
  ],
  state: {
    userRegisteredState: {
      status: false,
    },
    user: null,
    allGamesData: [],
    popError: false,
    selectedGame: {},
    scorePlayer: [],
    allShotsPlayer: [],
  },

  getters: {
    getAllGames(state) {
      return state.allGamesData;
    },

    getSelectedGame: (state) => (gameCrabId) => {
      return state.allGamesData.all_games.find((gameID) => {
        // console.log(gameID);
        // console.log(state.allGamesData);

        return gameID.game_id == Number(gameCrabId);
      });
    },

    getScorePlayer(state) {
      console.log(state.scorePlayer);

      return state.scorePlayer;
    },
    getUserStatus(state) {
      return state.userRegisteredState.status;
    },
    getallShotsPlayer(state) {
      console.log(state.allShotsPlayer);

      return state.allShotsPlayer;
    },
  },
  mutations: {
    setAllGames(state, payload) {
      return (state.allGamesData = payload);
    },

    setUserRegistered(state, payload) {
      return (state.userRegisteredState.status = payload);
    },

    setOneGame(state, payloadId) {
      return (state.gameSelected = payloadId);
    },

    setPop(state, payload) {
      return (state.popError = payload);
    },
    setScorePlayer(state, payload) {
      return (state.scorePlayer = payload);
    },
    setAllShots(state, payload) {
      console.log(payload);
      return (state.allShotsPlayer = payload);
    },
  },

  actions: {
    //=====================================================================================
    //obteneidno todos los juegos existentes
    //=====================================================================================
    allGames({ commit }) {
      return fetch("/crabs/game/all", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET",
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((response) => {
          console.log(response);
          return response, commit("setAllGames", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //================================================================================
    //Obteniendo todos los socres y disparos por jugador en cada juego
    //===============================================================================
    scorePlayer({ commit }) {
      return fetch("/crabs/game/scorepoll", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET",
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((response) => {
          console.log(response);
          return response, commit("setScorePlayer", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //=====================================================================================
    //obteneidno todos los disparos deljugador
    //=====================================================================================
    allShots({ commit }) {
      if (this.state.allGamesData.player != null) {
        return fetch("/crabs/game/allshots", {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "GET",
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((response) => {
            console.log(response);
            return response, commit("setAllShots", response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //=====================================================================================
    //obteneidno un juego segun el id proveido
    //=====================================================================================
    oneGame({ commit, dispatch }, gameCrabId) {
      return fetch("/crabs/game/" + gameCrabId, {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "GET",
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((response) => {
          console.log(response);
          return response, commit("setOneGame", response), dispatch("allShots");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //=============================================================================
    //Proceso de crear un juego nuevo por el usuario logeado
    //=============================================================================
    async createGame({ dispatch, commit }) {
      fetch("/crabs/game/create", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        // body: JSON.stringify(payload)
      })
        .then((newData) => {
          console.log("data sent :", JSON.stringify(newData));
          return newData.json();
        })
        .then(async (data) => {
          if (data.Error) {
            return console.log("Creating Game Failed!!", data);
          } else {
            console.log("Succesfull", data);
            await dispatch("allGames");

            console.log(data, Object.values(data)[0]);

            router.push(`/game/selected/${Object.values(data)[0]}`);
          }
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
    },

    //=================================================================================
    //Disparando un nuevo tiro de dados
    //================================================================================
    throwDices({ commit, dispatch }, gameId) {
      console.log(gameId);

      return fetch("/crabs/game/play/" + gameId, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        // method: "PUT"
      })
        .then((response) => {
          console.log(response);

          return response.json();
        })
        .then((response) => {
          if (response.Error) {
            console.log("Error en disparo", response.Error);

            return response.Error;
          } else {
            dispatch("allGames");
            dispatch("allShots");
            console.log(response);
          }
        })
        .catch((error) => {
          error;
          console.log(error);
        });
    },
    //=====================================================================================
    //proceso para registrar en sign in al usuario
    //=====================================================================================
    loginUser({ commit, dispatch }, payload) {
      fetch("/crabs/game/login", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: getBody({
          userName: payload.userName,
          userPassword: payload.userPassword,
        }),
      })
        .then((userRegistered) => {
          if (userRegistered.Error) {
            userRegistered.Error;
            commit("setUserRegistered", false);

            // if (userRegistered.status != 200) {
            //   commit("setPop", true);
            //   setTimeout(() => {
            //     commit("setPop", false);
            //   }, 2000);
            // }
          } else {
            userRegistered, commit("setUserRegistered", true);
            router.push("/"), dispatch("allGames");
          }
        })
        .catch((error) => {
          console.log("error", error);
          error;
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },
    //=====================================================================================
    //proceso para el sign up del usuario
    //=====================================================================================
    signUpUser({ commit, dispatch }, payload) {
      fetch("/crabs/game/register", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((user) => {
          console.log("data sent :", JSON.stringify(user));
          console.log(payload);
          return user.json();
        })
        .then((user) => {
          if (user.Error) {
            console.log("error", user);
            user.Error;
            commit("setUserRegistered", false);
          } else {
            // console.log("Success", user);
            user;
            dispatch("loginUser", payload);
            commit("setUserRegistered", true);
          }
        })
        .catch((error) => {
          // console.log("Error on SignUp", error);
          error;
        });
    },
    //=====================================================================================
    //proceso para retirar el usuario de login
    //=====================================================================================
    logOutUser({ commit, dispatch }) {
      fetch("/crabs/game/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      })
        .then((userRegistered) => {
          userRegistered;
          commit("setUserRegistered", false);
          router.push("/login");
          dispatch("allGames");
        })
        .catch((error) => {
          console.log("Error on Log Out: ", error);
          error;
        });
    },
  },
});
