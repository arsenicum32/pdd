<template>
  <div>
    <div>
      <h1>Опросы:</h1>
      <div v-for="card in pdd" :key="card.id" class="card">
        <div>
          <span>{{card.name}}</span>
          <span style="float:right">{{ new Date(card.createdAt).toLocaleString("ru",  { year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }) }}</span>
        </div>
        <a :href="'/#/?test='+card.id">пройти опрос</a>
        <p>{{card.test.length}} вопросов</p>
        <p>{{card.contacts.length}} человека прошли опрос</p>
        <div class="ans">
          <a class="bth-admin" @click="goConst(card.id)" to="constructor">в конструктор теста</a>
          <a class="bth-admin" @click="goContacts(card.id)" to="contacts">к списку контактов</a>
          <button @click="remove(card.id)" style="float: right;cursor:pointer">удалить</button>
        </div>
      </div>
      <div class="card">
        <input placeholder="название нового опроса" v-model="name" />
        <button v-if="name.length" @click="addPdd">создать новый опрос</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // async asyncData(){
  //   const {data} = await this.$store.state.rest.get('/pdd');
  //   console.log(data);
  //   return data;
  // },
  data(){
    return {
      pdd: [],
      name: ""
    }
  },
  methods: {
    async getData(){
      const {data} = await this.$store.state.rest.get('/pdd');
      return data;
    },
    remove(id){
      console.log("remove "+ id);
      for(var i=0;i<this.pdd.length;i++){
        if(this.pdd[i].id == id){
          this.pdd.splice(i,1);
        }
      }
      this.$store.state.rest.delete('/pdd/'+id).then( e=> {
      }).catch( e=> this.$store.dispatch("networkErr") )
    },
    goConst(id){
      console.log("to const "+ id);
      this.$store.dispatch('changeId' , id);
      this.$router.push({path: "constructor"})
    },
    goContacts(id){
      console.log("to contacts "+ id);
      this.$store.dispatch('changeId' , id);
      this.$router.push({path: "contacts"})
    },
    addPdd(){
      if(this.name.length){
        console.log("add with name "+this.name);
        this.$store.state.rest.post('/pdd',
          {
            name: this.name,
            test: [
            ],
            contacts: [
            ]
          }
        ).then( d=> {
          this.pdd.push(d.data)
          alert("новый опрос создан! Его id=" +d.data.id)
        }).catch( e=> this.$store.dispatch("networkErr") )
        this.name = "";
      }
    }
  },
  mounted() {
    this.getData().then(e=> this.pdd = e)
    //this.pdd = this.getData();
    //console.log(this.$options.parent.a);
    // this.$store.state.rest.post('/pdd',
    //   {
    //     name: "тестовый опрос",
    //     test: [
    //     ],
    //     contacts: [
    //     ]
    //   }
    // ).then( d=> console.log(d.data) )
    //this.$store.state.rest.delete('/pdd/1').then( d=> console.log(d.data) )
    //console.log( this.$store.state.rest.get('/pdd').then( d=> console.log(d.data) ) );
  }
}
</script>

<style scoped>
h1{
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
.ans{
  margin-bottom: 12px;
}
.card input{
  border: none;
  font-size: 1.2em;
  background: transparent;
  color: #333;
  outline: none;
}
</style>
