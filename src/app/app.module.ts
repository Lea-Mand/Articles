import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditEmployeeListComponent } from './edit-employee-list/edit-employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'show', component: EmployeesListComponent },
  { path: 'edit', component: EditEmployeeListComponent },
  { path: '', component: LogInComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    EmployeesListComponent,
    EditEmployeeListComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
