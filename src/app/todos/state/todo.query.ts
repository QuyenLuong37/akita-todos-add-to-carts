import { Injectable } from "@angular/core";
import { QueryEntity, QueryConfig } from "@datorama/akita";
import { Todo } from "./todo.model";
import { TodoState, ToDoStore } from "./todo.store";
import { map } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { FILTER_TODOS } from "../todo-filter/todo-filter.model";

@Injectable({
  providedIn: "root"
})
@QueryConfig({ sortBy: "title" })
export class TodoQuery extends QueryEntity<TodoState, Todo> {
  selectUIFilterActive$ = this.select(state => state.ui.filter);
  selectListTodoCombineFilter$ = combineLatest(
    this.selectUIFilterActive$,
    this.selectAll(),
  ).pipe(
    map(([filter, listTodo]) => {
      return getTodoCombineFilter(listTodo, filter);
    })
  );
  // selectIDs$ = this.select(state => state.ids);
  checkAll$ = this.selectCount(entity => entity.completed);
  constructor(protected store: ToDoStore) {
    super(store);
  }
}
function getTodoCombineFilter(listTodo, filter): Todo[] {
  console.log(listTodo);
  switch (filter) {
    case FILTER_TODOS.COMPLETED:
      return listTodo.filter(item => item.completed);
    case FILTER_TODOS.ACTIVE:
      return listTodo.filter(item => !item.completed);
    default:
      return listTodo;
  }
}
