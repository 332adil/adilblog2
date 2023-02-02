import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CategoryComponent } from './category/category.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryService } from './category/category.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogComponent } from './blog/blog.component';
import { BlogService } from './blog/blog.service';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { SharedModule } from '../shared/shared.module';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    CategoryComponent,
    CategoryEditComponent,
    BlogComponent,
    BlogListComponent,
    BlogEditComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    SharedModule,
    HttpClientModule
  ], 
  exports : [
    AdminComponent,
    RouterModule
  ], 
  providers : [
    CategoryService,
    BlogService
  ]
})
export class AdminModule { }
