import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from './project-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _project = new BehaviorSubject<any>([]);
  private _projects$ = this._project.asObservable();
  getProjectList(): Observable<Project[]> {
    console.log(this._projects$);
    return this._projects$;
  }
  setProjectList(projectList: any): Observable<unknown> {
    this._project.next(projectList);
    return this._projects$;
  }
  addProjectToList(project: any): Observable<any> {
    this._project.next(this._project.getValue().concat([project]));
    return this._project;
  }
}
