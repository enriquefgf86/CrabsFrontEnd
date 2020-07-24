<template>
  <v-app id="gameView">
    <router-view></router-view>
  </v-app>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  name: "App",
data(){
  return{}
},
  components: {},
  methods:{},
  computed:{},
  created(){},
  watch:{},
};
</script>
<style >
#gameView{
  background-image:url("./assets/tableCasino.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
