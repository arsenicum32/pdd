<template>
  <div class="flex">
    <input placeholder="логин" />
    <input placeholder="пароль" type="password" />
    <div>
      <button class="bth">войти</button>
    </div>
  </div>
</template>


<style scoped>
.flex{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
input{
  width: 80%;
  max-width: 480px;
  margin: auto;
  font-size: 1.4em;
  padding: 10px;
  padding-left: 4px;
  margin-top: 4px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  border-radius: 3px;
  background: #eee;
}
</style>
