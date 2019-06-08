import { guid, ID } from '@datorama/akita';

export interface Todo {
  id: ID;
  title: string;
  completed: boolean;
}

export function createTodo(title: Todo['title']) {
  return {
    id: guid(),
    title: title,
    completed: false
  } as Todo;
}
