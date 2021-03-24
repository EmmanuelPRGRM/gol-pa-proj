<template>
  <v-dialog
    v-model="showPrompt"
    persistent
    overlay-opacity=".6"
    overlay-color="black"
    width="600px"
  >
    <!-- <v-img  v-on:click="promptLogic" contain src="../assets/lobby/welcome-prompt.png" class="modal"> </v-img> -->
    <div class="bg-container">
        <div class="text-wrapper text-center">
            <p>HI, {{ this.$store.firstName }}!</p>
            <p>WELCOME TO</p>
            <p>ONE CP: DIGITAL EVENT</p>
            <p class="join">JOIN <span class="yellow-text">{{ team }}</span> IN THEIR NEW MISSION.</p>
        </div>
       <!-- <div class="game-on-btn"></div> -->
        <v-img contain max-height="50" class="game-on-btn" src="../assets/lobby/game-on-btn.png" v-on:click="closePrompt"></v-img>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      showPrompt: true,
      team: this.$store.teamName.replace('_', ' ')
    }
  },
  methods: {
    closePrompt: function () {
      this.showPrompt = false
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.modal {
  opacity: 0.9;
}
.bg-container {
    background-image: url('../assets/lobby/welcome-prompt.png');
    background-size: contain;
    background-position: center;
    height: 300px;
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.text-wrapper{
    color: #00FFFF;
    font-family: "Azonix";
    font-size: 150%;
}
.join{
    color:white;
    font-family: "Azonix";
    font-size: 50%;
}
.yellow-text{
    color: #FF990D;
}
.game-on-btn{
    padding: 0;
    margin: 0;
}
.game-on-btn:hover{
    cursor: pointer;
}
</style>
