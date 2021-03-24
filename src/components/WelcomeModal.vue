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
            <p class="text-name">HI, {{ this.$store.firstName }}!</p>
            <p class="text-welcome">WELCOME TO<br>ONE CP: DIGITAL EVENT</p>
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
}

.text-name{
  font-size: 150%;
}

.text-welcome{
  font-size: 200%;
  line-height: 1.2;
  letter-spacing: 1px;
}

.join{
    color:white;
    font-family: "Azonix";
    font-size: 70%;
    letter-spacing: 1px;
}
.yellow-text{
    color: #FF990D;
}
.game-on-btn{
    padding: 0;
    margin: 0;
    color: #f5e500;
    background-color: rgb(37, 37, 37) !important;
    border: 2px solid#f5b400 ;
    border-radius: 0px;
    font-family: "oceanicdriftlaser";
    font-size: 35px;
    width: 30%;
    height: 15%;
    /* padding: 30px; */
    box-shadow: 0 0 20px rgb(255, 0, 0);
    text-shadow: 0 0 10px rgb(255, 0, 0);
    /* max-width: 200px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.game-on-btn:hover{
    cursor: pointer;
}
</style>
