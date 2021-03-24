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
        <!-- <v-img contain max-height="50" class="game-on-btn" src="../assets/lobby/game-on-btn.png" v-on:click="closePrompt"></v-img> -->
        <!-- <v-btn class="game-on-btn"><span>GAME ON</span></v-btn> -->
        <button class="game-on-btn" v-on:click="closePrompt">GAME ON</button>
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
    color: #FF990D;
    background-color: rgb(37, 37, 37) !important;
    border: 5px solid #FF990D;
    border-radius: 0px;
    font-family: "oceanicdriftlaser";
    font-size: 28px;
    width: 30%;
    /* height: 300px; */
    /* padding: 30px; */
    box-shadow: 0 0 10px rgb(255, 0, 0);
    text-shadow: 0 0 10px rgb(255, 0, 0);
    /* max-width: 200px; */
}
.game-on-btn:hover{
    cursor: pointer;
}
</style>
