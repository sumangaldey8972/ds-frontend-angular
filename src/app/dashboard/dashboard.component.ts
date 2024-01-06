import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  empList = [
    {
      employee_id: 'EMP ID 124',
      name: 'Sumangal',
      email: 'sd@gmail.com',
      phone: 850952889,
      designation: 'Developer',
      Salary: 25000,
    },
    {
      employee_id: 'EMP ID 124',
      name: 'Sumangal',
      email: 'sd@gmail.com',
      phone: 850952889,
      designation: 'Developer',
      Salary: 25000,
    },
    {
      employee_id: 'EMP ID 124',
      name: 'Sumangal',
      email: 'sd@gmail.com',
      phone: 850952889,
      designation: 'Developer',
      Salary: 25000,
    },
    {
      employee_id: 'EMP ID 124',
      name: 'Sumangal',
      email: 'sd@gmail.com',
      phone: 850952889,
      designation: 'Developer',
      Salary: 25000,
    },
    {
      employee_id: 'EMP ID 124',
      name: 'Sumangal',
      email: 'sd@gmail.com',
      phone: 850952889,
      designation: 'Developer',
      Salary: 25000,
    },
    {
      employee_id: 'EMP ID 124',
      name: 'Sumangal',
      email: 'sd@gmail.com',
      phone: 850952889,
      designation: 'Developer',
      Salary: 25000,
    },
  ];
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  public createEmployee(): void {
    this._dialog.open(CreateEmployeeComponent, {
      disableClose: true,
      autoFocus: false,
      maxWidth: '100%',
    });
  }
}
