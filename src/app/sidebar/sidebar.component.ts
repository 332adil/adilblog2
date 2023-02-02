import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../user/login/login.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  isAuthenticated : boolean = false;
  userPhoto : string = "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png";
  userName : string = "User";
  userId : number;
  constructor(private dialog : MatDialog, private userService : UserService){
    this.userService.userChanged.subscribe(user => {
      this.isAuthenticated = user ? true : false;
      this.userPhoto = user.image;
      this.userName = user.name;
      this.userId = user.id;
      
    });
  }

  ngOnInit(): void {
    
  }

  openProfile(){
    this.dialog.open(ProfileComponent,{
      width : '650px',
      height : '750px',
      data : { id : this.userId}
    });
  }

  newUser(){
    this.dialog.open(ProfileComponent,{
      width : '650px',
      height : '750px',
      data : { id : 0}
    });
  }

  doLogin(){
    this.dialog.open(LoginComponent, {
      width : '500px',
      height : '400px'
    });
  }

  doLogout(){
    this.userPhoto = "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png";
    this.userName = "User";
    this.userId = 0;
    this.userService.logOut();
  }
}
