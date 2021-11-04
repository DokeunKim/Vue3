<template>
  <div class="input-room">
    <div>
      <input v-model="room.name" placeholder="Input room name">
    </div>
    <div>
      <input v-model="room.id" placeholder="Input your ID">
    </div>
    <button @click="connection">접속</button>
  </div>
</template>

<script>
import {getCurrentInstance, reactive} from 'vue'

export default {
  name: 'InputRoom',
  props: {
  },
  setup(){
    const {proxy} = getCurrentInstance();
 

    const room = reactive({
      name: '',
      id: ''
    });
    const connection = () => {
      proxy.socket.emit('create or join', room.name);
      proxy.eventBus.emit('connection', room);
    }
    return{
      room,
      connection
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-room{
  padding-top:200px;
  margin: 0 auto;
}
button{
  margin:0 auto;
  padding: 3px 70px;
}
</style>
