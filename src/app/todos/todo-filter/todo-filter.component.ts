import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { initialFilters, FILTER_TODOS } from './todo-filter.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {
  _active: FILTER_TODOS;
  @Input() filters;
  @Input()
    set active(filter: FILTER_TODOS) {
      this._active = filter;
      if (this.filterForm) {
        this.filterForm.patchValue(filter, {emitEvent: false});
      }
    }
  @Output() changeFilter = new EventEmitter<FILTER_TODOS>();

  filterForm: FormControl;
  constructor() { }

  ngOnInit() {
    this.filterForm = new FormControl(this._active);
    this.filterForm.valueChanges.subscribe(filter => {
      this.changeFilter.emit(filter);
    });
  }

}
