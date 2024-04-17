import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: string[] = [];

  ngOnInit() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }
}
