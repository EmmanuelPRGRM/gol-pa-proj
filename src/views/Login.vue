<template>
  <v-container
    fluid
    id="main-container"
    class="pa-0 ma-0"
  >
    <lobby-transition v-if="transition"></lobby-transition>
    <div class="fill-height">
      <v-row
        class="fill-height"
        align="center"
      >
        <v-col cols="4" offset="1">
          <v-img
            contain
            src="@/assets/login/logo.png"
            width="100%"
            class="mx-auto"
          ></v-img>
        </v-col>
        <v-col cols="7" offset-md="1" md="5">
          <component
            :is="$vuetify.breakpoint.mdAndUp ? 'h3' : 'h5'"
            class="font-weight-medium"
            id="label"
          >
            {{ !validCode ? 'ENTER YOUR ADVISOR CODE / EMPLOYEE ID' : admin ? 'ENTER YOUR PASSWORD' : 'ENTER YOUR NAME'}}
          </component>
          <div v-if="!validCode">
            <v-row justify="center">
              <v-col cols="9">
                <v-text-field
                  v-model="username"
                  filled
                  hide-details
                  class="d-block"
                ></v-text-field>
                <v-slide-x-transition>
                  <h4 v-show="!!error" class="error-message mt-3 text-center">{{ error }}</h4>
                </v-slide-x-transition>
              </v-col>  
              <v-col cols="1">
                <v-btn
                  v-if="!loading"
                  icon
                  color="transparent"
                  width="100%"
                >
                  <v-img
                    contain
                    width="40px"
                    src="@/assets/login/login-btn.png"
                    id="login-btn"
                    class="mt-5"
                    @click="validateCode"
                  ></v-img>
                </v-btn>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-col>
            </v-row>
          </div>
          <div v-else-if="admin">
            <v-text-field
              v-model="password"
              filled
              hide-details
              type="Password"
              class="mx-14 white d-block"
              :error="error"
            ></v-text-field>

            <v-slide-x-transition>
              <h4 v-show="!!error" class="error-message mt-3 text-center">{{ error }}</h4>
            </v-slide-x-transition>

            <div
              id="enter-btn"
              class="d-block mx-auto mt-5 rounded-lg"
            >
              <v-btn
                width="100%"
                color="#ffc75b"
                class="px-10 rounded-lg"
                :loading="loading"
                @click="validateCode"
              >
                ENTER
              </v-btn>
            </div>
          </div>
          <div v-else>
            <v-text-field
              v-model="name"
              filled
              hide-details
              class="mx-14 white d-block"
            ></v-text-field>

            <v-slide-x-transition>
              <h4 v-show="!!error" class="error-message mt-3 text-center">{{ error }}</h4>
            </v-slide-x-transition>

            <div
              id="enter-btn"
              class="d-block mx-auto mt-5 rounded-lg"
            >
              <v-btn
                width="100%"
                color="#ffc75b"
                class="px-10 rounded-lg"
                @click="registerName"
              >
                ENTER
              </v-btn>
            </div>     
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// import LoginBottomBar from '../components/Login/LoginBottomBar.vue';
// import tidio from '@/helpers/tidio.js'
import moment from 'moment-timezone'

export default {  data() {
    return {
      validCode: false,
      username: null,
      name: null,
      password: null,
      admin: false,
      loading: false,
      error: null,
      userId: null,
      temp_auth: null,
      transition: false,
    }
  },

  metaInfo: {
    title: "Login"
  },


  methods: {
    // validateCode() {
    //   this.validCode = true
    // },
    validateCode() {
      // post request
      this.loading = true
      this.error = null
      this.$store.dispatch('authentication/login', {
        // credentials
        data: {    
          username: this.username.toLowerCase(),
          password: this.password
        },
        // login success
        onSuccess: response => {
          if (!response.data.data.user.name)  {
            this.validCode =  true
            this.admin = false
            this.userId = response.data.data.user.id
            this.temp_auth = response.data.data.token
            this.$store.commit('authentication/CLEAR_USER')
            this.$store.commit('authentication/CLEAR_TOKEN')
          }
          else {
            this.$router.push({ name: 'Lobby' });
            this.loading = false;
          }
        
        },
        // login fail
        onError: error => {
          var server_message = null;
          var slug = null 

          if (typeof error.response.data === 'object') {
            server_message = error.response.data.message
            slug = error.response.data.slug
          }
          else {
            server_message = error.response.data
          }

          
          if (slug == 'you_cannot_login_yet') {
            const {gates} = this.$store.getters['settings/settings']
            console.log(gates)
            const restrictionDates = gates.find(data => data.type === 'login')

            if (restrictionDates) {
              var today = moment.utc()
              var loginStart = moment.utc(restrictionDates.start_at, 'YYYY-MM-DD HH:mm:ss')
              var loginEnd = moment.utc(restrictionDates.end_at, 'YYYY-MM-DD HH:mm:ss')

              if (!today.isBetween(loginStart, loginEnd)) {
                this.error = 'You cannot enter yet. The event will start on March 15, 2021'
              }
              else
               this.error = server_message
            }
          }
          else if (slug == 'user_not_found') {
            this.error = "Code doesn't exist"
          }
          else if (slug == 'please_login_with_a_password') {
            if (this.admin) {
              this.error = "Incorrect password"
            }
            else {
              this.admin = true
              this.validCode = true
            }
          }
          else {
            this.error = server_message
          }
        },
        // login done
        onDone: () => this.loading = false
      })
    },

    registerName() {
      var headers = {
        Authorization: 'Bearer ' + this.temp_auth
      }

      var data = {
        name:this.name,
        _method: 'PUT'
      }
      this.$http.post('self/' + this.userId, data, { headers })
      .then( response => {
        this.$store.commit('authentication/SET_USER', response.data.data)
        this.$store.commit('authentication/SET_TOKEN', this.temp_auth)
        if (localStorage.getItem('lobby_transitioned'))
          this.$router.push({ name: 'Lobby' })
        else
          this.transition = true
      })
    }
  },

  // mounted () {
  //   tidio.mount()
  // },
  // beforeDestroy () {
  //   tidio.unmount()
  // },
};
</script>

<style lang="scss" scoped>

::v-deep input {
  text-align: center;
  text-transform: uppercase;
  color:black!important;
  text-shadow: 0 0 1px black
}

::v-deep .v-input__slot {
  background: white !important;
}

#main-container {
  background-image: url(~@/assets/login/background.jpg) !important;
  // background: radial-gradient(#534624, #0e0c06);
  background-size: 100% 100%;
  height: 100%;
  width: 100vw;
  overflow: hidden !important;
  
  #label {
    width:100%;
    text-align: center;
    margin-bottom: 5%;
    background: -webkit-linear-gradient(#470700, #ffc85d, #ffc85d, #f8eed6, #ffc85d, #ffc85d, #470700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #login-btn {
    cursor: pointer;

    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: brightness(1.2);
    }

    &:active {
      filter: brightness(0.7);
    }
  }

  #enter-btn {
    padding: 3px;
    background: -webkit-linear-gradient(#db9f2c, #470700,#ffc85d, #ffffff, #ffc85d, #470700,#db9f2c);
    width: 40%;
  }

  .error-message {
    color: white;
    // text-shadow: 0 0 10px  #db2c2c;
  }
}
</style>