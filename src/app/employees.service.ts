import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  _http!: HttpClient;

  constructor(private http: HttpClient) {
    this._http = http;
  }

  getemployeeFromServer = (): Observable<Employee[]> => {
    return this._http.get<Employee[]>("/employees")
  }

  postemployeeFromServer = (employee: Employee): Observable<Employee> => {
    return this._http.post<Employee>("/employees", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(employee),
    });
  }

  editEmployee = (employee: Employee): Observable<Employee> => {
    return this._http.put<Employee>("/employees", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(employee),
    })
  }
  deleteEmployee = (employee: Employee): Observable<any> => {
    return this._http.request('delete', "/employees/" + employee.id);
  }
}