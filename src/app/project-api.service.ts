import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { Project as ProjectModel } from './model/project.model';

export interface Project {
  id?: number;
  title: string;
  todos: Todo[];
}
export interface Todo {
  id?: number;
  text: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectApiService {
  private projectUrl = 'http://localhost:3000/projects';
  constructor(private http: HttpClient) {}
  public changeStatus(
    projectId: number,
    completed: boolean,
    todoId: number
  ): Observable<Todo> {
    return this.http.patch<Todo>(
      `${this.projectUrl}/${projectId}/todos/${todoId}`,
      { isCompleted: completed }
    );
  }
  public getListOfProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.projectUrl)
      .pipe(map((el) => this.reorderTodos(el)));
  }
  public createNewProject(project: Project): Observable<any> {
    return this.http.post<Project>(`${this.projectUrl}/0/todos`, project);
  }
  private reorderTodos(stream: any) {
    return stream.map((x: any) => {
      const todos = x.todos.sort(this.compareFn);
      const resulted = plainToInstance(ProjectModel, { ...x, todos });
      return resulted;
    });
  }
  private compareFn = (a: any, b: any): any => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  };
}
