<template>
  <div class="container d-flex justify-center chatMainContainer" :class="[currentQuestionId ? 'halfView' : '' ]">
    <div id="chat-container" class="d-flex" v-if="showMessages">
      <!-- chat item -->
      <div v-for="(chat, index) of chats" 
        :key="index" 
        class="text-left d-flex align-center chatLine">
        <!-- time -->
        <div class="mx-1"><img src="~@/assets/avatar.png"></div>
        <!-- name -->
        <div class="mx-2">
          <span class="text-decoration-underline" :class="{'owner': chat.project_user_identifier == userId}">
            {{chat.project_user.data.name}}
          </span>
        </div>
        <br />
        <!-- chat text -->
        <div class="my-1">{{chat.message}}</div>
        <br />
      </div>
    </div>
    <div id="chat-field" class="d-flex align-center messageInputContainer">
      <!-- input text -->
      <v-text-field
        v-model="myMessage"
        hide-details=""
        id="text-field"
        class="pa-0 px-3 white rounded-xl messageInput"
        @keypress.enter="onSend()"
        placeholder="START TYPING..."
      ></v-text-field>
      <!-- enter chat btn -->
      <v-btn
        icon
        class="ml-1 dmButton"
        
        @click="onSend()"
      >
        <img src="~@/assets/DMicon.png">
      </v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'ChatBox',
  props: {
    currentQuestionId: String,
  },

  data() {
    return {
      showMessages: false,
      myMessage: '',
      chats: [],
      chatQueue: [],
      lastChatSlug: '',
      interval: null,
      intervalTimeout: 500,
      timeout: null,
      sending: false,
      userId: null
    }
  },

  methods: {
    displayChat() {
      this.showMessages = true
      if (this.chatQueue.length > 0) {
        var chat = this.chatQueue.shift()
        console.log('queue: ', this.chatQueue.length)
        console.log('new chat: ',chat)
        console.log('existing: ', this.chats.find( data => data.slug == chat.slug ))
        if ( !this.chats.find(data => { return data.slug == chat.slug}) )
          this.chats.push(chat)
          console.log('test 2', this.chatQueue)
      }
      if (this.chatQueue.length < 2) {
        this.fetchChat()
      }
    },
    
    fetchChat(isFirst = false){
        var url = 'https://chat-api-production.fourello.com/api/colpal/chat/colpal_room1'
        if (isFirst) {
          url = url + '?fetch_latest'
          let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
          };
          this.$http.get(url, config)
          .then(res => {
            let data = res.data.data
            console.log(data)

            if (data.length != 0) {
              let lastDataSlug = data.slice(-1)[0].slug
              if(data.length > 0) {
                  this.lastChatSlug = lastDataSlug
              }
            }

            if(isFirst) {
              this.chats = data
            } else {
              for(let x of data) {
                  this.chatQueue.push(x)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
          .then(()=> {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.displayChat() 
            }, this.intervalTimeout * ( 1 + this.chatQueue.length ));
          })
        } else {
          if(this.lastChatSlug != '') {
            url = url + '?slug=' + this.lastChatSlug
            let config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            };
            this.$http.get(url, config)
            .then(res => {
                let data = res.data.data
                if (data.length != 0) {
                    let lastDataSlug = data.slice(-1)[0].slug
                    if(data.length > 0) {
                        this.lastChatSlug = lastDataSlug
                    }
                }

                if(isFirst) {
                    this.chats = data
                } else {
                    for(let x of data) {
                        this.chatQueue.push(x)
                        // console.log('queue: ',this.chatQueue)
                    }
                }
                // let content = document.querySelector('.chat-room .content .chat-item')
                // console.log('content height: ' +( content.offsetHeight + 30))
            })
            .catch(err => {
                console.log(err)
            })
            .then(()=> {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                //    console.log(this.chatQueue.length)
                    this.displayChat() 
                }, this.intervalTimeout * ( 1 + this.chatQueue.length ));
            })
          } else {
            this.fetchChat(true)
          }
        }

    },

    onSend() {
      var url = 'https://chat-api-production.fourello.com/api/colpal/chat/colpal_room1'
      let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}`, Accept: 'application/json' }
      };

      let payload = {
        message: this.myMessage
      }
      this.sending = true
      this.$http.post(url, payload, config)
      .then(res => {
        this.sending = true
        var data = res.data.data
        data.project_user = {
            data: this.$store.getters['authentication/user']
        }
        // console.log(res)
        this.chatQueue.push(res.data.data)
        this.displayChat()
        this.myMessage = ''
        // this.fetchChat(true)
        if (!localStorage.getItem('first-chat-room1')) {
          localStorage.setItem('first-chat-room1', true)
          this.$store.dispatch('awit/dot', { main_key: 'networking', sub_key: 'room1', data_action: 'first chat' })
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 422)
          alert(err.response.data.message)
        else
          alert('There was a problem with the message you sent. Try again later')
      })
      .then( () => {
        this.sending = false
      } )
    },

    parseTime(date) {
      return moment(date).format('HH:mm:ss')
    },
  },

  mounted() {
    this.fetchChat()
    var user = localStorage.getItem('user')
    this.userId = JSON.parse(user).id;
    // test data only
    // this.chats = [
    //   {
    //     time: '00:00:00',
    //     name: 'Testing',
    //     chat: 'Test test'
    //   },
    //   {
    //     time: '00:00:00',
    //     name: 'Testing',
    //     chat: 'Test test'
    //   },
    //   {
    //     time: '00:00:00',
    //     name: 'Testing',
    //     chat: 'Test test'
    //   },
    //   {
    //     time: '00:00:00',
    //     name: 'Testing',
    //     chat: 'Test test'
    //   },
    // ]
  }
};
</script>
<style lang="scss" scoped>
.container {
  #chat-container {
    overflow-y: scroll;
    height: 90%;
    width: 106%;
    color: #ebf4f7;

    .owner {
      color: #000000;
      background: #ffbb57;
      border: 1px solid #7c3e10;
      padding: 0 5px;
      border-radius: 6px;
      text-decoration: none !important;
    }
  }

  div.mx-1 {
    float: left;
  }
  div.mx-1,
  div.mx-2,
  div.my-1 {
    display: inline;
  }

  div.mx-2 {
    font-weight: bold;
  }

  .chatLine {
    display: block;
    min-height: 45px;
    margin-bottom: 10px;
  }

  height: 100%;
  padding: 0 12px 12px;
}

.container.halfView {
  height: 50%;
}

</style>

<style lang="scss">
.messageInputContainer {
  width: 107%;
  height: 10%;
  margin: 0px -16px;
  border: solid #75dfe3 4px;
  padding: 25px 10px 0px;
  color: #a4b1c3;
  border-bottom: none;

  >>> *::befpre {
    border-style: none !important;
  }

  .messageInput {
    top: 86%;
    width: 80%;
    height: 8%;
    display: inline;


    >.v-input__control {
      width: 80%;
      display: inline;

      > .v-input__slot::before {
        border-style: none !important;
      }

      > .v-input__slot::after {
        border-style: none !important;
      }

      >.v-input__slot {
        width: 80%;
        display: inline;
        > .v-text-field__slot {
          width: 80%;
          display: inline;
          input {
            color: #ebf4f7;
            width: 90%;
          }
          input::placeholder {
            color: #a4b1c3;
          }
        }
      }
    }
  }

  .dmButton {
    float: right;
    margin-top: -10px;

    img {
      width: 40px;
    }
  }
}
</style>