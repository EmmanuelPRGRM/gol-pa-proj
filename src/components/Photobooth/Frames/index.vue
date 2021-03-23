<template>
  <div id="container">    
    <orientation-blocker></orientation-blocker>
    
    <photobooth-camera
      v-if="isCurrentStep('camera')"
      :image="image"
      @capture="nextStep"
    ></photobooth-camera>
    
    <photobooth-frames
      v-if="isCurrentStep('frame')"
      @framed="nextStep"
    ></photobooth-frames>
    
    <photobooth-processor
      v-if="isCurrentStep('last')"
      :image="image"
      @reset="step = 1"
    ></photobooth-processor>
  </div>
</template>

<script>
import PhotoboothCamera from './PhotoboothCamera.vue';
import OrientationBlocker from './OrientationBlocker.vue';
import PhotoboothFrames from './PhotoboothFrames.vue';
import PhotoboothProcessor from './PhotoboothProcessor.vue';
export default {
  name: 'Photobooth',

  components: { OrientationBlocker, PhotoboothCamera, PhotoboothFrames, PhotoboothProcessor },

  props: {
    order: {
      type: [ Array, Object ],
      default: ()=> [ 'frame', 'camera', 'last'],
    },
    camera: {
      type: [ String, Number ],
      default: 1
    },
    frame: {
      type: [ String, Number, Boolean ],
      default: false
    },
    stickers: {
      type: [ String, Number, Boolean ],
      default:  false
    },
  },

  data() {
    return {
      step: 1,
      image: null,
    }
  },

  methods: {
    nextStep(image) {
      console.log('image is: ', image)
      this.image = image
      this.step++
    },
    isCurrentStep(component) {
      if ( Array.isArray(this.order) ) {
        // console.log(this.order[])
        return this.order[this.step - 1].toLowerCase() === component 
      }
      else {
        // console.log(this.order[this.next])
        return this.order[component] === this.step

      }
    }
  },
  mounted() {
    // tidio.hide()
    // this.durationId = setInterval(()=> {
    //   this.durationOpened++
    // },1000)
    this.$store.dispatch('awit/dot', { main_key: 'photo_lounge',  sub_key: 'frame_studio',  data_action: 'enter' })
    this.$store.dispatch('awit/addRange', { main_key: 'photo_lounge', sub_key: 'frame_studio' });
  },

  beforeDestroy () {
    this.$store.dispatch('awit/removeRange', { main_key: 'photo_lounge', sub_key: 'frame_studio' });
    // tidio.show()
    // clearInterval(this.durationId)
  },
};
</script>

<style lang="scss" scoped>
#container {
  background-image: url('~@/assets/bg1.jpg');
  width: 100%;
  height: 100vh;
  padding: 0;
  padding-top: 1%;
  margin: 0;
}
</style>