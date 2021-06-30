import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../bootstrap.css', './sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // constructor() { }
  constructor(private modalService: NgbModal, private _userService: UsersService, private _route: Router) { }


  ngOnInit(): void {
  }

  langChoice = 1;

  translateValues = [
    ["Personal Details", "פרטים אישיים"],
    ["First Name", "שם פרטי"],
    ["Last Name", "שם משפחה"],
    ["Email", "אימייל"],
    ["Password", "סיסמא"],
    ["Verify password", "אימות סיסמא"],
    ["This field is required", "שדה חובה"],
    ["Insert a valid email", "הכנס אימייל תקין"],
    ["Sign in", "להרשמה"]
  ];

  selectLang = () => {
    if (this.langChoice == 0) {
      this.langChoice = 1;
    }
    else
      this.langChoice = 0;
  }

  signInForm: FormGroup = new FormGroup({
    "firstName": new FormControl("", [Validators.required]),
    "lastName": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required]),
    "repeat_password": new FormControl("", [Validators.required])

  });

  password(password: string, repeat_password: string) {
    return password === repeat_password ? true : false;
  }

  addNewUser = async () => {
    let user: User = this.signInForm.value;
    user.id = user.firstName + user.lastName;
    debugger
    let ans = this.password(this.signInForm.controls.password.value, this.signInForm.controls.repeat_password.value);
    if (ans) {
      await this._userService.postUserToSrever(user).subscribe();
      console.log("added");
      this._route.navigate(["/show"])
    }
    else{
      alert("אימות הסיסמא לא תקין")
    }
  }


  changeType = (pas: HTMLInputElement, img: HTMLImageElement) => {
    if (pas.type == "password") {
      pas.type = "text";
      img.src = "../../assets/Images/view-1.png";
    }
    else {
      pas.type = "password";
      img.src = "../../assets/Images/view-0.png";
    }
  }
}

