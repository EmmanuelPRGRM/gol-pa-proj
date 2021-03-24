<template>
  <div v-if="questionId" class="choicesContainer">
    <div style="overflow-y: auto; height: 90%;">
      <h4 style="margin-right: 6px;">{{activeQuestionTitle}}</h4>
      <ul id="qaChoices" style="padding-left: 0px; margin-right: 6px;">
        <li v-for="choice in choices" :key="choice.id">
          <label>
            <input type="radio" name="choices" v-model="choiceValue" :value="choice.id">
            <span>{{choice.title}}</span>
          </label>
        </li>
      </ul>
    </div>
    <div class="qaSubmitBtn">
      <button :disabled="!choiceValue" v-on:click="submitAnswer">Submit</button>
    </div>
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
      choiceValue: null,
      activeQuestionTitle: "",
      groupId: null,
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

      this.groupId = question.question_group_id;
      this.activeQuestionTitle = QUESTION_TITLE[this.groupId];
      this.choices = question.choices;
    },
    submitAnswer: function() {
      console.log("submit choice1", this.choiceValue);
      console.log("submit groupId", this.groupId);
      console.log("submit questionId", this.questionId);

      if (!this.choiceValue || !this.groupId || !this.questionId) {
        console.log("please select a choice");
        return;
      }

      this.axios.post('/colpal/question', {
        "question_group_id": this.groupId,
        "answers": [
          {
            "choice_id": this.choiceValue,
            "qustion_id": this.questionId,
          }
        ],
      })
      .then(res => {
        // localStorage.setItem('questions', JSON.stringify(res.data));
        // this.questions = res.data;
        console.log('questions', res.data); 
      });
    }
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
    text-align: center;
    color: white;
    border: solid #75dfe3 4px;
    min-height: 50%;
    max-height: 77%;
    height: 77%;
    width: 106%;
    border-right: none;
    position: relative;
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

  .qaSubmitBtn {
    width: 100%;
    padding: 4px 20px 0px 0px;
    float: right;
    button {
      width: 60%;
      background: #f5ebeb;
      color: black;
      border-radius: 10px;
    }
    button:disabled {
      background: #736e6e;
    }
  }
</style>
