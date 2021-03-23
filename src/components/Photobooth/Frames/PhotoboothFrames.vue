<template>
  <div class="pt-10">
    <!-- processed image -->
    <div
      class="mx-auto d-block"
      id="cam-box"
    >
      <v-img 
        contain
        sizes="cover"
        width="100%"
        height="100%"
        class="light-green accent-3"
        :src="imageSrc"
      ></v-img>
    </div>

    <!-- <component
      v
      :is="$vuetify.breakpoint.mdAndUp ? 'h3' : 'h5'"
      class="white--text text-center text-uppercase primary--text  pa-1 mt-2 mx-auto"
      style="width:300px; background-color:#00122a"
    >
      Choose a frame
    </component> -->
    

    <!-- navigation -->
    <!-- <v-row
      class="white--text mx-10 mt-2 primary--text"
    >
      <v-col cols="6">
        <component
          :is="$vuetify.breakpoint.mdAndUp ? 'h4' : 'h6'"
          class="navigation"
          @click="$emit('redo')"
        >
          BACK
        </component>
      </v-col>
      <v-col cols="6">
        <component
          :is="$vuetify.breakpoint.mdAndUp ? 'h4' : 'h6'"
          class="navigation text-right"
          @click="$emit('framed', imageSrc)"
        >
          NEXT
        </component>
      </v-col>
    </v-row> -->

    <v-container
      fluid
      class="mt-3"
      :class="{
        'px-10':$vuetify.breakpoint.mdAndUp,
        'px-5':$vuetify.breakpoint.smAndDown
      }"
    >
      <v-row class="mx-15" style="" justify="center">
        <v-col
          v-for="frame in 2"
          :key="frame"
          cols="4"
          @click="setDisplayImg(frame)"
        >
          <v-img
            contain
            width="30%"
            class="mx-auto pa-1 elevation-5 light-green accent-3"
            :src="require(`./assets/frames/${frame}.png`)"
          ></v-img>
        </v-col>
      </v-row>
      
      <photobooth-button
        class="mt-10"
        width="100%"
        text="Choose Frame"
        @click="framed"
      ></photobooth-button>
    </v-container>
  </div>
</template>

<script>
import PhotoboothButton from './PhotoboothButton.vue'
// import axios from 'axios'
export default {
  components: {
    PhotoboothButton  
  },

  props: {
    // source of the image to be processed
    rawImgSrc: {
      type: String,
      default: null 
    },
  },

  data() {
    return {
      // raw image config
      rawImgWidth: null,
      rawImgHeight: null,
      // image to be displayed
      imageSrc: null,
      frame: 1,
    }
  },

  methods: {
    framed() {
      var image =  new Image()
      image.src = require(`./assets/frames/${this.frame}.png`)
      image.onload = () => {
        console.log('test image; ', image)
        this.$emit('framed', image.src)
      }
    },

    loadImage() {
      var image =  new Image()
      image.src = require('./assets/frames/colpal-blank.png')
      image.onload = () => {
        this.rawImgWidth = image.width
        this.rawImgHeight = image.height
        this.imageSrc = image.src
      }
    },
    
    /** SETTERS */

    setRawImageResolution(width, height) {
      this.rawImgWidth = width
      this.rawImgHeight = height
    },
    setDisplayImg(frame) {
      // canvas for combining image
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      canvas.width = 1024;
      canvas.height = 1024;
        
      // load the main image
      let mainImg = new Image();
      mainImg.src = require('./assets/frames/placeholder.jpg');
      mainImg.onload = () => {
        ctx.drawImage(mainImg, 
            0, 0, mainImg.width, mainImg.width/( canvas.width/canvas.height), 
            0, 0, canvas.width, canvas.height
        );
        // load the frame image
        var noBgImage = new Image()
        noBgImage.src = require(`./assets/frames/${frame}.png`)
        noBgImage.onload = () => {
          ctx.drawImage(noBgImage, 
              0, 0, noBgImage.width, noBgImage.height, 
              0, 0, canvas.width, canvas.height
          );
          this.frame = frame
          this.imageSrc = canvas.toDataURL()
        }
      }
    },



  },

  mounted () {
    this.loadImage()
  },
}
</script>

<style lang="scss" scoped>
#cam-box {
  width:300px;
  height:300px;
  max-width:95vw;
  max-height:95vw;

  // border: 2px solid red;

}

.navigation {
  cursor: pointer;
  transition: filter 0.2s ease-out;
  &:hover {
    filter: brightness(0.5)
  }
  &:active {
    filter: brightness(0.2)
  }
}
</style>