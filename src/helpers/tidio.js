// //code.tidio.co/vrncdyzi2j390sjqvyfexbd5sk2wmhxn.js

//code.tidio.co/3bpce2gh7vekgqllx9zwtwacjjjgjjxk.js
var tideoSrc = '//code.tidio.co/3bpce2gh7vekgqllx9zwtwacjjjgjjxk.js'

export default {
  mount() {
    let tidio = document.createElement('script')
    tidio.setAttribute('src', tideoSrc)
    tidio.setAttribute('async', true)
    tidio.setAttribute('id', 'tideo-script')
    console.log('mounting')
    document.head.appendChild(tidio)
  },
  unmount() {
    let tidioScript = document.getElementById('tideo-script')
    if (tidioScript) {
      document.head.removeChild(tidioScript)
    }
    var tidio = document.getElementById('tidio-chat-code')
    var tidioChat = document.getElementById('tidio-chat')
    console.log
    if (tidio) {
      tidio.remove()
      tidioChat.remove()
    }
  },
  hide() {
    console.log('hide')
    var tidioChat = document.getElementById('tidio-chat')
    if (tidioChat) {
      tidioChat.style.transition = "opacity 0.3s";
      tidioChat.style.opacity = 0
      setTimeout(()=> {
        tidioChat.style.display = 'none'
      },300)
    }
  },
  show() {
    var tidioChat = document.getElementById('tidio-chat')
    if (tidioChat) {
      tidioChat.style.display = 'block'
      tidioChat.style.opacity = 1
    }
  }
}