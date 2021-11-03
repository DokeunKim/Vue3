<template>
  <div class="components-container">
    <InputRoom class="components"></InputRoom>
    <ChatWindow class="components"></ChatWindow>
  </div>
</template>

<script>
import InputRoom from './components/InputRoom.vue'
import ChatWindow from './components/ChatWindow.vue'

export default {
  name: 'App',
  components: {
    InputRoom,
    ChatWindow
  }
}
</script>

<style>
body{
  height:100%;
  width:100%;
  margin:0;
  padding:0;
  position:absolute;
}
.components-container{
  display:flex;
}
.components{
  margin: 0 auto;
}
</style>
