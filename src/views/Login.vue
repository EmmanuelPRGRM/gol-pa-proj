<template>
  <v-container fluid id="main-container" class="pa-0 ma-0">
    <!-- <lobby-transition v-if="transition"></lobby-transition> -->
    <incorrect-modal v-if="incorrectModal" @hide="close"></incorrect-modal>
    <terms-and-conditions-modal
      v-if="showTerms"
      @hide="close"
    ></terms-and-conditions-modal>
    <v-overlay absolute z-index="0" opacity="1">
      <v-img
        :src="bgDark"
        :style="{ opacity: 1, width: '100vw', height: '100vh' }"
      ></v-img>
    </v-overlay>
    <div
      :style="{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }"
    >
      <div
        class="ma-auto parent sub-container"
        :style="{
          height: '100%',
          width: '100%',
          maxHeight: '56vw',
          maxWidth: '178vh',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          zIndex: 2,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }"
      >
        <div class="fill-height">
          <!-- <div class="sub-container"> -->
          <!-- <v-row
        class="fill-height"
        align="center"
      > -->
          <!-- <v-col cols="4" offset="4"> -->
          <!-- <v-img
            contain
            src="@/assets/col-pal-logo.png"
            width="65%"
            class="mx-auto logo"
          ></v-img> -->
          <!-- </v-col> -->
          <!-- <v-col cols="7" offset-md="1" md="5"> -->
          <component
            :is="$vuetify.breakpoint.mdAndUp ? 'h3' : 'h5'"
            class="font-weight-medium"
            id="label"
          >
            {{ !validCode ? "" : admin ? "" : "" }}
          </component>
          <div v-if="!validCode">
            <!-- <v-row justify="center"> -->
            <v-col cols="12" class="wrapper">
              <!-- <v-text-field
                  v-model="username"
                  filled
                  hide-details
                  placeholder="EMAIL ADDESS"
                  class="d-block"
                ></v-text-field> -->
              <!-- onfocus="this.placeholder = ''" -->
              <input
                id="login-input-email"
                type="email"
                placeholder="E-MAIL ADDRESS"
                v-model="username"
                v-on:keyup.enter="authenticate"
              />
              <!-- <v-checkbox v-model="checkbox" color="white">
                <template v-slot:label>
                  <div class="login-p-wrapper login-caption">
                    <div class=" ">
                      I ACCEPT THE
                      <a
                        class="login-url text-decoration-underline"
                        @click="showTermsCondition"
                        >TERMS AND CONDITIONS</a
                      >
                      OF COLGATE-PALMOLIVE PHILIPPINES.
                    </div>
                  </div>
                </template>
              </v-checkbox> -->

              <div  class="login-p-wrapper login-caption mb-15">
                <input type="checkbox" v-bind="checkbox" v-model="checkbox">
<span class="ml-2 mt-15">I ACCEPT THE
           <a v-on:click="showTermsCondition">
                   TERMS AND CONDITIONS
           </a> OF COLGATE-PALMOLIVE PHILIPPINES.
