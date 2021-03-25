/* eslint-disable vue/experimental-script-setup-vars */
<template>
  <v-container fill-height fluid black class="container">
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
        class="ma-auto parent"
        :style="{
          height: '70%',
          width: '70%',
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
        <p class="join-now-text">JOIN YOUR TEAM NOW!</p>
        <!-- change src to :src="teamImg.name"-->
        <v-img class="team-logo" contain :src="imgUrl"> </v-img>
        <p class="link-vlounge">LINK TO YOUR VLOUNGE:</p>
        <!-- <div class="google_meet">
          <p>HTTPS://MEET.GOOGLE.COM/XAG-HKWX-QGF</p>
        </div> -->
        <v-btn
          ><span
            ><a
              href="HTTPS://US02WEB.ZOOM.US/j/85214515135"
              target="_blank"
              class="link"
              >HTTPS://US02WEB.ZOOM.US/j/85214515135</a
            ></span
          ></v-btn
        >
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    bgDark: require("@/assets/bg1.jpg"),
    bg: require("@/assets/border.png"),
    team: localStorage.getItem("team-name"),
    imgUrl: "",
    teamImg: [
      {
        name: "team_dragons",
        url: require("@/assets/dragons-logo.png"),
      },
      {
        name: "team_grizzlies",
        url: require("@/assets/grizzlies-logo.png"),
      },
      {
        name: "team_panthers",
        url: require("@/assets/panthers-logo.png"),
      },
      {
        name: "team_ravens",
        url: require("@/assets/ravens-logo.png"),
      },
      {
        name: "team_vipers",
        url: require("@/assets/vipers-logo.png"),
      },
      {
        name: "team_wolves",
        url: require("@/assets/wolves-logo.png"),
      },
    ],
  }),
  methods: {
    setImageUrl: function () {
      this.teamImg.forEach((teamObject) => {
        if (this.team === teamObject.name) {
          this.imgUrl = teamObject.url;
        }
      });
    },
  },
  mounted() {
    this.setImageUrl();
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: white;
}

.team-border {
  background-image: url("~@/assets/border.png") !important;
  background-size: contain;
  max-height: 80%;
  width: 80%;
  z-index: 1;
  margin-left: 9%;
  text-align: center;
  padding-top: 3%;
}

.theme--light.v-sheet {
  background-color: #ffffff00;
  border-color: #ffffff00;
  color: rgba(0, 0, 0, 0.87);
  align-content: center;
}

.container {
  align-content: center;
  align-items: center;
  overflow: hidden;
}

.join-now-text {
  font-family: "Azonix";
  font-size: 250%;
  color: white;
  text-align: center;
  margin-top: 4%;

  @media only screen and (min-width: 1024px) {
    font-size: 160%;
    margin-top: 16%;
    margin-bottom: 0%;
  }

  @media only screen and (min-width: 1920px) {
    font-family: "Azonix";
    font-size: 250%;
    color: white;
    text-align: center;
    margin-top: 4%;
  }

  @media only screen and (max-width: 823px) {
    font-size: 120%;
    margin-top: 6%;
  }
}

.team-logo {
  width: 30%;
  height: 50%;
  margin-left: 35%;
  margin-top: 1%;
  align-self: center;

  @media only screen and (min-width: 812px) {
    width: 25%;
    height: 34%;
    margin-top: 2%;
    margin-left: 38%;
    align-self: center;
  }

  @media only screen and (min-width: 1024px) {
    width: 25%;
    height: 30%;
    margin-top: 2%;
    margin-left: 38%;
    align-self: center;
  }

  @media only screen and (min-width: 1920px) {
    width: 30%;
    height: 50%;
    margin-left: 35%;
    margin-top: 1%;
    align-self: center;
  }

  @media only screen and (max-width: 823px) {
    width: 20%;
    height: 30%;
    margin-top: 2%;
    margin-left: 40%;
    align-self: center;
  }
}

.link-vlounge {
  font-family: "Azonix";
  font-size: 150%;
  color: rgb(255, 153, 0);
  text-shadow: 0 0 10px #ff7300;
  margin-top: 1%;
  text-align: center;

  @media only screen and (min-width: 568px) {
    margin-bottom: 0;
    // margin-bottom: 12%;
  }

  @media only screen and (max-width: 823px) {
    font-family: "Azonix";
    font-size: 150%;
    color: rgb(255, 153, 0);
    text-shadow: 0 0 10px #ff7300;
    margin-top: 1%;
    text-align: center;
  }
  @media only screen and (max-width: 823px) {
    font-size: 100%;
    margin-top: 2%;
    text-align: center;
  }
}

// .google_meet {
//   font-family: 'OratorStd';
//   letter-spacing: 5px;
//   color: white;
//   font-size: 0.6rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   p {
//     background-color: #f5f5f500;
//     box-shadow: 0 0 20px #00ccff;
//     border-radius: 0px;
//     border: 1px solid #00ccff;
//     padding: 0.5rem;

//     @media only screen and (max-width: 568px) {
//       padding: 0.3rem;
//       font-size: 0.4rem;
//       margin-top: 8px;
//       margin-left: 10px;
//     }
//   }
// }

.v-btn:not(.v-btn--round).v-size--default {
  margin-top: 1%;
  min-width: 60%;
  padding: 0 16px;
  font-family: "OratorStd";
  font-size: 100%;
  letter-spacing: 5px;
  color: white;
  margin-left: 20%;
  // text-align: center;

  @media only screen and (min-width: 568px) {
    margin-left: 9%;
    min-width: 30%;
    font-size: 35%;
    // margin-bottom: 12%;
    //  text-align: center;
  }

  @media only screen and (min-width: 640px) {
    margin-top: 3%;
    margin-left: 12%;
    min-width: 30%;
    font-size: 40%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 653px) {
    margin-top: 0%;
    margin-left: 12%;
    min-width: 30%;
    font-size: 40%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 731px) {
    margin-top: 4%;
    margin-left: 12%;
    min-width: 30%;
    font-size: 55%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 812px) {
    margin-top: 4%;
    margin-left: 16%;
    min-width: 30%;
    font-size: 55%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 823px) {
    margin-top: 4%;
    margin-left: 16%;
    min-width: 30%;
    font-size: 55%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 1024px) {
    margin-top: 1%;
    margin-left: 22%;
    min-width: 30%;
    font-size: 55%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 1280px) {
    margin-top: 1%;
    margin-left: 25%;
    min-width: 30%;
    font-size: 55%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 1366px) {
    margin-top: 3%;
    // margin-left: 22%;
    text-align: center;
    min-width: 35%;
    font-size: 90%;
    // margin-bottom: 12%;
  }

  @media only screen and (min-width: 1920px) {
    margin-top: 1%;
    min-width: 60%;
    padding: 0 16px;
    font-family: "OratorStd";
    font-size: 100%;
    letter-spacing: 5px;
    color: white;
    margin-left: 20%;
    // text-align: center;
  }

  //PC
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #f5f5f500;
  box-shadow: 0 0 20px #00ccff;
  border-radius: 0px;
  border: 1px solid #00ccff;
  height: 8%;
}
</style>
