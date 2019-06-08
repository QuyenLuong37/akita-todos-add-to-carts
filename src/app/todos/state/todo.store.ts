import { Injectable } from '@angular/core';
import { EntityStore, EntityState, ActiveState, StoreConfig } from '@datorama/akita';
import { Todo } from './todo.model';
import { FILTER_TODOS } from '../todo-filter/todo-filter.model';

export interface TodoState extends EntityState<Todo>, ActiveState {
  ui: {
    filter: FILTER_TODOS
  };
}

const initialStateFilterTodos = {
  ui: {
    filter: FILTER_TODOS.ALL
  }
};


@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'todos'})
export class ToDoStore extends EntityStore<TodoState, Todo> {

  constructor() {
    super(initialStateFilterTodos);
  }
}
