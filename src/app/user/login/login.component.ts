import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  @ViewChild('form') lForm : NgForm

  constructor(private userService : UserService, private dialogRef : MatDialogRef<LoginComponent>) {}

  logIn(form : NgForm){
    this.userService.logIn(form.value.email, form.value.password).subscribe(res => {
      this.dialogRef.close();
    });
  }
}
