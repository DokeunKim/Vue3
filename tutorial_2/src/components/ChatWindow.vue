<template>
  <div class="chat-window">
    <textarea v-model="text" readonly>
    </textarea>
    <div class="input-container">
      <input><button>전송</button>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance, ref} from 'vue'

export default {
  name: 'ChatWindow',
  props: {
  },
  setup(){
    const {proxy} = getCurrentInstance();
    const text = ref('');
    proxy.eventBus.on('connection',(room)=>{
      //alert(room);
      text.value = "[알림] '" + room.name + "'에 '" +room.id+ "'(으)로 입장하셨습니다.";
      
    });

    return{
      text
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-window{

}
textarea{
  position:relation;
  width:500px;
  height:600px;
  margin-top:20px;

}
.input-container{
  width:500px;
}
input{
  width:440px;
  margin-right:5px;
}


</style>
