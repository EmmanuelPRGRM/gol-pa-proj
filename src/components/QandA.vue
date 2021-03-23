<template>
  <div v-if="questionId" class="choicesContainer">
    <h4>Pick your Choice</h4>
    <ul id="qaChoices">
      <li v-for="choice in choices" :key="choice.id">
        <label>
          <input type="radio" name="choices" value="choice.id">
          <span>{{choice.choice}}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "QandA",  

  props: {
    choices: Array,
    questionId: String,
  },

  methods: {
    getPublishedQuestion: () => {
      return {
        questionId: "sampleCustomId"
      }
    },

    // onCustomfocus: (event) => {
    //   this.$emit('customfocus', {
    //     questionId: "sampleCustomId"
    //   });
    // }
  },

  mounted() {
    let question = this.getPublishedQuestion();
    console.log(question);
  }
});

</script>

<style lang="scss">
  .choicesContainer {
    font-size: 30px;
    margin: -4px;
    padding: 20px;
    text-align: center;
    color: white;
    border: solid #75dfe3 4px;
    overflow-y: auto;
  }
  .choicesContainer input {
    display: none;
  }

  .choicesContainer {
    li {
      list-style: none;
    }
  }
  .choicesContainer label {
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
    width: 75%;
    margin: 0px 0px 10px;
  }

  .choicesContainer span {
    min-height: 65px;
    display: block;
    background: rgb(202 149 46 / 55%);
    padding: 5px 10px 5px 25px;
    position: relative;
    border-radius: 10px;
    border: solid #b39658;
    line-height: 50px;
  }
  .choicesContainer span:before {
    display: none;
  }
  .choicesContainer input:checked + span {
    background-color: #ca952e;
    min-height: 65px;
    border: solid #dea647;
  }
</style>
