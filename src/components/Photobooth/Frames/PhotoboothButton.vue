<template>
  <div id="start-btn">
    <!-- btn -->

    <v-btn
      :width="width"
      class="mx-auto d-block elevation-5"
      color="#fe0000"
      :class="pulse ? 'pulse' : ''"
      v-bind="$attrs"
    >
      <component
        :is="$vuetify.breakpoint.mdAndUp ? 'h2' : 'h4'"
        id="caption"
        class="mx-auto white--text text-center text-uppercase font-weight-regular"
        @click="$emit('click')"
      >
        {{ text }}
      </component>
    </v-btn>
    <!-- <v-img
      src="@/assets/photowalk/button.png"
      :width="width"
      id="btn"
      :class="[ 'mx-auto', 'mb-5', {'pulse' : pulse} ]"
    >
      <v-container class="fill-height justify-center">
        <slot></slot>
      </v-container>
    </v-img> -->
    <!-- btn caption -->
  </div>
</template>

<script>
// import BaseBtn from '../BaseBtn.vue'
export default {
  // components: { BaseBtn },
  name: "PhotoWalkButton",
  
  props: {
    pulse: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "20%"
    }
  }
}
</script>

<style lang="scss" scoped>
#start-btn {
  width:100%;

  #btn {
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 0 10px rgba(128, 128, 128, 0.5);
    transition: filter 0.3s ease-in-out;
    &:hover {
      filter: brightness(1.4);
    }
    &:active {
      transition: filter 0s !important;
      filter: brightness(0.5);
    }

    #caption {
      text-shadow: 0px 0px 10px black;
    }
  }

  .pulse {
    box-shadow: 0 0 0px 0px #ffb75a;
  }
}
</style>