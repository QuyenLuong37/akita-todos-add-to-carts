import { Injectable } from "@angular/core";
import { Todo, createTodo } from "./todo.model";
import { ToDoStore } from "./todo.store";
import { ID } from "@datorama/akita";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private todoStore: ToDoStore) {}

  addTodo(title: string): void {
    const todo = createTodo(title);
    this.todoStore.add(todo);
  }

  updateFilter(filter: any): void {
    this.todoStore.update({
      ui: {
        filter
      }
    });
  }

  updateStatusCheckbox({id, completed}: Todo) {
    return this.todoStore.update(id, {completed});
  }

  updateCompletedTodo({id, completed}: Todo) {
    this.todoStore.update(id, {completed});
  }

  completedTodos(completed: boolean) {
    // this.todoStore.update(ids, {completed});
    this.todoStore.update(null, {completed});
  }

  removeTodo(id: ID) {
    this.todoStore.remove(id);
  }
}
