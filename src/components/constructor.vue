<template>
  <div>
    <span v-if="!sys">сохранение в базу данных</span>
    <div v-if="sys">
      <div class="header">
        <router-link to="admin">назад</router-link>
        <p v-if="pdd[currentAsk]">{{currentAsk + 1}} / {{pdd.length}}</p>
        <p>{{name}}</p>
        <button v-if="pdd[currentAsk -1]" @click="step(-1)">< предыдущий вопрос</button>
        <button v-if="!pdd[currentAsk -1]" style="opacity:0.1">< предыдущий вопрос</button>
        <button v-if="!pdd[currentAsk +1]" style="opacity:0.1">следующий вопрос > </button>
        <button v-if="pdd[currentAsk +1]" @click="step(1)">следующий вопрос > </button>
        <button @click="newAns">создать новый вопрос</button>
        <button @click="remove" v-if="pdd[currentAsk]">удалить этот вопрос</button>
        <button style="opacity:0.1" v-if="!pdd[currentAsk]">удалить этот опрос</button>
        <button style="background: lightgreen" @click="save" v-if="pdd[currentAsk] && ans.length && ask.length">сохранить этот вопрос</button>
        <button style="opacity:0.1" v-if="!(pdd[currentAsk] && ans.length && ask.length)">сохранить этот опрос</button>
      </div>
    <div class="backing" v-if="pdd[currentAsk]">

      <div class="ask"> {{ currentAsk + 1 }}. <textarea v-model="ask"></textarea>?
      </div>
      <span v-if="!src.length">загрузите изображение к вопросу</span>
      <!-- <input @change="load" type="file" /> -->
      <button class="bth-admin" @click="load" >{{src.length ? "заменить":"загрузить"}} изображение</button>
      <button v-if="canSave" @click="saving" >сохранить картинку вопроса</button>
      <div v-if="src.length" class="img">
        <img class="image_prew" :src="src" />
      </div>
      <div class="ans">
        <div class="ans" v-for="(an,i) in ans" :key="i">
          <p>{{an}}</p>
          <button @click="ans.splice(i,1)" >удалить вариант ответа</button>
          <button v-if="correct != i" @click="correct = i" >этот правильный</button>
          <p v-if="correct == i" style="color: lightgreen;font-weight: bolder">правильный ответ</p>
        </div>
      </div>

    </div>
    <div class="newans" v-if="pdd[currentAsk]">
      <textarea placeholder="новый ответ" v-model="newAnswer" />
      <button v-if="newAnswer.length" @click="ans.push(newAnswer);newAnswer=''">добавить вариант ответа</button>
    </div>
  </div>
</div>
</template>

<script>
import uploadcare from 'uploadcare-widget'

