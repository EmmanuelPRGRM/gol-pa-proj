<template>
  <v-dialog
    v-model="showPrompt"
    persistent
    overlay-opacity=".6"
    overlay-color="black"
    width="600px"
  >
    <v-img  v-on:click="promptLogic" contain src="../assets/landing/modal.png" class="modal"> </v-img>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      showPrompt: true
    }
  },
  methods: {
    promptLogic: function () {
      this.showPrompt = false
      this.$router.push({ name: 'LoginAnimation' })
    }
  },
  mounted () {}
}
</script>

<style scoped>
.modal {
  opacity: 0.9;
}
</style>
