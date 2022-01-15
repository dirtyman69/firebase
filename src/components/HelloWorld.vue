<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  <h1>TODO</h1>

  <div>
    <input v-model="NewTodoName"/>
    <button @click="addTodo()">追加</button>
  </div>

  <ul>
    <li>
      <input type="checkbox">
      タスク名
    </li>
    <button>X</button>
  </ul>
    
  </div>
</template>

<script>
import firebase from 'firebase'

// import firebase from "firebase/compat/app"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  
  data(){
    return {
      db: null,
      todosRef: null,
      NewTodoName:''
    }
  },

  created(){
    this.db = firebase.firestore()
    this.todosRef = this.db.collection("todos")
  },

  methods: {
    addTodo(){
      if(this.NewTodoName === ''){ return }
      this.todosRef.add({
        name: this.NewTodoName,
        isComplete: false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
