import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent {
  todo = '';

  addTodo() {
    if (this.todo.trim() === '') {
      return;
    }

    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(this.todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.todo = '';
  }
}
