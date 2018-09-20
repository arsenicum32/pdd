<template>
  <div class="back">
    <h1>А вы хорошо знаете<br> <span>правила дорожного движения?</span></h1>
    <h1>Проверьте прямо сейчас!*</h1>
    <button class="bth" @click=" go " >Начать</button>
    <p>*для жителей г. Комсомольск-на-Амуре</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    go (){
      this.$router.push({path:'quizz'})
    }
  },
  mounted(){
    if(this.$route.query.test){
      this.$store.state.rest('/pdd/'+this.$route.query.test)
      .then( e=> this.$store.dispatch("changeId", e.data.id ) )
      .catch( e=> this.$router.push({path: "404"}) )
    }
  }
}
</script>

<style scoped>
h1,h2, p{
  color: white;
  margin: 0;
  font-family: "Arial";
  max-width: 90%;
  text-align: center;
}
h1{
  font-weight: bold;
  line-height: 1.2;
  text-transform: uppercase;
  /* white-space: nowrap; */
}
h1 span{
  font-weight: bold;
  line-height: 1.2;
  font-size: .65em;
  text-transform: uppercase;
}
h2{
  text-transform: uppercase;
}
</style>
