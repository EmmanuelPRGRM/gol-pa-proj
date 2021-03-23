<template>
 
  <div class="pt-10">
    <!-- processed image -->
    <div
      class="mx-auto d-block"
      id="cam-box"
    >
      <!-- style="width:360px;height:360px;max-width:95vw; max-height:95vw;border:2px solid yellow;" -->
      <v-img
        width="100%"
        height="430"
        :src="imageSrc"
      ></v-img>
    </div>
    <!-- buttons -->
    <v-row
      style=""
      class="mt-10 mx-10"
    >
      <!-- redo -->
      <v-col cols="6">
        <photowalk-button
          pulse
          width="90%"
          text="Reset"
          @click="$emit('reset')"
        >
          <v-icon
            :x-large="$vuetify.breakpoint.mdAndUp"
            color="red darken-1"
          >
            mdi-redo-variant
          </v-icon>
        </photowalk-button>
      </v-col>
      <!-- save -->
      <v-col cols="6">
        <photowalk-button
          pulse
          width="90%"
          text="Download"
          @click="saveImage"
        >
          <v-icon
            :x-large="$vuetify.breakpoint.mdAndUp"
            color="red darken-1"
          >
            mdi-download-box
          </v-icon>
        </photowalk-button>
      </v-col>
      
    </v-row>
  </div>
</template>

<script>
import PhotowalkButton from './PhotoboothButton.vue'
// import axios from 'axios'
export default {
  components: {  
    PhotowalkButton,
  },

  props: {
    // source of the image to be processed
    image: {
      type: String,
      default: null 
    },
    removeBg: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      // raw image config
      rawImgWidth: null,
      rawImgHeight: null,
      // image processed via removebg api
      processedImg: null,
      // image to be displayed
      imageSrc: null,
      error: false
    }
  },

  methods: {
    loadRawImage() {
      console.log('fetching', this.image)
      var rawImg = new window.Image();
      rawImg.src = this.image;
      rawImg.onload = () => {
        // raw image res
        this.setRawImageResolution(rawImg.width, rawImg.height)
        // starts the process of background removal
        this.removeBackground()
      }
    },
    removeBackground() {
      this.fetchFromRemoveBgApi(this.image).then( response => {
        // convert fetched data to display to base64 image
        let blob = new Blob(
          [response.data], 
          { type: response.headers['content-type'] }
        )
        this.processedImg = URL.createObjectURL(blob)

        this.setDisplayImg()
      }).catch( () => {
        this.error = true
      })
    },

    // download the image
    saveImage() {
      var link = document.createElement('a');
      link.download = "Alaska Photobooth.jpg";
      link.href = this.imageSrc;
      link.click();
    },
    sendImage() {
      console.log('sending')
      // canvas for combining image
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      // load the main image
      let mainImg = new Image();
      mainImg.src = this.imageSrc;
      mainImg.onload = () => {
        
        canvas.width = mainImg.width/2
        canvas.height = mainImg.height/2
        // console.log(mainImg.height)

        
        ctx.drawImage(mainImg, 
            0, 0, mainImg.width, mainImg.width/(canvas.width/canvas.height), 
            0, 0, canvas.width, canvas.height
        );
        // load the frame image
        // console.log(mainImg.src)
        canvas.toBlob(blob => {
          var headers = {
            Authorization: 'Bearer ' + localStorage.getItem('auth_token') 
          }
          let data = new FormData()
          data.append('key', 'photowall')
          data.append('file', blob)

          this.$http.post('upload', data, { headers })
          .then( response => {
            console.log(response)
          })
          .catch( error => {
            console.log(error)
          })
        })
      }
    },


    
    /** SETTERS */

    setRawImageResolution(width, height) {
      this.rawImgWidth = width
      this.rawImgHeight = height
    },
    // sets the background for the remove bg png
    setDisplayImg() {
      // canvas for combining image
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      canvas.width = this.rawImgWidth;
      canvas.height = this.rawImgHeight;
        
      var noBgImage = new Image()
      noBgImage.src = this.processedImg
      noBgImage.onload = () => {
        ctx.drawImage(noBgImage, 
            0, 0, noBgImage.width, noBgImage.height, 
            0, 0, canvas.width, canvas.height
        );

        this.imageSrc = canvas.toDataURL()
      }
    },


    /** HELPERS */

    // remove.bg API
    fetchFromRemoveBgApi (uploadImg) {
      // request config
      // var config = {
      //   responseType: 'arraybuffer',
      //   // API Key from your remove.bg account 
      //   headers: { 'X-Api-Key': '7kTS5FQzxW2DpKi6dFKpFo4R' },
      // }
      // request data
      var data = new FormData();
      data.append('image_file_b64',  uploadImg)
      data.append('size', 'auto' )
      // return axios.post('https://api.remove.bg/v1.0/removebg', data, config)
    }

  },

  mounted () {
    console.log('test',this.image)

    if ( this.removeBg )
      this.loadRawImage()
    else {
      this.imageSrc = this.image
      this.sendImage()
    }


  },
}
</script>

<style lang="scss" scoped>
#cam-box {
  width:430px;
  height:430px;
  max-width:95vw;
  max-height:95vw;

  border: 2px solid red;

}
</style>