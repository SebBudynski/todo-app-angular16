import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: { text: string; done: boolean }[] = [];
  private todosSub: Subscription;

  constructor(private todoService: TodoService) {
    this.todosSub = new Subscription();
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.todosSub = this.todoService.todosChanged.subscribe(
      (todos: { text: string; done: boolean }[]) => {
        this.todos = todos;
      }
    );
  }

  ngOnDestroy() {
    this.todosSub.unsubscribe();
  }

  onTodoClick(index: number) {
    this.todoService.toggleDone(index);
  }

  onDeleteClick(index: number) {
    this.todoService.deleteTodo(index);
  }
}
