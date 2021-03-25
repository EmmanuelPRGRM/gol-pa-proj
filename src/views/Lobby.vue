/* eslint-disable vue/experimental-script-setup-vars */
<template>
    <v-container fill-height fluid black class="container">
     <welcome-modal></welcome-modal>
    <v-overlay
            absolute
            z-index="0"
            opacity="1"
        >
            <v-img
                :src="bgDark"
                :style="{opacity:1, width:'100vw', height: '100vh'}"></v-img>
        </v-overlay>
            <div :style="{
                position: 'absolute',
                width:'100%',
                height:'100%'
                }">
                <div
                    class="ma-auto parent"
                    :style="{
                        height: '100%',
                        width: '100%',
                        maxHeight:'56vw',
                        maxWidth:'178vh',
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        zIndex:2,
                        position:'absolute',
                        top:0,
                        left:0,
                        bottom:0,
                        right:0,
                    }"
                >
                <!-- contents here-->
                <div class=" v-image v-responsive blue-border theme--light mainLobbyContainer">
                    <div class="liveStreamContainer">
                        <iframe src="https://vimeo.com/event/818966/embed/1815aa46b8?autoplay=1" frameborder="0" allow="autoplay; picture-in-picture" style="top:0;left:0;width:100%;height:100%;"></iframe>
                    </div>
                    <!-- <v-img
                        class="blue-border"
                        src="@/assets/blue-border-gameon.png"
                        :style="{width:'70%', height:'70%', top:'13%'}">
                    </v-img> -->
                    <div class="chatQA">
                      <div class="chatBox">
                        <ChatBox />
                      </div>
                      <div class="qaContainer">
                      </div>
                    </div>
                </div>
                <div style="margin-top: 8%; margin-left:7%">
                  <v-img
                    :src="item.url"
                    class="cursor-pulse"
                    v-for="(item, key) of clickables"
                    :key="key"
                    :style="{
                        position:'relative',
                        top: item.y,
                        left: item.x,
                        width: item.width,
                        height: item.height,
                    }"
                     @click="cursorClick(item.name)"
                    ></v-img>
                </div>
                <v-dialog
                  id="unitygame-dialog"
                  v-model="unityGame"
                  v-if="unityGame"
                  fullscreen
                  :style="{
                        position:'absolute',
                        width: '100%',
                        height: '100%',
                        top:0,
                        left:0,
                        bottom:0,
                        right:0,
                   }">
                <game-frame></game-frame>
                <v-btn icon large style="position: absolute; color: #fff; right: 20px; top: 20px;" @click="unityGame = false">
                  <v-icon color="white" large>mdi-close-circle-outline</v-icon>
                </v-btn>
                </v-dialog>

                <v-dialog
                    id="unitygame-dialog"
                    v-model="unityLeaderboard"
                    v-if="unityLeaderboard"
                    fullscreen
                    :style="{
                        position:'absolute',
                        width: '100%',
                        height: '100%',
                        top:0,
                        left:0,
                        bottom:0,
                        right:0,
                   }">
                   <leaderboard-frame></leaderboard-frame>
                      <v-btn icon large style="position: absolute; color: #fff; right: 20px; top: 20px;" @click="unityLeaderboard = false">
                        <v-icon color="white" large>mdi-close-circle-outline</v-icon>
                      </v-btn>
                </v-dialog>

                <v-dialog
                    class="grey darken-4"
                    id="photobooth-dialog"
                    v-model="photobooth"
                    v-if="photobooth">
                    <v-btn icon large style="position: absolute; color: #fff; right: 20px; top: 28px;" @click="photobooth = false">
                      <v-icon color="white" large>mdi-close-circle-outline</v-icon>
                    </v-btn>
                        <iframe
                        allow="camera;microphone"
                        :style="{
                        background: 'transparent',
                        position:'relative',
                        width: '50vw',
                        height: '55vh',
                        justify: 'center',
                        border: 'none',
                        top:0,
                        marginLeft: '20%',
                        bottom:0,
                        right:0,
                        }"
                        id="photobooth-frame"
                        src="https://cogbooth.fourello.com/#/colpal"
                        title="W3Schools Free Online Web Tutorials">
                        </iframe>
                </v-dialog>
                <v-dialog v-model="showVlounge" v-if="showVlounge">
                <v-lounge></v-lounge>
                <v-btn icon large style="position: absolute; color: #fff; right: 20px; top: 28px;" @click="showVlounge = false">
                <v-icon color="white" large>mdi-close-circle-outline</v-icon>
                </v-btn>
                </v-dialog>
                 <orientation-blocker></orientation-blocker>
                </div>
            </div>
