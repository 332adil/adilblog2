import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IdGenerator } from 'src/app/shared/id-generator';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent  {
  @Input() index : number;
  @ViewChild('f') cForm : NgForm;
  editMode : boolean = false;
  editIndex : number;
  

  constructor(private categoryService : CategoryService) {
    categoryService.catEditStarted.subscribe(id => {
      categoryService.getCategoryById(id).subscribe(res => {
        this.editMode = true;
        this.cForm.setValue({
          "id" : res.id,
          "name" : res.name,
          "image" : res.image
        });
      });
    })
  }

  onSubmit(form : NgForm){

    if(this.editMode){
      
      this.categoryService.updatedCategory(this.cForm.value.id, this.cForm.value);
    }else{
      this.categoryService.addCategory(this.cForm.value);
    }
    this.clearForm();
  }

  clearForm(){
    this.editMode = false;
    this.cForm.resetForm();
  }
}
