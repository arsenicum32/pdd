<template>
  <div class="back">
    <div class="form_login">
      <h2 class="login_text">Вход</h2>
      <div class="fields">
        <div class="input">
          <div class="icon">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1.129cm" height="0.776cm">
            <path fill-rule="evenodd"  fill-opacity="0.502" fill="rgb(126, 128, 133)"
            d="M32.000,5.000 L32.000,20.000 L23.000,12.000 L32.000,5.000 ZM-0.000,3.000 L-0.000,-0.000 L32.000,-0.000 L32.000,3.000 L16.000,16.000 L-0.000,3.000 ZM-0.000,20.000 L-0.000,5.000 L9.000,12.000 L-0.000,20.000 ZM16.000,18.000 L22.000,13.000 L32.000,22.000 L-0.000,22.000 L10.000,13.000 L16.000,18.000 Z"/>
            </svg>
          </div>
          <input placeholder="Логин"/>
        </div>
        <div class="input">
          <div class="icon">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="0.847cm" height="1.129cm">
            <path fill-rule="evenodd"  fill-opacity="0.502" fill="rgb(126, 128, 133)"
            d="M21.000,32.000 L3.000,32.000 C1.343,32.000 -0.000,30.657 -0.000,29.000 L-0.000,18.000 C-0.000,16.343 1.343,15.000 3.000,15.000 L4.000,15.000 L4.000,7.000 C4.000,3.134 7.582,-0.000 12.000,-0.000 C16.418,-0.000 20.000,3.134 20.000,7.000 L20.000,15.000 L21.000,15.000 C22.657,15.000 24.000,16.343 24.000,18.000 L24.000,29.000 C24.000,30.657 22.657,32.000 21.000,32.000 ZM16.000,7.000 C16.000,5.343 14.209,4.000 12.000,4.000 C9.791,4.000 8.000,5.343 8.000,7.000 L8.000,14.000 C8.000,14.352 8.096,14.686 8.245,15.000 L15.755,15.000 C15.904,14.686 16.000,14.352 16.000,14.000 L16.000,7.000 ZM12.000,18.000 C9.791,18.000 8.000,19.791 8.000,22.000 C8.000,23.477 8.809,24.752 10.000,25.445 L10.000,27.000 C10.000,28.104 10.895,29.000 12.000,29.000 C13.104,29.000 14.000,28.104 14.000,27.000 L14.000,25.445 C15.190,24.752 16.000,23.477 16.000,22.000 C16.000,19.791 14.209,18.000 12.000,18.000 Z"/>
            </svg>
          </div>
          <input placeholder="Пароль"/>
        </div>
      </div>
      <button class="base">Войти</button>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}
.back {
  width: 100vw;
  height: 100vh;
  background: #3e434c;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_text {
  font-size: 36px;
  font-family: "Myriad Pro";
  color: #36383c;
  line-height: 0.833;
  text-align: center;
}
.form_login {
  background-color: #f1f2f4;
  box-shadow: 0px 1px 3px 0px rgba(23,16,25,0.75), inset 0px -2px 0px 0px rgba(23,16,25,0.2);
  width: 475px;
  height: 450px;
  border-radius: 5px;
}
.fields {
  margin-top: 20px;
  margin-bottom: 20px;
}
.input {
  width: calc(80% - 40px);
  display: flex;
  padding: 20px;
  margin-left: 10%;
  outline: none;
  font-family: "Myriad Pro";
  font-size: 24px;
  border: 0.5px solid #bec0c2;
  background: #e5e7e9;
  box-shadow: 0px 2px 0px 0px rgba(255,255,255,0.4), inset 0px 1px 3px 0px rgba(23,16,25,0.045);
}
.input .icon{
  width: 80px;
  height: 80px;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input input{
  flex: 2;
}
.input:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #bec0c2;
  z-index: 100;
}
.input:last-child {
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.base {
  width: 80%;
  height: 72px;
  cursor: pointer;
  border: 1px solid #2a8b7b;
  border-radius: 4px;
  background: url("http://api.thumbr.it/whitenoise-200x200.png?background=ffffff00&noise=626262&density=36&opacity=14"), linear-gradient(0deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%), #36b7a6;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3), inset 0px 2px 0px 0px rgba(255,255,255,0.4);
  font-size: 2em;
  font-family: "Myriad Pro";
  color: #fff;
  line-height: 1.2;
  text-align: center;
  text-shadow: 0px 1px 3px rgba(23,16,25,0.55);
  margin-left: 10%;
  outline: none;
}
</style>
