import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categories : Category[];
  
  constructor(private categoryService : CategoryService){
    this.categoryService.getAllCategory().subscribe(resp => {
      this.categories = resp;
    });

    this.categoryService.categoriesChanged.subscribe(res => {
      this.categoryService.getAllCategory().subscribe(resp => {
        this.categories = resp;
      });
    })
  }

  ngOnInit(): void {
    
  }

  onItemSelected(id : number){
    this.categoryService.catEditStarted.next(id);
  }

  deleteCategory(id : number){

  }
}
