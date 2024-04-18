import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosChanged = new Subject<string[]>();

  addTodo(todo: string) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[');
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.todosChanged.next(todos);
  }

  getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  }
}
