<template>
  <v-container>
    <!-- label -->
    <h5 id="label">
      Enter your advisor code/employee number
    </h5>
    
    <!-- login field -->
    <v-row align="center" v-if="!validCode">
      <!-- text field -->
      <v-col cols="9">
        <v-text-field
          v-model="username"
          class="white px-3 rounded-l"
          hide-details=""
          width="100%"
        ></v-text-field>
      </v-col>
      <!-- login button -->
      <v-col cols="3" class="">
        <!-- action button: inactive -->
        <v-img
          v-if="!loading"
          id="login-btn"
          contain
          width="40px"
          src="@/assets/login/login-btn.png"
          @click="validateCode"
        ></v-img>
        <!-- action button: loading -->
        <div v-else class="d-flex">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-slide-x-transition>
          <h4 v-show="error" id="error-message" class="ma-0">{{ error }}</h4>
        </v-slide-x-transition>
      </v-col>
    </v-row>
    
    <div v-else-if="admin">
      <v-text-field
        v-model="password"
        filled
        hide-details
        type="Password"
        class="white d-block"
        :error="error"
      ></v-text-field>

      <v-slide-x-transition>
        <h4 v-show="!!error" id="error-message">{{ error }}</h4>
      </v-slide-x-transition>

      <div
        id="enter-btn"
        class="d-block mx-auto mt-5 rounded-lg"
      >
        <v-btn
          width="99%"
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
        <h4 v-show="error" id="error-message">{{ error }}</h4>
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
  </v-container>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'LoginField',

  data() {
    return {
      loading: false,
      username: null,
      name: null,
      error: null,
      admin: false,
      password: null,
      temp_auth: null,
      transition: false,
      validCode: false,
    }
  },

  methods: {
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
            if (localStorage.getItem('lobby_transitioned'))
              this.$router.push({ name: 'Lobby' })
            else
              this.transition = true
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
  
}
</script>

<style lang="scss" scoped>

// text field label
#label {
  text-align: left;
  text-transform: uppercase;
  background: -webkit-linear-gradient(#470700, #ffc85d, #ffc85d, #f8eed6, #ffc85d, #ffc85d, #470700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


// text field customization 
::v-deep input {
  text-align: center;
  text-transform: uppercase;
  color:black!important;
  text-shadow: 0 0 1px black;
  margin-bottom: 10px;
}
::v-deep .v-input__slot {
  background: white !important;
}

// action button
#login-btn {
  cursor: pointer ;
  transition: filter 0.2s ease-in-out;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.7);
  }
}

#error-message {
  text-align: left;
  color: white;
  margin-top: 5px;
    // text-shadow: 0 0 10px  #db2c2c;
}

#enter-btn {
  padding: 3px;
  background: -webkit-linear-gradient(#db9f2c, #470700,#ffc85d, #ffffff, #ffc85d, #470700,#db9f2c);
  width: 40%;
}
</style>