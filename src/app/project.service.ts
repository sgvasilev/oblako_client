import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './model/todo.model';
import { Project, ProjectApiService } from './project-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects$ = new BehaviorSubject<Project[]>([]);
  readonly projects = this.projects$.asObservable();

  private titles$ = new BehaviorSubject<Array<Array<any>>>([]);
  readonly titles = this.titles$.asObservable();

  private projectArray: any = [];

  constructor(private projectApiService: ProjectApiService) {
    this.loadProjects();
  }
  loadProjects() {
    this.projectApiService.getListOfProjects().subscribe((res: Project[]) => {
      this.projectArray.push(res);
      this.projects$.next(Object.assign([], this.projectArray)[0]);
    });
  }
  loadTitles() {
    let tempArr: Array<Array<number | string>> = [['Новый проект', 0]];
    this.projectArray[0].forEach((el: any) => {
      const res = [el.title, el.id];
      tempArr.push(res);
      this.titles$.next(Object.assign([], tempArr));
    });
  }
  createProject(project: Project, isNew: boolean, currProject: number) {
    this.projectApiService
      .createNewProject(project, currProject)
      .subscribe((response) => {
        if (isNew) {
          this.projectArray[0].push(response);
          this.projects$.next(Object.assign([], this.projectArray[0]));
          return;
        } else {
          let tempArr = this.projectArray[0].find(
            (el: Project) => el.id === currProject
          );
          tempArr.todos.push(plainToInstance(Todo, response[0]));
          this.projectArray[0][tempArr] = tempArr;
          this.projects$.next(Object.assign([], this.projectArray[0]));
          return;
        }
      });
  }
}
