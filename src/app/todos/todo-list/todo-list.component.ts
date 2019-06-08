import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { initialFilters, FILTER_TODOS } from "../todo-filter/todo-filter.model";
import { TodoService } from "../state/todo.service";
import { TodoQuery } from "../state/todo.query";
import { Observable } from "rxjs";
import { Todo } from "../state/todo.model";
import { ID, StateHistoryPlugin, isUndefined, EntityStateHistoryPlugin } from "@datorama/akita";
import { TodoState } from '../state/todo.store';

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  filters = initialFilters;
  statusFilter$: Observable<any>;
  ids: ID[];
  addControls = new FormControl("", [
    Validators.required,
    Validators.minLength(2)
  ]);
  activeFilter$: Observable<FILTER_TODOS>;
  selectAll = new FormControl();
  todoList$: Observable<Todo[]>;
  checkAll$: Observable<boolean>;
  stateHistory: StateHistoryPlugin;
  stateHistoryEntity: EntityStateHistoryPlugin<Todo>;

  constructor(private todoService: TodoService, private queryTodo: TodoQuery) {}

  ngOnInit() {
    this.activeFilter$ = this.queryTodo.selectUIFilterActive$;
    this.todoList$ = this.queryTodo.selectListTodoCombineFilter$;
    // this.addControls.valueChanges.pipe(
    //   distinctUntilChanged()
    // )
    // this.queryTodo.selectIDs$.subscribe(ids => this.ids = ids);
    this.stateHistory = new StateHistoryPlugin(this.queryTodo);
    this.stateHistoryEntity = new EntityStateHistoryPlugin<Todo>(this.queryTodo);
    this.addControls.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(val => {
        console.log(val);
      });

    this.selectAll.valueChanges.subscribe(completed => {
      this.todoService.completedTodos(completed);
    });

    this.checkAll$ = this.queryTodo.checkAll$.pipe(
      map(
        numberCompleted =>
          numberCompleted && numberCompleted === this.queryTodo.getCount()
      )
    );
  }

  addTodo(): void {
    console.log(this.addControls.value);
    this.todoService.addTodo(this.addControls.value);
    this.addControls.setValue("");
  }

  updateFilter(filter: any): void {
    console.log(filter);
    this.todoService.updateFilter(filter);
  }

  complete(todo: Todo) {
    console.log(todo);
    this.todoService.updateCompletedTodo(todo);
  }

  completedTodos(completed: boolean) {
    this.todoService.completedTodos(completed);
  }

  remove(id: ID) {
    this.todoService.removeTodo(id);
  }

  undo(id?: ID) {
    if (isUndefined(id)) {
      console.log('check: ', id);
      this.stateHistory.undo();
    }
  }
  redo(id?: ID) {
    if (isUndefined(id)) {
      console.log(isUndefined(id));
      this.stateHistory.redo();
    }
  }
}
