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
  activeTodosCount: number = 0;
  private todosSub: Subscription;

  constructor(private todoService: TodoService) {
    this.todosSub = new Subscription();
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.activeTodosCount = this.todoService.getActiveTodosCount();

    this.todosSub = this.todoService.todosChanged.subscribe(
      (todos: { text: string; done: boolean }[]) => {
        this.todos = todos;
        this.activeTodosCount = this.todoService.getActiveTodosCount();
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

  showAll() {
    this.todos = this.todoService.getTodos();
  }

  showActive() {
    this.todos = this.todoService.getActiveTodos();
  }

  showCompleted() {
    this.todos = this.todoService.getCompletedTodos();
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  draggedItemIndex: number = 0;

  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer!.setData('text/plain', index.toString());
    this.draggedItemIndex = index;
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    const droppedItemIndex = Number(event.dataTransfer!.getData('text'))
    this.todoService.swapTodos(this.draggedItemIndex, index)
  }
}
