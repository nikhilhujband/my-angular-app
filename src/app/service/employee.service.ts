import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  department: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      phoneNumber: '9876543210',
      email: 'rahul.sharma@gmail.com',
      department: 'IT',
      salary: 65000
    },
    {
      id: 2,
      name: 'Priya Patil',
      phoneNumber: '9876543211',
      email: 'priya.patil@gmail.com',
      department: 'HR',
      salary: 55000
    },
    {
      id: 3,
      name: 'Amit Deshmukh',
      phoneNumber: '9876543212',
      email: 'amit.deshmukh@gmail.com',
      department: 'Finance',
      salary: 60000
    },
    {
      id: 4,
      name: 'Sneha Joshi',
      phoneNumber: '9876543213',
      email: 'sneha.joshi@gmail.com',
      department: 'IT',
      salary: 72000
    },
    {
      id: 5,
      name: 'Vikas Kulkarni',
      phoneNumber: '9876543214',
      email: 'vikas.kulkarni@gmail.com',
      department: 'Sales',
      salary: 50000
    },
    {
      id: 6,
      name: 'Neha Shah',
      phoneNumber: '9876543215',
      email: 'neha.shah@gmail.com',
      department: 'Marketing',
      salary: 58000
    },
    {
      id: 7,
      name: 'Rohit More',
      phoneNumber: '9876543216',
      email: 'rohit.more@gmail.com',
      department: 'IT',
      salary: 68000
    },
    {
      id: 8,
      name: 'Anjali Singh',
      phoneNumber: '9876543217',
      email: 'anjali.singh@gmail.com',
      department: 'HR',
      salary: 52000
    },
    {
      id: 9,
      name: 'Karan Mehta',
      phoneNumber: '9876543218',
      email: 'karan.mehta@gmail.com',
      department: 'Finance',
      salary: 63000
    },
    {
      id: 10,
      name: 'Pooja Verma',
      phoneNumber: '9876543219',
      email: 'pooja.verma@gmail.com',
      department: 'Sales',
      salary: 54000
    }
  ];

  getEmployees(): Employee[] {
    return this.employees;
  }
}