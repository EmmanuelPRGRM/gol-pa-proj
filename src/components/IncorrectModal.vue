<template>
  <v-dialog
    v-model="showPrompt"
    persistent
    overlay-opacity=".6"
    overlay-color="black"
    width="600px"
  >
    <v-img contain src="../assets/login/incorrect-prompt.png" class="modal">
      <v-img
        v-on:click="closeModal"
        contain
        src="../assets/login/okay-btn.png"
        max-height="30"
        max-width="300"
        class="okay-btn mx-auto"
        >{{ sharedState }}</v-img
      >
    </v-img>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showPrompt: true,
    };
  },
  methods: {
    closeModal: function () {
      this.showPrompt = false;
      window.location.reload();
    },
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped>
.modal {
  opacity: 0.9;
}
.okay-btn {
  margin-top: 20%;
}
.okay-btn:hover {
  margin-top: 20%;
  cursor: pointer;
}
</style>
