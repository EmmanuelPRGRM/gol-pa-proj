<template>
  <div id="container">
    <!-- web cam -->
    <div
      class="mx-auto d-block"
      style="width:400px;height:400px;max-width:95vw; max-height:95vw"
    >
      <v-img
        contain
        style="position:absolute;width:400px;height:400px;"
        :src="image"
      ></v-img>
      <v-fade-transition>
        <web-cam 
          v-show="started"
          ref="webcam"
          width="100%"
          height="100%"
          id="cam-box"
          :class="capture ? 'captured' : ''"
          :device-id="deviceId"
          :resolution="{
            height: 450,
            width: 450
          }"
          @started="onStarted"
          @stopped="onStopped"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"
        ></web-cam>
      </v-fade-transition>

      <!-- change camera button (for mobile) -->
      <span
        v-if="mobile"
        class="change-cam-btn"
        @click="changeCamera()"
        style="position:absolute; left:18%; top:12%"
      >
          <img
            src="./assets/change-cam.png"
            alt="change camera"
            width="30px"
          >
      </span>
    </div>
    <div class="d-flex justify-center">
      <photobooth-button
        class="mt-10"
        text="CAPTURE"
        @click="onCapture"
      >
      </photobooth-button>
    </div>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam"
import PhotoboothButton from './PhotoboothButton.vue';
export default {
  name: 'Camera',

  components: {  
    WebCam,
    PhotoboothButton,
  },

  props: {
    image: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      deviceId: null,
      devices: [],
      camera: null,
      src: null,
      started: false,
      mobile: false,
      capture: false,
      flashSound: new Audio(require('./assets/flash.mp3')),
    }
  },

  computed: {
      device: function() {
        return this.devices.find(n => n.deviceId === this.deviceId);
      }
  },

  watch: {
      camera: function(id) {
          this.deviceId = id;
      },
      devices: function() {
          const [first, ...tail] = this.devices;
          console.log(tail)
          if (first) {
              this.camera = first.deviceId;
              this.deviceId = first.deviceId;
          }
      },
  },

  methods: {
    setDisplayImg(image) {
      console.log('setting')
      // canvas for combining image
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");


      // load the main image
      let mainImg = new Image();
      mainImg.src = image;
      canvas.width = 1024;
      canvas.height = 1024;
      // console.log('working: ', image)
      mainImg.onload = () => {
        ctx.drawImage(mainImg, 
            0, 0, mainImg.width, mainImg.width/( canvas.width/canvas.height) , 
            0, 0, canvas.width, canvas.height
        );

        // load the frame image
        var noBgImage = new Image()
        noBgImage.src = this.image
        noBgImage.onload = () => {
          ctx.drawImage(noBgImage, 
              0, 0, noBgImage.width, noBgImage.height, 
              0, 0, canvas.width, canvas.height
          );
          this.imageSrc = canvas.toDataURL()
          setTimeout(()=> {
            this.$emit('capture', canvas.toDataURL())
          }, 300)
        }
      }
    },
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
          const image = new window.Image();
          image.src = e.target.result;
          image.onload = () => {
              this.setDisplayImg(e.target.result, this.frame)
          }
      }
    },
    onCapture() {
      this.capture = true
      this.flashSound.play()
      this.setDisplayImg(this.$refs.webcam.capture())
    },
    onStarted(stream) {
        console.log("On Started Event", stream);
        this.started = true
    },
    onStopped(stream) {
        console.log("On Stopped Event", stream);
    },
    onError(error) {
        console.log("On Error Event", error);
    },
    onCameras(cameras) {
        this.devices = cameras;
        console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
        this.deviceId = deviceId;
        this.camera = deviceId;
        console.log("On Camera Change Event", deviceId);
    },
    changeCamera() {
        if (this.deviceId == this.devices[0].deviceId) {
            this.deviceId = this.devices[this.devices.length - 1].deviceId
        } else {
            this.deviceId = this.devices[0].deviceId
        }
    },
  },

  mounted () {

    console.log('frame:', this.frame)
    // checks if mobile
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        /* your code here */
        this.mobile = true
    } else {
        this.mobile = false
    }
  },
};
</script>

<style lang="scss" scoped>
#container {
  height: 100%;
  width: 100%;
}
</style>