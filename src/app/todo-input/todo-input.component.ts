import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent {
  todo = '';

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.todo.trim() === '') {
      return;
    }

    this.todoService.addTodo(this.todo);
    this.todo = '';
  }
}
