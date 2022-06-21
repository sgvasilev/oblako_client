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
}
