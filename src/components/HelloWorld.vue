<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  <h1>TODO</h1>

  <div>
    <input v-model="NewTodoName"/>
    <button @click="addData()">追加</button>
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
// import firebase from 'firebase'
// import firebase from "firebase/compat/app"

import firebase from '~/plugins/firebase';
import { Firestore, getFirestore, getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore';
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
      NewTodoName:''
    }
  },

  created(){
    // this.db = firebase.firestore()
    // this.todosRef = this.db.collection("todos")

    const db: Firestore = getFirestore(firebaseApp); // Firestore のインスタンスを初期化

      if (!db) { return; }
    getDocs(collection(db, 'hoge'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          console.log(doc.data())
        });
      });
  },

  methods: {
    addData () {
      const db: Firestore = getFirestore(firebaseApp);
      await addDoc(collection(db, 'hoge'), {
        name: 'deren',
        country: 'Japan'
      });
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
