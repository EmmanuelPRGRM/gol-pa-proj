<template>
  <v-container fluid id="landing-main-container">
    <modal></modal>
    <!-- <login-transition></login-transition> -->

    <v-form>
      <v-container id="landing-form-container">
        <input id="landing-input-email" type="email" placeholder="E-MAIL ADDRESS">
        <v-checkbox v-model="checkbox">
          <template v-slot:label>
            <div class="landing-p-wrapper landing-caption">
              I ACCEPT THE
              <a class="landing-url text-decoration-underline">TERMS AND CONDITIONS</a>
              OF COLGATE-PALMOLIVE PHILIPPINES.
            </div>
          </template>
        </v-checkbox>
        <v-img
          contain
          src="../assets/landing/submit-btn.png"
          class="mx-auto login-btn"
          id="landing-login-btn"
          v-on:click="authenticate"
        ></v-img>

      </v-container>
    </v-form>
  </v-container>
</template>

<script>
//
// @ is an alias to /src
// import LoginTransition from '../components/LoginTransition.vue'
import axios from 'axios'
import Modal from '../components/Modal.vue'
import tidio from '@/helpers/tidio.js'
export default {
  data: function () {
    return {
      email: '',
      event: true
    }
  },
  methods: {
    data () {
      return {
        checkbox: false
      }
    },
    authenticate: function () {
      // API Calls and authentication
      axios({
        method: 'get',
        url: 'https://event.fourello.com/api/get/self',
        responseType: 'stream'
      }).then(response => console.log(response))
    }
  },
  components: {
    // LoginTransition,
    Modal
  },
  mounted () {
    tidio.mount()
  },
  beforeDestroy () {
    tidio.unmount()
  }
}
</script>

<style scoped>

  #landing-main-container {
    background-image: url(~@/assets/landing/landing-bg.jpg);
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    overflow: hidden !important;

    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }

  #landing-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    margin-bottom: 6%;
  }

  #landing-input-email{
    margin-bottom: 10px;
    border: 1px solid #99cccc;
    background: #006064;
    border-radius: 12px;
    width: 60%;
    height: 50px;
    text-align: center;
    color: white !important;
  }

  .landing-caption a {
    color: #ffc107;
  }

  .landing-p-wrapper {
    color: white;
    font-size: 12px;
  }

  #landing-input-email::placeholder {
    color: white !important;
  }

  #landing-login-btn, #landing-login-btn:hover {
    cursor: pointer;
    height: 40px;
  }

  @media screen and (max-width: 640px) {
    #landing-form-container{
      margin-bottom: 0%;
    }

    #landing-input-email{
      margin-bottom: 0px;
      width: 35%;
      height: 40px;
    }

    #landing-login-btn{
      height: 25px;
    }

    #landing-form-container .v-input--selection-controls{
      margin: 0px;
    }

    .landing-p-wrapper {
      font-size: 10px;
    }

    #landing-form-container{
      margin-bottom: 0;
      padding: 0;
    }

  }
</style>
