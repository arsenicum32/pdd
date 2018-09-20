<template>
  <div>
    <div class="panel">
      <router-link to="admin">назад</router-link>
      <h1>контакты:</h1>
    </div>
    <div v-for="user in contacts" :key="user.id" class="card">
      <p>ИМЯ: {{user.name}}</p>
      <p>email: {{user.email}}</p>
      <p>телефон: {{user.phone}}</p>
      <p>результат: {{user.resilt[0]}} / {{user.resilt[1]}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      id: 2,
      contacts: []
    }
  },
  mounted(){
    this.$store.state.rest.get('/pdd/'+this.$store.state.id).then( e => {
      this.contacts = e.data.contacts;
    })
    .catch( e=> this.$store.dispatch("networkErr") )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel{
  width: 80%;
  margin: auto;
}
.card{
  width: 80%;
  margin: auto;
  background: #eee;
  border-radius: 12px;
  padding: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
