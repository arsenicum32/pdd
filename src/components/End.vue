<template>
  <div class="back">
    <h1>{{status?cool.h1:fail.h1}}</h1>
    <h2>{{status?cool.h2:fail.h2}}</h2>
    <div class="card">
      <img src="../assets/men.png" />
      <p>{{status?cool.p:fail.p}}</p>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'End',
  data () {
    return {
      status: true,
      fail: {
        h1: 'ВЫ ОТВЕТИЛИ',
        h2: 'на 2 вопроса из 12',
        p: 'Учите правила и в следующий раз вам обязательно повезет!'
      },
      cool: {
        h1: 'ПОЗДРАВЛЯЕМ!',
        h2: 'Вы знаете правила дорожного движения на «ОТЛИЧНО»!',
        p: 'В ближайшее время мы с вами свяжемся и расскажем, как забрать ваш приз!'
      }
    }
  },
  mounted(){
    const len = this.$store.state.ans.length;
    const scope = this.$store.state.scope;
    this.status = scope+1>=len;
    this.fail.h2 = `на ${scope} вопрос${scope < 2 ? "":scope>4?"ов":"a"} из ${len}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h2{
  color: white;
  margin: 0;
  font-family: "Arial";
  max-width: 480px;
  width: 80%;
  text-align: center;
}
h1{
  font-size: 4em;
}
@media (orientation: portrait) {
  h1{
    font-size: 2em;
  }
}
.card{
  width: 380px;
  max-width: 95vw;
  height: 150px;
  background: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  overflow: hidden;
  box-shadow: 0px 23px 35px 0px rgba(0, 0, 0, 0.2);
}

.card img{
  height: 100%;
  position: relative;
  top: 12px;
  margin-left: 20px;
  margin-right: 20px;
}
.card p{
  max-width: 40%;
}
</style>
