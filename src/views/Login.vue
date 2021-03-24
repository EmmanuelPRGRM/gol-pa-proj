<template>
  <v-container fluid id="login-main-container" v-bind:class="bg">
    <incorrect-modal v-if="error"></incorrect-modal>

    <!-- <login-transition></login-transition> -->

    <v-form>
      <v-container id="login-form-container">
        <input id="login-input-email" type="email" placeholder="E-MAIL ADDRESS" onfocus="this.placeholder = ''" v-model="email" v-on:keyup.enter="authenticate">
        <v-checkbox v-model="checkbox" color="white">
          <template v-slot:label>
            <div class="login-p-wrapper login-caption">
              I ACCEPT THE
              <a class="login-url text-decoration-underline">TERMS AND CONDITIONS</a>
              OF COLGATE-PALMOLIVE PHILIPPINES.
            </div>
          </template>
        </v-checkbox>
        <v-img
          contain
          src="../assets/login/submit-btn.png"
          class="mx-auto login-btn"
          id="login-btn"
          v-on:click="authenticate"
        ></v-img>

      </v-container>
    </v-form>
    <terms-and-conditions-modal v-if="showTerms"></terms-and-conditions-modal>
  </v-container>
</template>

<script>
//
// @ is an alias to /src
// import LoginTransition from '../components/LoginTransition.vue'
import IncorrectModal from '../components/IncorrectModal'
import TermsAndConditionsModal from '../components/TermsAndConditionsModal.vue'
import axios from 'axios'
import tidio from '@/helpers/tidio.js'

export default {
  data: function () {
    return {
      email: '',
      checkbox: false,
      showTerms: false,
      initialLoad: true,
      error: false,
      bg: 'inactive-bg'
    }
  },
  methods: {
    authenticate: function () {
      if (this.checkbox) {
        axios.post('https://event.fourello.com/api/v2/colpal/login', {
          username: this.email
        }, {
          headers: {
            Accept: 'application/json'
          }
        }).then(response => {
          console.log(response)
          // add active-bg class to bg
          this.bg += ' active-bg'
          // console.log(this.bg)

          // Assign data to Global State
          this.$store.firstName = response.data.data.user.first_name
          this.$store.teamName = response.data.data.user.category
          // console.log(this.$store.firstName)
          localStorage.setItem('team-name', this.$store.teamName)

          // After 3 seconds redirect to Lobby
          setTimeout(() => this.$router.push({ name: 'Lobby' }), 4000)
        }).catch(err => {
          console.log(err)
          this.error = true
        })
      } else if (this.checkbox === false) {
        this.showTerms = true
      }
    },
    reload () {
      this.initialLoad = false
    }
  },
  components: {
    IncorrectModal,
    TermsAndConditionsModal
  },
  mounted () {
    // this.reload()
    tidio.mount()
  },
  beforeDestroy () {
    tidio.unmount()
  }
}
</script>

<style scoped>

  .theme--light.v-sheet {
    background-color: #ffffff00;
    color: rgba(0, 0, 0, 0.87);
  }

  input:focus{
    outline: none;
  }

  #login-main-container {
    height: 100vh;
    width: 100vw;
    overflow: hidden !important;
    /* background-image: url(~@/assets/login/login-bg-inactive.jpg);
    background-size: 100% 100%; */

    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }

  .inactive-bg {
   background-image: url(~@/assets/login/login-bg-inactive.jpg);
   background-size: 100% 100%;
  }

  .active-bg {
   background-image: url(~@/assets/login/login-bg-active.jpg);
   background-size: 100% 100%;
  }

  #login-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    margin-bottom: 6%;
  }

  #login-input-email{
    margin-bottom: 10px;
    border: 1px solid #99cccc;
    background: #006064;
    border-radius: 12px;
    width: 60%;
    height: 50px;
    text-align: center;
    color: white !important;
  }

  .login-caption a {
    color: #ffc107;
  }

  .login-p-wrapper {
    color: white;
    font-size: 12px;
  }

  #login-input-email::placeholder {
    color: white !important;
  }

  #login-btn, #login-btn:hover {
    cursor: pointer;
    height: 40px;
  }

  /* Moto G4, Galaxy S5, iphone 5/SE */
  @media screen and (max-width: 640px) {
    #login-form-container{
      margin-bottom: 0%;
    }

    #login-input-email{
      margin-bottom: 0px;
      width: 35%;
      height: 40px;
    }

    #login-btn, #login-btn:hover{
      height: 25px;
    }

    #login-form-container .v-input--selection-controls{
      margin: 0px;
    }

    .login-p-wrapper {
      font-size: 10px;
    }

    #login-form-container{
      margin-bottom: 0;
      padding: 0;
    }

    .v-input__slot {
      align-items: center;
      color: inherit;
      display: flex;
      margin-bottom: 0px;
      min-height: inherit;
      position: relative;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      width: 100%;
    }
  }

  /* iphone 6/7/8 */
  @media screen and (max-width: 667px) {
    #login-form-container{
      margin-bottom: 0%;
    }

    #login-input-email{
      margin-bottom: 0px;
      width: 35%;
      height: 40px;
    }

    #login-btn, #login-btn:hover{
      height: 25px;
    }

    #login-form-container .v-input--selection-controls{
      margin: 0px;
    }

    .login-p-wrapper {
      font-size: 10px;
    }

    #login-form-container{
      margin-bottom: 0;
      padding: 0;
    }

  }

   /* iphone 6/7/8 Plus, Pixel 2 */
  @media screen and (max-width: 736px) {
    #login-form-container{
      margin-bottom: 0%;
    }

    #login-input-email{
      margin-bottom: 0px;
      width: 35%;
      height: 40px;
    }

    #login-btn, #login-btn:hover{
      height: 25px;
    }

    #login-form-container .v-input--selection-controls{
      margin: 0px;
    }

    .login-p-wrapper {
      font-size: 10px;
    }

    #login-form-container{
      margin-bottom: 0;
      padding: 0;
    }

  }

  /* iphone X */
  @media screen and (max-width: 812px) {
    #login-form-container{
      margin-bottom: 0%;
    }

    #login-input-email{
      margin-bottom: 0px;
      width: 35%;
      height: 40px;
    }

    #login-btn, #login-btn:hover{
      height: 25px;
    }

    #login-form-container .v-input--selection-controls{
      margin: 0px;
    }

    .login-p-wrapper {
      font-size: 10px;
    }

    #login-form-container{
      margin-bottom: 0;
      padding: 0;
    }

  }
</style>
