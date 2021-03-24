<template>
  <div v-if="questionId" class="choicesContainer">
    <h4>{{activeQuestionTitle}}</h4>
    <ul id="qaChoices">
      <li v-for="choice in choices" :key="choice.id">
        <label>
          <input type="radio" name="choices" value="choice.id">
          <span>{{choice.title}}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "axios";

const QUESTION_TITLE = {
  5: "Trivia Mania 1",
  6: "Trivia Mania 2",
  7: "Trivia Mania 3",
  8: "Trivia Mania 4",
  9: "Trivia Mania 5",
  10: "Trivia Mania 6",
  11: "Trivia Mania 7",
  12: "Trivia Mania 8",
  13: "Trivia Mania 9",
}
export default {
  name: "QandA",
  data: () => {
    return {
      questions: [],
      choices: [],
      activeQuestionTitle: "",
      axios: axios.create({
        baseURL: 'https://event.fourello.com/api',
        headers: {
          'Accept': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('auth_token')
        }
      }),
    }
  },

  props: {
    questionId: Number,
  },

  methods: {
    getQuestion: function(id=null) {
      let question = this.questions.filter(question => {
        return question.id === id;
      })[0];

      this.activeQuestionTitle = QUESTION_TITLE[question.question_group_id];
      this.choices = question.choices;
    },
  },

  updated() {
    if (this.questionId) {
      this.getQuestion(this.questionId);
    }
  },

  mounted() {
    this.questions = JSON.parse(localStorage.getItem('questions'));
    if (!this.questions.length) {
      this.axios.get('/colpal/question?with_choices')
      .then(res => {
        localStorage.setItem('questions', JSON.stringify(res.data));
        this.questions = res.data;
        console.log('questions', res.data); 
      });
    }
    if (this.questionId) {
      this.getQuestion(this.questionId);
    }
  }
};

</script>

<style lang='scss'>
  .choicesContainer {
    font-size: 30px;
    margin: -4px;
    padding: 20px;
    text-align: center;
    color: white;
    border: solid #75dfe3 4px;
    overflow-y: auto;
    min-height: 50%;
    max-height: 50%;
    height: 50%;
    width: 106%;
    border-right: none;
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
