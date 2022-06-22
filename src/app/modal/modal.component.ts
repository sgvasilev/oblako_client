import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project as ProjectModel } from '../model/project.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  titles: Observable<Array<Array<string | number>>> =
    this.projectService.titles;
  selected = 0;
  constructor(
    private projectService: ProjectService,
    private modalRef: MatDialogRef<ModalComponent>
  ) {}

  ngOnInit() {
    this.projectService.loadTitles();
    this.form = new FormGroup({
      newTodo: new FormControl('', Validators.required),
      newProject: new FormControl('', Validators.required),
      currProject: new FormControl('', Validators.required),
    });
  }
  close() {
    this.modalRef.close();
  }

  choose($event: any) {
    this.selected = $event.value;
    this.selected !== 0
      ? this.form.get('newProject')?.clearValidators()
      : this.form.get('newProject')?.setValidators([Validators.required]);
    this.form.get('newProject')?.updateValueAndValidity();
  }
  submit() {
    if (!this.form.valid) return;
    let isNew = true;
    const { currProject, newProject, newTodo } = this.form.value;
    const createdProject = new ProjectModel();
    createdProject.Title = newProject;
    createdProject.Todos = newTodo;
    if (currProject === 0) {
      this.projectService.createProject(createdProject, isNew, currProject);
    } else {
      isNew = !isNew;
      this.projectService.createProject(createdProject, isNew, currProject);
    }
    this.close();
  }
}
