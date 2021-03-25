<template>
    <v-app>
        <v-main>
                <iframe
                :style="{
                position:'absolute',
                width: '100%',
                height: '100%',
                justify: 'center',
                border: 'none',
                    }"
                id="unitygame-frame"
                src="https://leaderboard.onecpthedigitalevent2021.com">
                </iframe>
        </v-main>
         <orientation-blocker></orientation-blocker>
    </v-app>
</template>

<script>
export default {

     components: {
    OrientationBlocker: () => import("@/components/OrientationBlocker.vue"),
  },
    
}
</script>

<style scoped>

iframe
{
    overflow-y: hidden;
}

</style>