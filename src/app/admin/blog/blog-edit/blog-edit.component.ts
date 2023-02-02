import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MyUploadAdapter } from 'src/app/uploadadapter';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent {
  public Editor = ClassicEditor;
  blogForm : FormGroup;
  categories : Category[];
  filteredOptions : Observable<Category[]>;
  editId : number;
  editMode : boolean = false;

  onReady(editor): void {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new MyUploadAdapter( loader );
    };
  }

  constructor(private categoryService : CategoryService, private blogService : BlogService,
              private router : Router , private route : ActivatedRoute){
    this.categories = categoryService.categories;
  }

  ngOnInit(): void {
    
    this.route.params.subscribe((param : Params) => {
      let id = param['id'];
      if(id){
        this.editMode = true;
        this.editId = id;
      }
      this.initForm();
    });

  }

  initForm(){

    let title = '',category = 1,content = '', thumbnail = '', description = '';
    let tags = new FormArray<FormGroup>([]);

    if(this.editMode) {
      this.blogService.getBlogById(this.editId).subscribe(res => {
        
        title = res.title;
        category = res.category;
        content = res.content;
        thumbnail = res.thumbnail;
        description = res.description

        if(res['tags']){
          for(let tag of res.tags){
            tags.push(new FormGroup({
              tag : new FormControl(tag.tag)
            }));
          }
        }
      
        this.blogForm = new FormGroup(
          { 
            id : new FormControl(1),
            title : new FormControl(title),
            category : new FormControl(category),
            content : new FormControl(content),
            thumbnail : new FormControl(thumbnail),
            description : new FormControl(description),
            tags : tags
          }
        );
        this.filteredOptions = this.blogForm.get('category').valueChanges.pipe(
          startWith(''),
          map(value => {
            return this.categories.filter(item => {
              return item.name.toLowerCase().includes(value);
            })
          })
        );

      });
    }
    else {
      this.blogForm = new FormGroup(
        { 
          id : new FormControl(1),
          title : new FormControl(title),
          category : new FormControl(category),
          content : new FormControl(content),
          thumbnail : new FormControl(thumbnail),
          description : new FormControl(description),
          tags : tags
        }
      );

      this.filteredOptions = this.blogForm.get('category').valueChanges.pipe(
        startWith(''),
        map(value => {
          return this.categories.filter(item => {
            return item.name.toLowerCase().includes(value);
          })
        })
      );
    }
  }

  onSubmit(){

    if(this.editMode){
      this.blogService.updateBlog(this.editId, this.blogForm.value);
    }else {
      this.blogService.addBlog(this.blogForm.value);
    }
    this.viewList();
  }

  displayFn(id : number){
    //return this.categoryService.getCategoryById(id)
    return this.categories.find(ele => ele.id == id).name;
  }

  viewList(){
    this.router.navigate(['admin','blog']);
  }

  get controls(){
    return (<FormArray>this.blogForm.get('tags')).controls;
  }

  addTag(){
    (<FormArray>this.blogForm.get('tags')).push(new FormGroup({
      tag : new FormControl('')
    }));
  }

  removeTag(index : number){
    (<FormArray>this.blogForm.get('tags')).removeAt(index);
  }
}
