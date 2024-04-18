import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: string[] = [];
  private todosSub: Subscription;

  constructor(private todoService: TodoService) {
    this.todosSub = new Subscription();
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.todosSub = this.todoService.todosChanged.subscribe(
      (todos: string[]) => {
        this.todos = todos;
      }
    );
  }

  ngOnDestroy() {
    this.todosSub.unsubscribe();
  }
}
