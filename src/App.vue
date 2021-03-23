<template>
  <v-app>
    <v-main>
      <Lobby/>
    </v-main>
    <orientation-blocker></orientation-blocker>
  </v-app>
</template>

<script>
import Lobby from './views/Lobby.vue';

export default {
  name: 'App',

  components: {
    Lobby,
    OrientationBlocker: () => import('@/components/OrientationBlocker.vue'),
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
  font-family: "Azonix";
  src: local("Azonix"),
   url(./fonts/Azonix.otf) format("truetype");
}
@font-face {
  font-family: "OratorStd";
  src: local("OratorStd"),
   url(./fonts/OratorStd.otf) format("truetype");
}
@font-face {
  font-family: "oceanicdriftlaser";
  src: local("oceanicdriftlaser"),
   url(./fonts/oceanicdriftlaser.ttf) format("truetype");
}

orientation-blocker
{
    z-index: 1;
}
</style>
