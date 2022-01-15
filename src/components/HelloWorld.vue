<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  <h1>TODO</h1>

  <div>
    <input v-model="newTodoName"/>
    <button @click="addData()">追加</button>
  </div>

  <ul>
    <!-- 一つのアイテムがtodo,todosで回した一つ一つ -->
    <!-- keyはfirestoreドキュメントのランダムな文字列 -->
    <li v-for="(todo, key) in todos" :key = "key">
      <input type="checkbox" v-model="todo.judge" @click="updateTodo(todo, key)">
      {{ todo.name }}
    </li>
    <button>X</button>
  </ul>
    
  </div>
</template>

<script>
// import firebase from 'firebase'
// import firebase from "firebase/compat/app"

// import firebase from '~/plugins/firebase';
import { doc, getFirestore, getDocs, addDoc, collection, updateDoc} from 'firebase/firestore';
import 'firebase/firestore';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  
  data(){
    return {
      db: null,
      todosRef: null,
      newTodoName:'',
      todos: {}
    }
  },

  created(){
    // this.db = firebase.firestore()
    // this.todosRef = this.db.collection("todos")

    const db = getFirestore(); // Firestore のインスタンスを初期化

      if (!db) { return; }
    getDocs(collection(db, 'todos'))
      .then((querySnapshot) => {
        // querySnapshot = 現在の全データ
        const obj = {}
        querySnapshot.forEach((doc) => {
          console.log(doc.data());

          // doc.id = firestoreのドキュメントid(ランダムな文字列)
          //doc.data() = name: 'hoge' judge: false
          obj[doc.id] = doc.data()
        });
        this.todos = obj
      });
  },

  methods: {
    async addData () {
      const db = getFirestore();
       await addDoc(collection(db, 'todos'), {
        name: this.newTodoName,
        judge: false
      });
    },

    async updateTodo(todo, key) {

      try{
        const db = getFirestore();
        todo.judge = !todo.judge
        
        // collection(db, 'todos').doc(key).update(todo);
        // console.log("judge");
        // console.log(todo.judge);
  
        // updateDoc(collection(db, 'todos'))

        const docRef = doc(db, "todos", key);
        console.log(todo.judge);
        console.log(docRef);

        const docSnap = await updateDoc(docRef);

        if (docSnap.exists()) {
          todo.judge = !todo.judge
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }


      } catch (e) {
        console.log(e)
      }
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
