<template>
<v-container fill-height fluid black class="container">
    <v-overlay
            absolute
            z-index="0"
            opacity="1"
        >
            <v-img 
                :src="bgDark"
                :style="{opacity:1, width:'100vw', height: '100vh'}"></v-img>
        </v-overlay>
            <div :style="{
                position: 'absolute',
                width:'100%',
                height:'100%'
                }">
                <div
                    class="ma-auto parent"
                    :style="{
                        height: '70%',
                        width: '70%',
                        maxHeight:'56vw',
                        maxWidth:'178vh',
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        zIndex:2,
                        position:'absolute',
                        top:0,
                        left:0,
                        bottom:0,
                        right:0,
                    }"
                >

                <p class="join-now-text">JOIN YOUR TEAM NOW!</p>
                <!-- change src to :src="teamImg.name"-->
                <v-img 
                    class="team-logo"
                    src="@/assets/dragons-logo.png">
                </v-img>
                <p class="link-vlounge">LINK TO YOUR VLOUNGE:</p>
                <v-btn><span>HTTPS://MEET.GOOGLE.COM/XAG-HKWX-QGF</span></v-btn>   
                </div>
            </div>
</v-container>
</template>

<script>
export default {

     data: () => ({
         bgDark: require('@/assets/bg1.jpg'),
         bg:require('@/assets/border.png'),
         teamImg:
         [
            {
                name: 'team_dragons',
                url: require('@/assets/dragons-logo.png')
            },
            {
                name: 'team_grizzlies',
                url: require('@/assets/grizzlies-logo.png')
            },
            {
                name: 'team_panthers',
                url: require('@/assets/panthers-logo.png')
            },
            {
                name: 'team_ravens',
                url: require('@/assets/ravens-logo.png')
            },
            {
                name: 'team_vipers',
                url: require('@/assets/vipers-logo.png')
            },
            {
                name: 'team_wolves',
                url: require('@/assets/wolves-logo.png')
            },
         ]
     })
    
}
</script>

<style scoped>
.team-border
{
    background-image: url('~@/assets/border.png') !important;
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

.container
{
    align-content: center;
    align-items: center;
}

.team-logo
{
    width: 30%;
    height: 50%;
    margin-left: 35%;
    margin-top:1%;
    align-self: center;
}

.join-now-text
{
    font-family: "Azonix";
    font-size: 250%;
    color: white;
    text-align: center;
    margin-top: 4%;
}

.link-vlounge
{
    font-family: "Azonix";
    font-size: 150%;
    color: rgb(255, 153, 0);
    text-shadow: 0 0 10px #ff7300;
    margin-top: 1%;
    text-align: center;
}

.v-btn:not(.v-btn--round).v-size--default 
{
    margin-top:1%;
    min-width: 60%;
    padding: 0 16px;
    font-family: "OratorStd";
    font-size: 100%;
    letter-spacing: 5px;
    color: white;
    margin-left: 20%;
}

.theme--light.v-btn.v-btn--has-bg 
{
    background-color: #f5f5f500;
    box-shadow: 0 0 20px #00ccff;
    border-radius: 0px;
    border: 1px solid #00ccff;
    height: 8%;
}

</style>