<template>
  <div>
    <h1>Subject1: {{obj.title}}</h1>
    <h2>Subject2: {{obj.subTitle}}</h2>
    <span>{{obj.info}}</span>
  </div>
  <div>
    <select v-model="selected">
      <option>title</option>
      <option>subTitle</option>
      <option>info</option>
    </select>
    <input v-model="inputText"><button @click="changeText">변경</button>
  
  </div>
</template>

<script>
import {ref, reactive} from 'vue'

export default {
  name: 'App',
  components: {
    
  },
  setup(){
    const selected = ref("");
    const inputText = ref("");
    const obj = reactive({
      title: "Vue 3",
      subTitle: "Tutorial 1",
      info: "ref와 reactive 사용 예제"
    });

    const changeText = () => {
      switch(selected.value){
        case "title":
          obj.title = inputText.value;
          break;
        case "subTitle":
          obj.subTitle = inputText.value;
          break;
        case "info":
          obj.info = inputText.value;
          break;
      }
    }
    return{
      selected,
      inputText,
      changeText,
      obj
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
