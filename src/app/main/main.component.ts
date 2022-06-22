import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectApiService, Todo } from '../project-api.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  projects: Observable<Project[]> = this.projectService.projects;

  constructor(
    private projectsApiService: ProjectApiService,
    private projectService: ProjectService
  ) {}

  changeStatus(project: Project, p: Todo): void {
    const { id } = project;
    const todoId = p.id;
    let { isCompleted } = p;
    if (id && todoId)
      this.projectsApiService
        .changeStatus(id, !isCompleted, todoId)
        .subscribe();
  }
  deleteTodo(todoId: number, projectId: number) {
    this.projectService.deleteTodo(todoId, projectId);
  }
  deleteProject(id: number) {
    this.projects
      .subscribe((el: Array<any>) => {
        let result = el.findIndex((idx: any) => {
          return idx.id === id;
        }, id);
        result++;
        this.projectService.deleteProject(result, id);
      })
      .unsubscribe();
  }
}
