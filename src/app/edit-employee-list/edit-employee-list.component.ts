import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from '../employees.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-edit-employee-list',
  templateUrl: './edit-employee-list.component.html',
  styleUrls: ['./edit-employee-list.component.css', '../bootstrap.css']
})

export class EditEmployeeListComponent implements OnInit {
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

  private _employee: Employee = { id: "", firstName: "", lastName: "", address: "", phone: "", role: "--", startDate: '--', image: "--" };

  employeeForm = new FormGroup({
    "firstName": new FormControl(this._employee.firstName, [Validators.required, Validators.minLength(3)]),
    "lastName": new FormControl(this._employee.lastName, Validators.required),
    "phone": new FormControl(this._employee.phone, [Validators.maxLength(10), Validators.minLength(9)]),
    "address": new FormControl(this._employee.address),
    "role": new FormControl(this._employee.role),
    "image": new FormControl(this._employee.image)
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
        "image": new FormControl(this._employee.image)
      });
    }
  };

  changeImg = (img: HTMLInputElement) => {
    console.log(img.files);
    this._employee.image = img.files![0]!.name;
  }

  @Output
    () onSaveEmployee: EventEmitter<Employee> = new EventEmitter();

  saveNewEmployee() {
    this._employee.firstName = this.employeeForm.value.firstName;
    this._employee.lastName = this.employeeForm.value.lastName;
    this._employee.phone = this.employeeForm.value.phone;
    this._employee.startDate = this.employeeForm.value.id;
    this._employee.address = this.employeeForm.value.address;
    this._employee.role = this.employeeForm.value.role;
    this.onSaveEmployee.emit(this._employee);
    alert("New employee add succfully")
  }

  delete = async (employee: Employee) => {
    let indexToDelete = this.employees.indexOf(employee);
    this.employees.splice(indexToDelete, 1);
    await this._employeeService.deleteEmployee(employee).subscribe();
  }

  edit(employee: Employee, content: TemplateRef<any>) {
    this.selectedEmployee = employee;
    console.log(this.selectedEmployee)
    this.open(content);

  }

  updateEmployee = async (modal: any) => {
    let emp: Employee = this.employeeForm.value;
    await this._employeeService.editEmployee(emp).subscribe();
    this.employees = [];
    this._employeeService.getemployeeFromServer().subscribe(data => {
      data.forEach((element) => {
        this.employees.push(element);
      })
    })
    modal.dismiss('Cross click');
  }

  AddNewEmployee = async (modal: any) => {
    console.log(this.employeeForm);
    let emp: Employee = this.employeeForm.value;
    let d = new Date();
    emp.startDate = String(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
    emp.image = this._employee.image;
    this.employees.push(emp);
    console.log(this.employees);
    await this._employeeService.postemployeeFromServer(emp).subscribe();
    modal.dismiss('Cross click');
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