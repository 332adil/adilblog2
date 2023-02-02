import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') pForm : NgForm;

  constructor(private userService : UserService,
             @Inject(MAT_DIALOG_DATA) public data : { id : number},
             private dialogRef : MatDialogRef<ProfileComponent>) {}

  ngOnInit(): void {
    if(this.data.id){
      this.userService.getUserById(this.data.id).subscribe(user => {
        this.pForm.setValue({
          name : user.name,
          email : user.email,
          contact : user.contact,
          password : user.password,
          age : user.age,
          image : user.image
        })
      });
    }
  }

  saveProfile(form : NgForm){
    console.log(this.data.id);
    if(this.data.id > 0){
      this.userService.updateUser(this.data.id, form.value);
    }else{
      this.userService.addUser(form.value);
    }
    this.dialogRef.close();
  }
}
