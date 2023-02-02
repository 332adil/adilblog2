import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core'
import { Subject } from 'rxjs';
import { Category } from './category.model'

@Injectable()
export class CategoryService {

    catEditStarted = new Subject<number>();
    categoriesChanged = new Subject<string>();

    constructor(private http : HttpClient){}

    categories : Category[] = [
        new Category(1,"Science","https://cdn-icons-png.flaticon.com/512/1046/1046269.png"),
        new Category(2,"Medical","https://www.jjmmc.org/images/portfolio/2.jpg"),
        new Category(3,"Sports","https://cdn.firstcry.com/education/2022/04/24114827/1026630514.jpg")
    ];

    getAllCategory(){
        return this.http.get<Category[]>("http://localhost:3000/category");
    }

    addCategory(category : Category){
        this.http.post(
            "http://localhost:3000/category",
            category
        ).subscribe();
        this.categoriesChanged.next("");
        //this.categories.push(category);
        //this.categoriesChanged.next(this.categories.slice());
    }

    updatedCategory(id : number, category : Category){
         this.http.patch("http://localhost:3000/category/"+id,category).subscribe();
         this.categoriesChanged.next("");
    }

    deleteCategory(id : number){
        this.http.delete("http://localhost:3000/category/"+id).subscribe();
        this.categoriesChanged.next("");
    }

    getCategoryNameById(id : number){
        let name = '';
        this.http.get<Category>("http://localhost:3000/category/"+id).subscribe(res => {
            name = res.name;
        });
        return name;
    }

    getCategoryById(id : number){
        return this.http.get<Category>("http://localhost:3000/category/"+id);
    }
}