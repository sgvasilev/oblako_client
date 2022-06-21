import {
  Component,
  EventEmitter,
  Injectable,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project, ProjectApiService } from '../project-api.service';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project as ProjectModel } from '../model/project.model';
import { classToPlain, instanceToPlain, plainToClass } from 'class-transformer';

@Component({
  selector: 'app-modal',

  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  projects: string[] = ['Новый проект'];
  selected = this.projects[0];
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private modalRef: MatDialogRef<ModalComponent>,
    private projectApiService: ProjectApiService
  ) {}

  ngOnInit() {
    this.projectService.getProjectList().subscribe((el) => {
      el.forEach((element: Project) => {
        this.projects.push(element.title);
      });
      this.form = new FormGroup({
        newTodo: new FormControl('', Validators.required),
        newProject: new FormControl('', Validators.required),
        currProject: new FormControl('', Validators.required),
      });
    });
  }
  close() {
    this.modalRef.close();
  }
  save() {
    const data = { ...this.form.value };
    console.log(data);
  }
  choose($event: any) {
    this.selected = $event.value;
    this.selected !== 'Новый проект'
      ? this.form.get('newProject')?.clearValidators()
      : this.form.get('newProject')?.setValidators([Validators.required]);
    this.form.get('newProject')?.updateValueAndValidity();
  }
  submit() {
    if (!this.form.valid) return;
    const { currProject, newProject, newTodo } = this.form.value;
    if (currProject === 'Новый проект') {
      let result: {};
      const createdProject = new ProjectModel();
      createdProject.Title = newProject;
      createdProject.Todos = newTodo;
    }

    this.close();
  }
}