export default {
  name: 'HelloWorld',
  data () {
    return {
      id: 2,
      src: "",
      name: "",
      newAnswer: "",
      ask: "",
      ans: [],
      correct: 0,
      currentAsk: 0,
      pdd: [],
      canSave: false,
      sys: true
    }
  },
  methods: {
    next (){
      this.$router.push({path:"form"})
    },
    load (event){
      uploadcare.openDialog(null, {
        crop: "disabled",
        publicKey: "c62f2ae378be6d2895bc",
        locale: "ru",
        previewStep: true,
        imagesOnly: true,
        validators: [ _=> ( fileInfo => {
          const imageInfo = fileInfo.originalImageInfo;
          if (imageInfo !== null) {
            if (imageInfo.width < imageInfo.height ) {
              throw new Error('wrong dimensions');
            }
          }
        }) ]
      }).done( file => {
        file.promise().done(fileInfo => {
          this.src = fileInfo.cdnUrl;
        });
      });
    },
    save (){
      const { ask , ans , correct } = this;
      // запись в pdd
      this.pdd[this.currentAsk] = {
        ...this.pdd[this.currentAsk],
        ask , ans , correct, pic: this.src ? this.src : ""
      }
      console.log(JSON.stringify(this.pdd,null,'\t'));
      this.sys = false;
      this.$store.state.rest.patch('/pdd/'+this.$store.state.id , { test: JSON.parse(JSON.stringify(this.pdd)) }).
      then(e=> this.sys = true )
      // this.$store.state.rest.get('/pdd/'+this.$store.state.id).then( e => {
      //   console.log(e.data);
      //
      // })
      .catch( e=> this.$store.dispatch("networkErr") )
      console.log("save");
    },
    saving(){
      this.canSave = false;
    },
    step(n){
      const { ask , ans , correct } = this;
      // запись в pdd
      this.pdd[this.currentAsk] = {
        ...this.pdd[this.currentAsk],
        ask , ans , correct, pic: this.src ? this.src : ""
      }
      this.currentAsk+=n;
      // чтение из pdd
      this.ask = this.pdd[this.currentAsk].ask;
      this.ans = [...this.pdd[this.currentAsk].ans];
      this.correct = this.pdd[this.currentAsk].correct;
      this.src = this.pdd[this.currentAsk].pic;
      console.log(this.currentAsk);
    },
    remove(){
      this.pdd.splice( this.currentAsk , 1);
      this.currentAsk = this.pdd.length - 1;
      // чтение из pdd
      this.ask = this.pdd[this.currentAsk].ask;
      this.ans = [...this.pdd[this.currentAsk].ans];
      this.correct = this.pdd[this.currentAsk].correct;
      this.src = this.pdd[this.currentAsk].pic;
      console.log("remove");
    },
    newAns(){
      const { ask , ans , correct } = this;
      // запись в pdd
      this.pdd[this.currentAsk] = {
        ...this.pdd[this.currentAsk],
        ask , ans , correct, pic: this.src ? this.src : ""
      }
      // создание новой записи
      this.pdd.push({
        ask:"",
        pic: "",
        ans:[],
        correct:0
      });
      this.currentAsk = this.pdd.length - 1;
      // чтение из pdd
      this.ask = this.pdd[this.currentAsk].ask;
      this.ans = [...this.pdd[this.currentAsk].ans];
      this.correct = this.pdd[this.currentAsk].correct;
      this.src = this.pdd[this.currentAsk].pic;
      console.log("new Ans");
    }
  },
  mounted(){
    this.$store.state.rest.get('/pdd/'+this.$store.state.id).then( e => {
      console.log(e.data);
      this.pdd = e.data.test;
      this.name = e.data.name;
      if(this.pdd[this.currentAsk]){
        this.ask = this.pdd[this.currentAsk].ask;
        this.ans = [...this.pdd[this.currentAsk].ans];
        this.correct = this.pdd[this.currentAsk].correct;
        this.src = this.pdd[this.currentAsk].pic;
      }
    }).catch( e=> this.$store.dispatch("networkErr") )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea{
  width: 80%;
  height: 30px;
  resize: none;
}
.header{
  width: 100%;
  height: 40px;
  background: #eee;
  display: flex;
}
.header p{
  line-height: 40px;
  margin: 0;
  margin-left: 20px;
  margin-right: 20px;
}
.header button{
  height: 30px;
  cursor: pointer;
  border: 0;
  outline: none;
  margin-top: 5px;
}
.header button:hover{
  background: yellow;
}
.backing{
  width: 100%;
  max-width: 800px;
  height: 70vh;
  margin: auto;
  background: white;
  overflow-y: scroll;
  margin-top: 40px;
}
.newans{
  width: 100%;
  height: 80px;
  background: #eee;
  padding-left: 40px;
  position: fixed;
  bottom: 0;
}
.newans textarea{
  font-size: 1.2em;
}
.img{
  width: 100%;
  height: 230px;
}
.image_prew{
  height: 100%;
}
.ans{
  flex: 2;
  width: 100%;
}
.ans div{
  flex-grow: 1;
  background: #eee;
  border-bottom: 4px solid white;
  padding-left: 20px;
  cursor: pointer;
}
.ans button{
  width: 120px;
  cursor: pointer;
  border: none;
  outline: none;
  background: #333;
  color: white;
}
.ask{
  font-family: "Arial";
  line-height: 1.2;
  font-size: 1.2em;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 20px;
  background: white;
  width: calc(100% - 20px);
}
</style>
