/* eslint-disable vue/experimental-script-setup-vars */
<template>
  <v-container fluid class="fill-height black">
     <v-overlay
      v-if="!ready"
    >
      <component :is="$vuetify.breakpoint.mdAndUp ? 'h3' : 'h6'">
        <v-progress-circular
          class="mr-5"
          width="3"
          :size="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
          :indeterminate="!progress"
          :value="progress"
        ></v-progress-circular>
        <span class="text-uppercase">
          Loading...
        </span>
      </component>
    </v-overlay>
    <iframe
      v-show="ready"
      src="https://player.vimeo.com/video/524849184?background=1&loop=false&quality=1080p"
      ref="vimeoPlayer"
      width="100%"
      height="100%"
      frameborder="0"
      autoplay
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      id="vimeoVid"
      allowfullscreen
    ></iframe>
  </v-container>
</template>

<script>
import tidio from '@/helpers/tidio'
import Player from '@vimeo/player'

export default {

  data () {
    return {
      // isSafari: this.$store.getters['transition/iOS'],
      // showUnMute: this.$store.getters['transition/iOS'],
      // network: 1,
      player: null,
      ready: false,
      end: false,
      progress: 0
    }
  },

  methods: {
    loadVimeoVideo (videoId) {
      this.ready = false
      this.player.loadVideo(videoId).then(() => {
        // this.setVimeoQuality()
        this.transitionProgressWatch()
        this.transitionCloseWatch()
      })
    },
    playVimeoVideo () {
      this.player.play().then(() => {
        // pauses the video to allow the progression listener
        // to load the video up to 70%
        // then the listener will automatically play when 70% done
        this.player.pause()

        // watcher for the transition loading..play when on 50% loaded
        // watcher for when the transition ends
        this.transitionCloseWatch()
        // fail saive for progress watcher
        setTimeout(() => {
          this.transitionProgressWatch()
        }, 5000)
      }).catch((error) => {
        // player can only pltrnaay if its not directly accessed via url
        var noInteractError = "didn't interact with the document"
        if (error.toString().includes(noInteractError)) { this.$router.goTo(-1) } else {
          this.player.setMuted(this.isSafari).then(() => {
            console.log('muted')
            this.transitionProgressWatch()
            this.transitionCloseWatch()
          })
        }
      })
    },

    /** HELPER */

    initializeVimeoPlayer () {
      // initialize the vimeo player plugin
      var iframe = this.$refs.vimeoPlayer
      // console.log(iframe)
      this.player = new Player(iframe)

      this.player.setQuality('1080p').then(function (quality) {
        // quality was successfully set
        console.log('quality successfully set to: ' + quality)
      }).catch(function (error) {
        switch (error.name) {
          case 'TypeError':
            // the quality selected is not valid
            console.log('the quality selected is not valid')
            break

          default:
            // some other error occurred
            console.log('some other error occurred')
            break
        }
      })

      // progression listener (play only when 70% loaded)
      // this.vimeo.player.on('progress', (progress)=> {
      //   this.transitionProgressWatch(progress)
      // });
    },

    transitionProgressWatch () {
      var progressChecker = () => setTimeout(async () => {
        var progress = await this.player.getBuffered()

        if (progress.length === 0) {
          console.log('pre-loading')
          this.playVimeoVideo()
          progressChecker()
        } else {
          progress = progress[0][1]
          var duration = await this.player.getDuration()
          var percentProgress = Math.round((progress / (duration / 2)) * 100)
          if (percentProgress < 5) {
            console.log('loading %: ', percentProgress)
            this.progress = percentProgress
            progressChecker()
          } else {
            console.log('playing')
            this.progress = 0
            this.ready = true
            this.player.play()
            clearTimeout(progressChecker)
          }
        }
      }, 1000)
      // initial call
      progressChecker()
    },

    transitionCloseWatch () {
      var endChecker = () => setTimeout(() => {
        this.player.getEnded().then((ended) => {
          // console.log(' video ended> ',ended)
          if (!ended) {
            endChecker()
          } else {
            // localStorage.setItem('lobby_transitioned', true)
            this.$router.push({ name: 'Login' })
          }
        }).catch(function (error) {
          console.log(error)
        })
      }, 1000)
      // initial call
      endChecker()
    }
  },

  mounted () {
    // if (localStorage.getItem('lobby_transitioned')) { this.$router.push({ name: 'Login' }) }

    tidio.unmount()
    this.initializeVimeoPlayer()
    this.loadVimeoVideo(524849184)
    // this.loadVimeoVideo(463829285)

    // console.log(this.isSafari)
  }
}
</script>

<style scoped>
*
{
  padding: 0%;
  margin: 0%;
}
#vimeoVid {
  position: absolute;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: black;
}

button {
    display: none;
    visibility: hidden;
}

v-container {
  padding: 0px;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
