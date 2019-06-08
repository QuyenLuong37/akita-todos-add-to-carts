import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TodoQuery } from "../state/todo.query";
import { Observable } from "rxjs";
import { Todo } from "../state/todo.model";
import { FormControl } from "@angular/forms";
import { TodoService } from "../state/todo.service";
import { ToDoStore } from "../state/todo.store";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter();
  listTodos$: Observable<Todo[]>;
  todoCheckbox: FormControl;
  constructor(
    private todoService: TodoService,
  ) {}

  ngOnInit() {
    this.todoCheckbox = new FormControl(this.todo.completed);
    this.todoCheckbox.valueChanges.subscribe(completed => {
      this.complete.emit({ ...this.todo, completed });
    });
  }

}
