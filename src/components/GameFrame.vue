<template>
  <v-app>
    <v-main>
      <iframe
        :style="{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justify: 'center',
          border: 'none',
        }"
        id="unitygame-frame"
        :src="`https://game.onecpthedigitalevent2021.com?token=${getToken()}`"
      >
      </iframe>
    </v-main>
    <orientation-blocker></orientation-blocker>
  </v-app>
</template>

<script>
export default {
  components: {
    OrientationBlocker: () => import("@/components/OrientationBlocker.vue"),
  },
  methods: {
    getToken: function () {
      console.log(localStorage.getItem("auth_token"));
      return localStorage.getItem("auth_token");
    },
  },
  mounted() {
    this.setIframeToken();
  },
};
</script>

<style scoped>
iframe {
  overflow-y: hidden;
}
</style>