<template>
    <v-container fill-height fluid black class="container">
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
                <div class="liveStreamContainer">
                    <iframe src="https://vimeo.com/event/818966/embed/1815aa46b8?autoplay=1" frameborder="0" allow="autoplay; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
                </div>
<!--                 <v-img 
                    class="blue-border"
                    src="@/assets/blue-border-gameon.png"
                    :style="{width:'70%', height:'70%', top:'13%'}">
                </v-img> -->
                <div class="chatQA">
                  <div class="chatBox">
                    <QandA :choices="choices" :questionId="questionId" />
                    <ChatBox :currentQuestionId="questionId" />
                  </div>
                  <div class="qaContainer">
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
                    v-if="unityGame">
                        <iframe
                         :style="{
                        position:'relative',
                        width: '80vw',
                        height: '80vh',
                        justify: 'center',
                        border: 'none',
                         }" 
                        id="unitygame-frame" 
                        src="https://game.onecpthedigitalevent2021.com" 
                        title="W3Schools Free Online Web Tutorials">
                        </iframe>
                </v-dialog>
                <v-dialog 
                    id="unitygame-dialog" 
                    v-model="unityLeaderboard" 
                    v-if="unityLeaderboard">
                        <iframe 
                         :style="{
                        position:'relative',
                        width: '80vw',
                        height: '80vh',
                        justify: 'center',
                        border: 'none',
                         }" 
                        id="unitygame-frame" 
                        src="https://leaderboard.onecpthedigitalevent2021.com" 
                        title="W3Schools Free Online Web Tutorials">
                        </iframe>
                </v-dialog>
                </div>
            </div>

</v-container>
</template>

<script>
import ChatBox from "@/components/ChatBox.vue"; // @ is an alias to /src
import QandA from "@/components/QandA.vue"; // @ is an alias to /src

export default {
      components: {
        ChatBox,
        QandA,
      },

      data: () => ({
         unityGame: false,
         unityLeaderboard:false,
         bgDark: require('@/assets/lobby-bg-2.png'),
         bg:require('@/assets/lobby-bg.png'),
         clickables: [
            {
                name: 'photobooth-btn',
                url: require('@/assets/photobooth-btn.png'),
                x: '0%',
                y: '15%',
                width:'15%',
                height: '8%'
            },
            {
                name: 'vlounge-btn',
                url: require('@/assets/vlounge-btn.png'),
                x: '0%',
                y: '15%',
                width:'15%',
                height: '8%'
            },
            {
                name: 'game-btn',
                url: require('@/assets/game-btn.png'),
                x: '0%',
                y: '15%',
                width:'15%',
                height: '8%'
            },
            {
                name: 'leaderboard-btn',
                url: require('@/assets/leaderboard-btn.png'),
                x: '0%',
                y: '15%',
                width:'15%',
                height: '8%'
            },
         ],
        choices: [],
        questionId: null,
      }),

       methods: {
        cursorClick(val) {
            switch(val) {
                case 'game-btn':
                    this.unityGame = true
                    break;
                case 'leaderboard-btn':
                    this.unityLeaderboard = true
                    break;
            }
        },
        getPublishedChoices: () => {
          // get published choices from api
          return {
            choices: [
              {id: 0, choice: "Choice 12" },
              {id: 1, choice: "Choice 2" },
              {id: 2, choice: "Choice 2" }
            ],
            questionId: "sampleId"
          }
        },
        submitChoice: () => {
          return [];
        }
       },

       mounted() {
        let {choices=[], questionId=null} = this.getPublishedChoices();
        this.choices = choices;
        this.questionId = questionId;
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
    width: 30%;
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
</style>