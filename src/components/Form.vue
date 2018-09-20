<template>
  <div>
    <div v-if="!sys">загрузка...</div>
    <div v-if="sys" class="back">
      <h1><span>ПОЧТИ</span><br/><span class="big">ГОТОВО!</span></h1>
      <h2>Оставьте, пожалуйста, свои данные, чтобы мы могли связаться с вами в случае выигрыша:</h2>
      <div class="feedback">
        <input placeholder="имя" :style=" name.length < 3 ? 'color: lightgray':'' " v-model="name" />
        <input placeholder="телефон" v-model="phone" />
        <!-- <input placeholder="email" :style=" !/.+@.+\..+/.test(email) ? 'color: lightgray':'' " v-model="email" /> -->
        <div>
          <div class="span" @click="yes">
            <div v-if="agree"></div>
          </div>
          <span>Я даю согласие на обработку своих <span style="border-bottom: 1px solid white" @click="openWindow">персональных данных</span>.</span>
        </div>
      </div>
      <button class="bth" v-if="(agree && phone.length > 8)" @click="done">Отправить</button>
      <button class="bth" style="background: lightgray;color: black;cursor:not-allowed" v-if="!(agree && phone.length > 8)">Отправить</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      agree: false,
      name: "",
      phone: "",
      email: "",
      answ: [],
      scope: 0,
      sys: true
    }
  },
  methods: {
    openWindow(){
      window.open("/#/rules", "Rules", "width=420,height=800,resizable=yes,scrollbars=yes,status=yes")
    },
    yes (){
      this.agree = true
    },
    done (){
      this.sys = false;
      const {
        name,
        phone,
        email,
        scope
      } = this;

      this.$store.state.rest.get('/pdd/'+this.$store.state.id).then( e => {
        let contacts = e.data.contacts;

        let cant = false;
        contacts.map( e=> cant = cant || this.phone.trim() === e.phone.trim()  );

        if(cant){
          this.sys = true;
          this.phone = ""
          alert("данный контакт уже проходил тест, введите другой номер телефона")
        }else{
          // отправка на email
          const answ = [...this.answ];
          contacts.push({
            name,
            phone,
            email,
            answ,
            resilt: [scope , answ.length ]
          });

          this.$store.state.rest.patch('/pdd/'+this.$store.state.id , {contacts}).then( e => {
            this.$store.state.rest.get(`/email?name=${name}&phone=${phone}&email=${email}&result=${Math.floor(scope/answ.length*1000)/10}`)
            .then( ev=> {
              console.log(ev);
              this.$router.push({path: 'end'})
              this.sys = true;
            })


          })
          .catch( e=> this.$store.dispatch("networkErr") );

        }
      })
      .catch( e=> this.$store.dispatch("networkErr") );
    }
  },
  mounted(){
    this.answ = this.$store.state.ans;
    this.scope = this.$store.state.scope;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h2, p{
  color: white;
  margin: 0;
  font-family: "Arial";
  max-width: 480px;
  width: 80%;
  text-align: center;
}
.big{
  font-size: 2.3em;
  line-height: .7;
}
@media (max-width: 720px) {
  .big{
    font-size: 1.8em;
  }
}
h1 span {
  float: left;
}
h1 span:first-child{
  position: relative;
  left: 4px;
}
h2{
  text-align: left;
}
.done{
  background: white;
  padding: 2px;

}
.feedback{
  width: 100%;
  text-align: center;
  color: white;
}
.feedback a{
  text-decoration: none;
  color: white;
}
.feedback .span{
  width: 14px;
  height: 14px;
  cursor: pointer;
  border: 2px solid white;
  display: inline-block;
  position: relative;
  top: 3px;
}
.feedback .span div{
  width: 10px;
  height: 10px;
  background: white;
  position: absolute;
  top: -6px;
  left: 2px;
}
.feedback div{
  width: 80%;
  max-width: 480px;
  margin: auto;
  text-align: left;
  margin-top: 8px;
}
.feedback input{
  width: 80%;
  max-width: 480px;
  margin: auto;
  font-size: 1.4em;
  padding: 10px;
  padding-left: 20px;
  margin-top: 2px;
  margin-bottom: 2px;
  border: none;
  outline: none;
  border-radius: 3px;
}
</style>
