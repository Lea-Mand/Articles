import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Employee } from '../models/employee.model';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private _userService: UsersService, private _router: Router) { }

  ngOnInit(): void {
  }
  langChoice = 1;

  translateValues = [
    ["Sigh up ", "הירשם"],
    ["", ""],
    ["", ""],
    ["Email", "מייל"],
    ["", ""],
    ["Password", "סיסמא"],
    ["", ""],
    ["This field is required", "שדה חובה"],
    ["Login", "כניסה"],
    [" If don't have an account", "?אין לך חשבון"],
    ["Forgot password?","?שכחת סיסמא"]
  ];

  
  selectLang = () => {
    if (this.langChoice == 0) {
      this.langChoice = 1;
    }
    else
      this.langChoice = 0;
  }

  validatePasswordConfirmation(): any {
    let valid = true;
    if (this.signInForm.controls.password != this.signInForm.controls.confirmPass) {
      valid = false;
      this.signInForm.controls.confirmPass.setErrors({ validatePasswordConfirmation: true });
    }
    return valid;
  }

  signInForm: FormGroup = new FormGroup({
    "email": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required]),
  });

  password(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const repeat_password = formGroup.get('repeat-password');
    return password === repeat_password ? null : { passwordNotMatch: true };
  }

  login = async () => {
    let user: User = this.signInForm.value;
    return await this._userService.getUserByEmailPassword(user).subscribe((data) => {
      if (data != null)
        this._router.navigate(["/show"])
      else
        this._router.navigate(["/signin"])

    });
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