export enum FILTER_TODOS {
  COMPLETED = "COMPLETED",
  ACTIVE = "ACTIVE",
  ALL = "ALL"
}


export interface TodoFilter {
  title: string;
  value: FILTER_TODOS;
}


export const initialFilters: TodoFilter[] = [
  {
    title: 'All',
    value: FILTER_TODOS.ALL
  },
  {
    title: 'Completed',
    value: FILTER_TODOS.COMPLETED,
  },
  {
    title: 'Active',
    value: FILTER_TODOS.ACTIVE
  }
];
