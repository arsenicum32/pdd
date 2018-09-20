<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="alert" v-if="this.$store.state.connection == false" >проблемы с подключением к серверу <button @click="reload">перезагрузить страницу</button></div>
    <div class="baner" @click="go" ></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    reload(){
      window.location.reload();
    },
    go(){
      window.location.href = "https://kolm.ru/komsomolsk-na-amure/calc/7RMSNS";
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
.baner{
  width: 100%;
  max-width: 800px;
  margin: auto;
  height: 120px;
  background: #eee;
  background: url( ./assets/banner.png ) no-repeat center center;
  background-size: contain;
  cursor: pointer;
}
.alert{
  width: 100vw;
  height: 40px;
  background: pink;
  position: fixed;
  top:0;
  left:0;
  z-index:10000;
  line-height: 40px;
  padding-left: 20px;
}
.alert button{
  float: right;
  border: none;
  background: gray;
  color: white;
  font-size: 1em;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transform: scale(.5);
  outline: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.back{
  width: 100%;
  max-width: 800px;
  height: 100vh;
  background: linear-gradient(0deg, rgba(57, 181, 74, 0.9), rgba(0, 109, 56, 0.9) ) , url('./assets/back.jpg') no-repeat center center;
  background-size: cover;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  overflow-x: hidden;
}
.bth {
  font-size: 1.8em;
  font-family: "Arial";
  color: rgb(0, 109, 56);
  line-height: 2;
  border-radius: 3px;
  padding-left: 40px;
  padding-right: 40px;
  background-color: rgb(244, 250, 154);
  cursor: pointer;
  outline: none;
}
.bth-admin{
  background: #999;
  border: none;
  font-size: 1em;
  color: white;
  text-decoration: none;
  padding: 12px;
  border-radius: 12px;
  white-space: nowrap;
  line-height: 3;
  cursor: pointer;
}
</style>
