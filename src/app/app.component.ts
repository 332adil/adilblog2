import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'blog';

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userService.autoLogin();
    }, 100);
    
  }
}
