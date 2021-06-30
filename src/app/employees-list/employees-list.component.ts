import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from '../employees.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css', '../bootstrap.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];
  selectedEmployee!: Employee;
  flags: boolean = false;

  constructor(private modalService: NgbModal, private _employeeService: EmployeesService) {
    this._employeeService.getemployeeFromServer().subscribe(data => {
      data.forEach((element) => {
        this.employees.push(element);
      })
    })
  }

  ngOnInit(): void {
  }

  private _employee: Employee = { id: "", firstName: "", lastName: "", address: "", phone: "", role: "--", startDate: '--', image: '--' };

  employeeForm = new FormGroup({
    "firstName": new FormControl(this._employee.firstName, [Validators.required, Validators.minLength(3)]),
    "lastName": new FormControl(this._employee.lastName, Validators.required),
    "phone": new FormControl(this._employee.phone, [Validators.maxLength(10), Validators.minLength(9)]),
    "address": new FormControl(this._employee.address),
    "role": new FormControl(this._employee.role),
  });

  @Input()
  public set employee(value: Employee) {

    this._employee = value;
    if (this._employee != undefined) {
      this.employeeForm = new FormGroup({
        "firstName": new FormControl(this._employee.firstName, [Validators.required, Validators.minLength(3)]),
        "lastName": new FormControl(this._employee.lastName, Validators.required),
        "phone": new FormControl(this._employee.phone, [Validators.maxLength(10), Validators.minLength(9)]),
        "startDate": new FormControl(this._employee.startDate),
        "address": new FormControl(this._employee.address),
        "role": new FormControl(this._employee.role),
      });
    }
  };

  @Output
    () onSaveEmployee: EventEmitter<Employee> = new EventEmitter();


  delete(employee: Employee) {
    let indexToDelete = this.employees.indexOf(employee);
    this.employees.splice(indexToDelete, 1);
  }

  edit(employee: Employee, content: TemplateRef<any>) {
    this.selectedEmployee = employee;
    console.log(this.selectedEmployee)
    this.open(content);
  }

  AddNewEmployee = async (modal: any) => {
    console.log(this.employeeForm);
    let emp: Employee = this.employeeForm.value;
    let d = new Date();
    emp.startDate = String(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
    this.employees.push(emp);
    console.log(this.employees);
    await this._employeeService.postemployeeFromServer(emp).subscribe();
    modal.dismiss('Cross click');
  }

  saveEmployee(employeeToAdd: Employee) {
    let index = this.employees.findIndex(s => s.firstName == employeeToAdd.firstName);
    if (index != -1)
      this.employees[index] = employeeToAdd;
    else
      this.employees.push(employeeToAdd);
  }

  closeResult = '';

  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
