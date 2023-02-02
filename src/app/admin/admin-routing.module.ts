import { NgModule} from '@angular/core'
import { Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';
import { CategoryComponent } from './category/category.component';

const route : Route[] = [
    {path : 'admin', component : AdminComponent, children : [
        { path : 'category', component : CategoryComponent},
        { path : 'blog', component : BlogComponent , children : [
            {path : '' , component : BlogListComponent},
            {path : 'add' , component : BlogEditComponent},
            {path : ':id' , component : BlogDetailComponent},
            {path : ':id/edit' , component : BlogEditComponent}
        ]}
    ]}
];

@NgModule({
    imports : [
        RouterModule.forChild(route)
    ],
    exports : [
        RouterModule
    ]
})

export class AdminRoutingModule {}