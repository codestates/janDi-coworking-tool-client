import React, { Component } from "react"
import TodoItem from '../TodoItem/TodoItem'
//import axios from 'axios'

class TodoItemList extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.todos !== nextProps.todos;
  // }
  // axios = () => {
  //   axios.post('http://localhost:5000/todolistinfo')
  //     .then((res) => (console.log(res)))
  // }


  render() {
    const { todos, onToggle, onRemove } = this.props;
    const todoList = todos.map(({ id, body, isChecked }) => (
      <TodoItem onchange={this.axios} id={id} body={body} isChecked={isChecked} onToggle={onToggle} onRemove={onRemove} key={id}
      />))

    return (
      < div >
        {todoList}
      </div >
    );
  }
}
export default TodoItemList;