</span>
              </div>
              <v-slide-x-transition>
                <h4 v-show="!!error" class="error-message mt-3 text-center">
                  {{ error }}
                </h4>
              </v-slide-x-transition>
              <v-btn v-if="!loading" icon color="transparent" width="100%">
                <v-img
                  contain
                  width="50"
                  height="35"
                  src="@/assets/submit-btn.png"
                  id="login-btn"
                  class="mb-5"
                  @click="validateCode"
                ></v-img>
              </v-btn>
            </v-col>
            <!-- <v-col cols="1"> -->

            <!-- <v-progress-circular
              v-else
              indeterminate
              color="primary"
            ></v-progress-circular> -->
            <!-- </v-col> -->
            <!-- </v-row> -->
          </div>
          <div v-else-if="admin" class="wrapper">
            <!-- <v-text-field
              v-model="password"
              filled
              hide-details
              type="Password"
              class="mx-14 white d-block"
              :error="error"
            ></v-text-field> -->
            <input
              id="login-input-password"
              type="password"
              placeholder="PASSWORD"
              onfocus="this.placeholder = ''"
              v-model="password"
              :error="error"
            />
            <!--  v-on:keyup.enter="authenticate" -->

            <v-slide-x-transition>
              <h4 v-show="!!error" class="error-message mt-3 text-center">
                {{ error }}
              </h4>
            </v-slide-x-transition>
            <v-btn v-if="!loading" icon color="transparent" width="100%">
              <v-img
                contain
                width="50"
                height="35"
                src="@/assets/submit-btn.png"
                id="login-btn"
                class="mt-5"
                @click="validateCode"
              ></v-img>
            </v-btn>
            <!-- <div id="enter-btn" class="d-block mx-auto mt-5 rounded-lg"> -->
            <!-- <v-img
              contain
              width="50"
              height="35"
              src="@/assets/submit-btn.png"
              id="login-btn"
              class="mb-5"
              @click="validateCode"
            ></v-img> -->
            <!-- </div> -->
          </div>
          <!-- For events that requires name -->
          <!-- <div v-else>
            <v-text-field
              v-model="name"
              filled
              hide-details
              class="mx-14 white d-block"
            ></v-text-field>

            <v-slide-x-transition>
              <h4 v-show="!!error" class="error-message mt-3 text-center">
                {{ error }}
              </h4>
            </v-slide-x-transition>

            <div id="enter-btn" class="d-block mx-auto mt-5 rounded-lg">
              <v-btn
                width="100%"
                color="#ffc75b"
                class="px-10 rounded-lg"
                @click="registerName"
              >
                ENTER
              </v-btn>
            </div>
          </div> -->
          <!-- </v-col> -->
          <!-- </v-row> -->
          <!-- </div> -->
          <!-- end tag sub-container-->
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
// import LoginBottomBar from '../components/Login/LoginBottomBar.vue';
import tidio from "@/helpers/tidio.js";
import moment from "moment-timezone";
import IncorrectModal from "../components/IncorrectModal.vue";
import TermsAndConditionsModal from "../components/TermsAndConditionsModal.vue";
import Modal from "../components/Modal.vue";

export default {
  components: { IncorrectModal, TermsAndConditionsModal, Modal },
  data() {
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
      incorrectModal: false,
      showTerms: false,
      checkbox: false,
      bgDark: require("@/assets/bgdark.jpg"),
      bg: require("@/assets/login-bg-inactive.jpg"),
    };
  },

  metaInfo: {
    title: "Login",
  },

  methods: {
    showTermsCondition() {
      this.showTerms = true;
    },
    close() {
      this.showTerms = false;
      this.incorrectModal = false;
    },
    // validateCode() {
    //   this.validCode = true
    // },
    validateCode() {
      // post request
      this.loading = true;
      this.error = null;
      console.log("AEE");
      if (this.username ===null  ){
        this.loading = false
         this.incorrectModal = true;
         console.log("WWW")
      }
      if (this.checkbox) {
        this.$store.dispatch("authentication/login", {
          // credentials
          data: {
            username: this.username.toLowerCase(),
            password: this.password,
          },
          // login success
          onSuccess: (response) => {
            this.bg = "@/assets/login-bg-active.jpg";
            if (!response.data.data.user.id) {
              this.validCode = true;
              this.admin = false;
              this.userId = response.data.data.user.id;
              this.temp_auth = response.data.data.token;
              this.$store.commit("authentication/CLEAR_USER");
              this.$store.commit("authentication/CLEAR_TOKEN");
            } else {
              this.$router.push({ name: "Lobby" });
              this.loading = false;
            }
          },
          // login fail
          onError: (error) => {
            var server_message = null;
            var slug = null;
             this.loading = false
            if (typeof error.response.data === "object") {
              server_message = error.response.data.message;
              slug = error.response.data.slug;
            } else {
              server_message = error.response.data;
            }

            if (slug == "you_cannot_login_yet") {
              const { gates } = this.$store.getters["settings/settings"];
              console.log(gates);
              const restrictionDates = gates.find(
                (data) => data.type === "login"
              );

              if (restrictionDates) {
                var today = moment.utc();
                var loginStart = moment.utc(
                  restrictionDates.start_at,
                  "YYYY-MM-DD HH:mm:ss"
                );
                var loginEnd = moment.utc(
                  restrictionDates.end_at,
                  "YYYY-MM-DD HH:mm:ss"
                );

                if (!today.isBetween(loginStart, loginEnd)) {
                  this.error =
                    "You cannot enter yet. The event will start on March 15, 2021";
                } else this.error = server_message;
              }
            } else if (slug == "user_not_found") {
              this.error = "Code doesn't exist";
              this.incorrectModal = true;
            } else if (slug == "please_login_with_a_password") {
              if (this.admin) {
                this.error = "Incorrect password";
              } else {
                this.admin = true;
                this.validCode = true;
              }
            } else {
              this.error = server_message;
            }
          },
          // login done
          onDone: () => (this.loading = false),
        });
      } else {
        this.showTerms = true;
        this.loading = false;
      }
    },

    registerName() {
      var headers = {
        Authorization: "Bearer " + this.temp_auth,
      };

      var data = {
        name: this.name,
        _method: "PUT",
      };
      this.$http
        .post("self/" + this.userId, data, { headers })
        .then((response) => {
          this.$store.commit("authentication/SET_USER", response.data.data);
          this.$store.commit("authentication/SET_TOKEN", this.temp_auth);
          if (localStorage.getItem("lobby_transitioned"))
            this.$router.push({ name: "Lobby" });
          else this.transition = true;
        });
    },
  },
  mounted(){
        tidio.mount();
  }
 
};
</script>

