import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { map, mergeMap, Observable, pipe, Subscription, switchMap } from 'rxjs';
import { Project as ProjectModel } from '../model/project.model';
import { Todo as Todomodel } from '../model/todo.model';
import { Project, ProjectApiService, Todo } from '../project-api.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  projectsList: Project[] = [];
  private subscription: Subscription;

  constructor(
    private projectsApiService: ProjectApiService,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.projectsApiService
      .getListOfProjects()
      .subscribe(
        (el) => (
          (this.projectsList = el),
          this.projectService.setProjectList(this.projectsList)
        )
      );
    this.subscription = this.projectService
      .getProjectList()
      .subscribe((el) => ((this.projectsList = el), console.log(el)));
  }
  changeStatus(project: Project, p: Todo): void {
    const { id } = project;
    const todoId = p.id;
    let { isCompleted } = p;
    if (id && todoId)
      this.projectsApiService
        .changeStatus(id, !isCompleted, todoId)
        .subscribe();
  }
  // getProjectList(): any {
  //   this.projectsList = this.projectService.getProjectList();
  // }
}
