import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,AgGridAngular,EmployeeDialogComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})


export class EmployeeComponent {

showDialog = false;
isEditMode = false;
selectedEmployee: Employee | null = null;

employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

columnDefs: ColDef[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email' },
  { field: 'department', headerName: 'Department' },
  { field: 'salary', headerName: 'Salary' },

  {
    headerName: 'Action',
    cellRenderer: () => {
      return '<button class="btn btn-sm btn-primary">Edit</button>';
    },
    onCellClicked: (params: any) => {
      this.editEmployee(params.data);
    }
  }
];

openDialog(): void {
  this.selectedEmployee = null;
  this.isEditMode = false;
  this.showDialog = true;
}

editEmployee(employee: Employee): void {
  this.selectedEmployee = { ...employee };
  this.isEditMode = true;
  this.showDialog = true;
}

closeDialog(): void {
  this.showDialog = false;
}

addEmployee(employee: Employee): void {

  const newEmployee = {
    ...employee,
    id: this.employees.length + 1
  };

  this.employees = [...this.employees, newEmployee];

  this.showDialog = false;
}

updateEmployee(updatedEmployee: Employee): void {

  this.employees = this.employees.map(employee =>
    employee.id === updatedEmployee.id
      ? updatedEmployee
      : employee
  );

  this.showDialog = false;
  this.selectedEmployee = null;
  this.isEditMode = false;
}
}