<style lang="scss" scoped>
// [data-v-26084dc2] input {
//     text-align: center;
//     text-transform: uppercase;
//     color: white !important;
//     text-shadow: 0 0 1px white;
//     font-family: "OratorStd";
// }

// ::v-deep input {
//   text-align: center;
//   text-transform: uppercase;
//   color:rgb(255, 255, 255)!important;
//   text-shadow: 0 0 1px black;
//   font-family: 'OratorStd';
// }

// ::v-deep .v-input__slot {
//   background: rgb(0, 83, 122) !important;
//   border: 1px solid rgb(0, 153, 255);
// }

#main-container {
  background-image: url(~@/assets/login/login-bg-inactive.jpg) !important;
  // background: radial-gradient(#534624, #0e0c06);
  background-size: 100% 100%;
  height: 100%;
  width: 100vw;
  overflow: hidden !important;
  position: fixed;

  //   #label {
  //     width:100%;
  //     text-align: center;
  //     margin-bottom: 5%;
  //     background: -webkit-linear-gradient(#470700, #ffc85d, #ffc85d, #f8eed6, #ffc85d, #ffc85d, #470700);
  //     -webkit-background-clip: text;
  //     -webkit-text-fill-color: transparent;
  //   }

  //   #login-btn {
  //     cursor: pointer;
  //     margin-left: 500%;

  //     transition: filter 0.2s ease-in-out;

  //     &:hover {
  //       filter: brightness(1.2);
  //     }

  //     &:active {
  //       filter: brightness(0.7);
  //     }
  //   }

  // #enter-btn {
  //   padding: 3px;
  //   background: -webkit-linear-gradient(
  //     #db9f2c,
  //     #470700,
  //     #ffc85d,
  //     #ffffff,
  //     #ffc85d,
  //     #470700,
  //     #db9f2c
  //   );
  //   width: 40%;
  // }

  //   .error-message {
  //     color: white;
  //     // text-shadow: 0 0 10px  #db2c2c;
  //   }
  //   .logo
  //   {
  //     margin-top: 5%;
  //   }

  //   .v-input {
  //     width: 55%;
  //     margin-top: -12%;
  //     margin-left: 74%;
  // }
}

.fill-height {
  display: flex;
  flex-direction: column-reverse;
}

.sub-container {
  // border: 1px solid red;
  height: 100vh;
  //   align-items: flex-end;
  //   justify-content: flex-end;
  display: flex;
  flex-direction: column-reverse;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 1px solid red;
  padding-bottom: 4%;
}

.theme--light.v-sheet {
  background-color: #ffffff00;
  color: rgba(0, 0, 0, 0.87);
}

input:focus {
  outline: none;
}

#login-input-email {
  margin-bottom: 10px;
  border: 1px solid #99cccc;
  background: #006064;
  border-radius: 12px;
  width: 25%;
  height: 40px;
  text-align: center;
  color: white !important;
  font-family: "OratorStd";
}

#login-input-email::placeholder {
  color: white !important;
  font-family: "OratorStd";
}

#login-input-password {
  margin-bottom: 10px;
  border: 1px solid #99cccc;
  background: #006064;
  border-radius: 12px;
  width: 25%;
  height: 40px;
  text-align: center;
  color: white !important;
  font-family: "OratorStd";
}

#login-input-password::placeholder {
  color: white !important;
  font-family: "OratorStd";
}

.login-caption a {
  color: #ffc107;
}

.login-p-wrapper {
  color: white;
  font-size: 10px;
}
</style>