<template>
<div id="container">
  <div id="app">
    <h3>{{title}}</h3>
      <form @submit.prevent="addTodo()">
        <input v-model="newTodo" type="text" placeholder="Add New Todo" id="submit" >
      </form>


      <ul>
        <li v-for="todo in todos" :key="todo.id">

          <template v-if="currentlyEditing !== todo.id">
            <input 
              type="checkbox" 
              v-model="todo.completed" 
              @change="updateTodo(todo)">
              <span :class="{done: todo.completed}">{{todo.text}}</span>
            
            <i
              @click="editTodo(todo)" 
              class="fa fa-edit">
              
            </i>
            <i
              @click="deleteTodo(todo)" 
              class="fa fa-trash">
            </i>
            
          </template>

          
            
          

          <form v-else>
            <input type="text" v-model="todoEditText" id="edit">
            <button 
              type="submit" 
              class="btn btn-success"
              @click.prevent="updateTodoText()">
              Save
            </button>
          </form>

        </li>
      </ul>

  </div>
</div>
  
</template>

<script>
import { db } from './firebase';
export default {
  name: 'app',
  data () {
    return {
      title: "ToDo List",
      newTodo: '',
      todos: [],
      currentlyEditing: null,
      todoEditText: ''
    }
  },
  firestore: {
    todos: db.collection("todos").orderBy("createdAt", "desc")
  },
  methods: {
    addTodo() {
      db.collection("todos").add({
        text: this.newTodo,
        completed: false,
        id: this.todos.length,
        createdAt: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.newTodo = '';
    },

    updateTodo(todo) {
      db.collection("todos").doc(todo.id).update({...todo})
        .then(function(docRef) {
          console.log("Updated document with ID: ", todo.id);
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },

    deleteTodo(todo) {
      db.collection("todos").doc(todo.id).delete();
    },

    editTodo(todo) {
      this.currentlyEditing = todo.id
      this.todoEditText = todo.text
    },

    updateTodoText() {
      db.collection("todos").doc(this.currentlyEditing).update({
        text: this.todoEditText
      })
      .then(function() {
        console.log("Updated document successfully!");
      })
      .catch(function(error) {
        console.error("Error updating document text: ", error);
      });
      this.currentlyEditing = null;
      this.todoEditText = '';
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 60px;
}


body{
	background-image: url('https://sfwallpaper.com/images/hd-website-backgrounds-18.jpg'); 
	background-repeat: no-repeat;
	background-attachment: fixed;
 	background-size: cover;

}

ul{
	list-style: none;
	padding:0;
}


h3 {
  margin-bottom: 0;
	background: steelblue;
	color: white;
	padding: 10px 20px;
	font-size: 24px;
	font-weight: normal;
	
}


li{
	background: #fff;

}

#container {
	width: 360px;
	margin: 100px auto;
	background: f7f7f7;

}



.done {
	text-decoration: line-through;
}

#submit{

	font-size: 1.2rem;
	width: 100%;
	background-color: #f7f7f7;
	padding: 10px 10px 10px 20px;
	box-sizing: border-box;
	border: 3px solid rgba(0,0,0,0);
	margin:0;
}

#submit:focus{
	background: #fff;
	border:3px solid steelblue;
	outline: none;
}

li{
	line-height: 40px;
	height: 40px;
	background: #fff;
	color: #666;
  padding-left:10px;
}

li:nth-child(2n){
	background-color: #f7f7f7;
}

#edit {
  line-height: 40px;
  height:40px;
  margin-left: 1.02rem;
}

.fa-trash {
  float: right;
  padding: 10px;
}
.fa-edit {
  float: right;
  padding: 10px;
}



</style>


