<template>
  <div class="back_q">
    <div class="ask"> {{ current+1 }}. {{ ask }}? </div>
    <div class="img">
      <img v-if="pic.length" :src="pic" />
    </div>
    <div class="ans">
      <div v-for="(an,index) in ans" :key="an" @click="next(index)"><span>{{an}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      id: 2,
      current: 0,
      scope: 0,
      ask: "",
      ans: [],
      pic: "",
      correct: 0,
      pdd: [],
      answ: [],
      scope: 0
    }
  },
  methods: {
    next (picked){
      this.answ.push(picked);
      if(this.correct === picked){
        console.log("yeap!");
        this.scope++;
      }
      this.current++;
      if(this.pdd[this.current]){
        const {ask,pic,ans,correct} = this.pdd[this.current];
        this.ask = ask; this.pic = pic; this.ans = ans; this.correct = correct;
      }else{
        const {answ , scope} = this;
        this.$store.dispatch("result", {answ , scope});
        this.$router.push({path:"form"})
      }
    }
  },
  mounted(){
    this.$store.state.rest.get('/pdd/'+this.$store.state.id).then( e => {
      this.pdd = e.data.test;
      this.name = e.data.name;
      if(this.pdd[this.current]){
        const {ask,pic,ans,correct} = this.pdd[this.current];
        this.ask = ask; this.pic = pic; this.ans = ans; this.correct = correct;
      }else{
        this.$store.dispatch("result", {answ: [] , scope: 0});
        this.$router.push({path:"form"})
      }
    }).catch( e=> this.$store.dispatch("networkErr") )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back_q{
  width: 100%;
  max-width: 70vh;
  height: 100vh;
  margin: auto;
  /* display: flex; */
  justify-content: space-around;
  flex-direction: column;
}
.img{
  width: 100%;
}
.img img{
  width: 100%;
}
.ans{
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 40vh;
}
.ans div{
  flex-grow: 1;
  background: #eee;
  border-bottom: 4px solid white;
  padding-left: 20px;
  cursor: pointer;
  display: flex;
  justify-content:center;
  align-content:center;
  flex-direction:column;
}
.ans div:hover{
  background: lightgreen;
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
