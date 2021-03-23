<template>
  <transition name="overlay">
    <div 
      id="overlay"
      v-if="notifyOrientationChange"
    >
      <!-- background element -->
      <div id="background"></div>

      <!-- main content -->
      <div id="content">        
        <img
          v-if="orientation == 'portrait'"
          src="@/assets/orientation-blocker/rotate-to-portrait.gif"
          width="50%"
        />
        <img
          v-else
          src="@/assets/orientation-blocker/rotate-to-landscape.gif"
          width="50%"
        />
        <h4 id="label">
          Flip to {{ orientation  }} mode for better experience
        </h4>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseOrientationBlocker',

  data: ()=> ({
    orientation: 'landscape',
    /** opens the overlay that notifies user to change orientation */
    notifyOrientationChange: false,
  }),


  watch: {
    /** extra methods to be activated via requiredorientation change */
    orientation(val) {
      if (val) {
        this.delayOrientationChangeCheck()
        this.checkOrientationRequirement()
        // // change check screen ration upon orientation change or resize
        window.addEventListener("orientationchange", this.delayOrientationChangeCheck);
        window.addEventListener("resize", this.checkOrientationRequirement);
      }
      else {
        // reduces memory intake by removing listeners when not needed
        window.removeEventListener("orientationchange", this.delayOrientationChangeCheck);
        window.removeEventListener('resize', this.checkOrientationRequirement)
      }
    }
  },

  methods: {
    /**
     * Checks if the orientation meets the requirement set by the app
     */
    checkOrientationRequirement() {
      var val = this.orientation
      var _height = window.innerHeight
      var _width = window.innerWidth
      // console.log(val)
      if ( ( val == 'landscape' &&  _height > _width 
      || val == 'portrait' && _height < _width ) 
      &&  this.$vuetify.breakpoint.smAndDown )
        this.notifyOrientationChange = true
      else
        this.notifyOrientationChange = false
    },
    delayOrientationChangeCheck() {
      setTimeout( ()=>{
        this.checkOrientationRequirement()
      },2000);
    },
  },

  mounted() {
    if (this.orientation) {
      this.delayOrientationChangeCheck()
      this.checkOrientationRequirement()
      // // change check screen ration upon orientation change or resize
      window.addEventListener("orientationchange", this.delayOrientationChangeCheck);
      window.addEventListener("resize", this.checkOrientationRequirement);
    }
    else {
      // reduces memory intake by removing listeners when not needed
      window.removeEventListener("orientationchange", this.delayOrientationChangeCheck);
      window.removeEventListener('resize', this.checkOrientationRequirement)
    }
  }
}
</script>

<style lang="scss" scoped>
#overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  overflow: hidden;


  #background {
    background-color: rgb(29, 29, 29);
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    opacity: 1;
    z-index: -1;
  }

  #content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
    width: 100%;

    #label {
      text-transform: uppercase;
      color: white;
    }
  }

}

// transition class
.overlay-enter-active, .overlay-leave-active {
  transition: opacity .3s ease-in-out;
}
.overlay-enter, .overlay-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>