</v-container>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue' // @ is an alias to /src
import VLounge from '../components/VLounge.vue'
import WelcomeModal from '../components/WelcomeModal.vue'
import GameFrame from '../components/GameFrame.vue'
import LeaderboardFrame from '../components/LeaderboardFrame.vue'

export default {
  components: {
    ChatBox,
    VLounge,
    WelcomeModal,
    OrientationBlocker: () => import("@/components/OrientationBlocker.vue"),
    GameFrame,
    LeaderboardFrame,
  },

  data: () => ({
    showVlounge: false,
    unityGame: false,
    unityLeaderboard: false,
    photobooth: false,
    bgDark: require('@/assets/lobby-bg-2.png'),
    bg: require('@/assets/lobby-bg.png'),
    clickables: [
      {
        name: 'photobooth-btn',
        url: require('@/assets/photobooth-btn.png'),
        x: '0%',
        y: '15%',
        width: '15%',
        height: '8%'
      },
      {
        name: 'vlounge-btn',
        url: require('@/assets/vlounge-btn.png'),
        x: '0%',
        y: '15%',
        width: '15%',
        height: '8%'
      },
      {
        name: 'game-btn',
        url: require('@/assets/game-btn.png'),
        x: '0%',
        y: '15%',
        width: '15%',
        height: '8%'
      },
      {
        name: 'leaderboard-btn',
        url: require('@/assets/leaderboard-btn.png'),
        x: '0%',
        y: '15%',
        width: '15%',
        height: '8%'
      }
    ],
    choices: [],
    questionId: null
  }),

  methods: {
    cursorClick (val) {
      switch (val) {
        case 'game-btn':
          this.unityGame = true
          break
        case 'leaderboard-btn':
          this.unityLeaderboard = true
          break
        case 'vlounge-btn':
          this.showVlounge = true
          break
        case 'photobooth-btn':
          this.photobooth = true
          break
      }
    },
    getPublishedChoices: () => {
      // get published choices from api
      return {
        choices: [
          { id: 0, choice: 'Choice 12' },
          { id: 1, choice: 'Choice 2' },
          { id: 2, choice: 'Choice 2' }
        ],
        questionId: 'sampleId'
      }
    },
    submitChoice: () => {
      return []
    }
  },

  mounted () {
    let { choices = [], questionId = null } = this.getPublishedChoices()
    this.choices = choices
    this.questionId = questionId
  }
}
</script>

<style scoped>

.cursor-pulse
{
    display: inline-block;
    cursor: pointer;
}

#unitygame-frame
{
    margin-left: 8%;
}

v-dialog
{
    z-index: 1;
}

</style>

<style lang="scss" scoped>
.chatQA {
    width: 25%;
    text-align: left;
    float: right;
    margin-right: 5%;
    border: solid #75dfe3 4px;
    border-right: solid #75dfe3 20px;
    background: rgba(155 190 255 / 0%);
    height: 100%;
}

.liveBroadcast {
    float: left;
    width: 60%;
    height: 80%;
    margin-left: 5%;
    position: absolute;
    display: inline-block;
    left: 0;
}

.liveBroadcast iframe {
  width: 100%;
  height: 100%;
}

.bodyContainer {
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: inline-block;
}

.chatBox {
  height: 100%;
}

.liveStreamContainer {
    width: 70%;
    height: 100%;
}

.mainLobbyContainer {
    top: 15%;
    height: 70%;
}

#photobooth-dialog

{
  background-color: black !important;
}
</style>
