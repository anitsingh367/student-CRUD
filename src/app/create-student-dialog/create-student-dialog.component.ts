import { StudentDetail } from './../models/StudentDetailModel';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gender } from '../models/GenderEnum';

@Component({
  selector: 'app-create-student-dialog',
  templateUrl: './create-student-dialog.component.html',
  styleUrls: ['./create-student-dialog.component.scss'],
})
export class CreateStudentDialogComponent implements OnInit {
  studentForm: FormGroup = this.form.group({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StudentDetail,
    private form: FormBuilder,
    private dialogRef: MatDialogRef<StudentDetail>
  ) {}

  ngOnInit() {
    if (this.data) {
      this.studentForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        username: this.data.username,
        password: this.data.password,
        gender: Gender[this.data.gender],
      });
    }
  }
  onSubmit = () => {
    if (this.data)
      this.dialogRef.close({ id: this.data.id, ...this.studentForm.value });
    else this.dialogRef.close(this.studentForm.value);
  };
}
