import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosChanged = new Subject<{ text: string; done: boolean }[]>();
  private todos: { text: string; done: boolean }[] = [];

  addTodo(todo: string) {
    this.todos.push({ text: todo, done: false });
    this.todosChanged.next(this.todos.slice());
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  toggleDone(index: number) {
    this.todos[index].done = !this.todos[index].done;
    this.todosChanged.next(this.todos.slice());
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return this.todos.slice();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getActiveTodosCount() {
    return this.todos.filter((todo) => !todo.done).length;
  }

  getActiveTodos() {
    return this.todos.filter((todo) => !todo.done);
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.done);
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.done);
    this.todosChanged.next(this.todos.slice());
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  swapTodos(fromIndex: number, toIndex: number) {
    const temp = this.todos[fromIndex];
    this.todos[fromIndex] = this.todos[toIndex];
    this.todos[toIndex] = temp;
    this.todosChanged.next(this.todos.slice());
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
