import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  department: string;
  salary: number;
}

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.css'
})
export class EmployeeDialogComponent {

  @Input() employeeData: Employee | null = null;
  @Input() isEditMode = false;

  @Output() employeeAdded = new EventEmitter<Employee>();
  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() dialogClosed = new EventEmitter<void>();

employee: Employee = {
  id: 0,
  name: '',
  phoneNumber: '',
  email: '',
  department: '',
  salary: 0
};

  ngOnInit(): void {
    if (this.employeeData) {
      this.employee = { ...this.employeeData };
    }
  }

  submitEmployee(): void {

    if (this.isEditMode) {
      this.employeeUpdated.emit(this.employee);
    } else {
      this.employeeAdded.emit(this.employee);
    }

  }

  close(): void {
    this.dialogClosed.emit();
  }
}