import { Component, OnInit } from '@angular/core';
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


export class EmployeeComponent implements OnInit {

showDialog = false;
isEditMode = false;
selectedEmployee: Employee | null = null;

employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
}

 ngOnInit(): void {
  this.employeeService.getEmployees().subscribe({
    next: (data) => {
      this.employees = data;
    },
    error: (error) => {
      console.error('Error loading employees:', error);
    }
  });
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
    return `
      <button class="btn btn-sm btn-primary me-2" data-action="edit">
        Edit
      </button>
      <button class="btn btn-sm btn-danger" data-action="delete">
        Delete
      </button>
    `;
  },

  onCellClicked: (params: any) => {

    const action = params.event.target.getAttribute('data-action');

    if (action === 'edit') {
      this.editEmployee(params.data);
    }

    if (action === 'delete') {
      this.deleteEmployee(params.data.id);
    }
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

  this.employeeService.addEmployee(employee).subscribe({
    next: (newEmployee) => {
      this.employees = [...this.employees, newEmployee];
      this.showDialog = false;
    },
    error: (error) => {
      console.error('Error adding employee:', error);
    }
  });

}

updateEmployee(updatedEmployee: Employee): void {

  this.employeeService.updateEmployee(updatedEmployee).subscribe({
    next: (updatedEmployeeFromApi) => {

      this.employees = this.employees.map(employee =>
        employee.id === updatedEmployeeFromApi.id
          ? updatedEmployeeFromApi
          : employee
      );

      this.showDialog = false;
      this.selectedEmployee = null;
      this.isEditMode = false;
    },

    error: (error) => {
      console.error('Error updating employee:', error);
    }
  });
}

deleteEmployee(id: number): void {

  this.employeeService.deleteEmployee(id).subscribe({
    next: () => {

      // Reload employees from API
      this.employeeService.getEmployees().subscribe({
        next: (data) => {
          this.employees = data;
        },
        error: (error) => {
          console.error('Error loading employees:', error);
        }
      });

    },

    error: (error) => {
      console.error('Error deleting employee:', error);
    }
  });

}
}
