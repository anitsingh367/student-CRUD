import { CreateStudentDialogComponent } from './create-student-dialog/create-student-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student, StudentDetail } from './models/StudentDetailModel';
import { Gender } from './models/GenderEnum';
import { MatTable } from '@angular/material/table';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  studentData: StudentDetail[];
  classNumber: string;
  columnsToDisplay = [
    'id',
    'name',
    'email',
    'username',
    'password',
    'gender',
    'operations',
  ];

  @ViewChild(MatTable) table: MatTable<Student>;

  constructor(private dialog: MatDialog) {
    this.studentData = [
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
      new Student(
        'Anit Singh',
        'anitsingh367@gmail.com',
        'anitsingh367',
        'jkhsdjkfbdf',
        'Male'
      ),
    ];
  }
  ngOnInit() {}
  addStudent = () => {
    /*
     * Open a dialog
     * Take user input via form
     * Subscribe to Dialog close
     * Store user input in studentData array
     * Render the table
     */
    let dialogRef = this.dialog.open(CreateStudentDialogComponent, {
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        map((student: StudentDetail) => {
          if (student) student.gender = Gender[student?.gender];
          return student;
        })
      )
      .subscribe((res: StudentDetail) => {
        if (res) {
          this.studentData = [
            ...this.studentData,
            new Student(
              res.name,
              res.email,
              res.username,
              res.password,
              res.gender
            ),
          ];
          this.table.renderRows();
        }
      });
  };
  updateUser = (oldStudentData: StudentDetail) => {
    /*
     * Find the student with the provided id
     * Open the dialog with the details of the student with the specified id
     * Get data on close and
     * update the array with the new value
     * Render the table
     */
    let dialogRef = this.dialog.open(CreateStudentDialogComponent, {
      data: oldStudentData,
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        map((updatedStudent: StudentDetail) => {
          if (updatedStudent)
            updatedStudent.gender = Gender[updatedStudent?.gender];
          return updatedStudent;
        })
      )
      .subscribe((updatedStudent: StudentDetail) => {
        if (updatedStudent) {
          this.studentData.map((student, index) => {
            if (student.id === updatedStudent.id) {
              this.studentData[index] = updatedStudent;
            }
          });
          this.table.renderRows();
        }
      });
  };
  deleteUser = (studentToDelete) => {
    this.studentData.map((student, index) => {
      if (student.id === studentToDelete.id) {
        this.studentData.splice(index, 1);
      }
      this.table.renderRows();
    });
    /**
     * Find the student with the provided id
     * Confirm if the user wants to delete the record
     * if yes, delete the user from the array
     * Render the table
     */
  };
}
