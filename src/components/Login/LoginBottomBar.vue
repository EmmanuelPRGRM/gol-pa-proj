<template>
  <v-container
    fluid
    id="container"
    class="pa-0"
  >
    <v-row align="center" justify="start" class="fill-height ma-0">
      <v-col cols="2">
        <lobby-faq></lobby-faq>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LobbyFaq from '../Lobby/LobbyFaq.vue';
export default {
  name: 'LoginBottomBar',

  components: { LobbyFaq }
};
</script>

<style lang="scss" scoped>
#container {
  position: fixed;
  left:0;
  bottom: 0;
  height: 70px;
}
</style>