import { Type } from 'class-transformer';
import { Todo } from './todo.model';

export class Project {
  id: number;
  title: string;

  @Type(() => Todo)
  todos: Todo[];

  get Title() {
    return this.title;
  }
  set Title(newTitle: string) {
    this.title = newTitle;
  }
  get Todos() {
    return this.todos;
  }
  set Todos(newTodos: any) {
    const todo = { isCompleted: false, text: newTodos };
    this.todos = [];
    this.todos.push(todo);
  }
}
