import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { forkJoin, Subject, tap } from 'rxjs';

@Injectable()
export class UserService {

    userChanged = new Subject<User>();
    userId : number;

    constructor(private http : HttpClient){}

    addUser(user : User){
        this.http.post("http://localhost:3000/user",user).subscribe();
    }

    updateUser(id : number, user : User){

        this.http.patch("http://localhost:3000/user/"+id, user).subscribe();
        user.id = id;
        localStorage.setItem("user", JSON.stringify(user));
        this.userChanged.next(user);
        this.userId = user.id;
    }

    getAllUsers(){
        return this.http.get<User[]>("http://localhost:3000/user");
    }

    logIn(email : string, password : string){
        return this.http.get<User>("http://localhost:3000/user?email="+email+"&password="+password)
        .pipe(
            tap(res => {
                this.handleUserData(res[0]);
            })
        );
    }

    logOut(){
        this.userChanged.next(null);
        localStorage.removeItem("user");
    }

    autoLogin(){
        const userObj : User = JSON.parse(localStorage.getItem("user"));
        this.userChanged.next(userObj);
        this.userId = userObj.id;
    }

    getUserById(id : number){
        return this.http.get<User>("http://localhost:3000/user/"+id);
    }

    handleUserData(user : User){
        localStorage.setItem("user", JSON.stringify(user));
        this.userChanged.next(user);
        this.userId = user.id;
    }
}