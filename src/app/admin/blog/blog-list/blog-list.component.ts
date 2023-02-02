import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{

  blogs : Blog[];

  constructor(private blogService : BlogService, private router : Router , private route : ActivatedRoute) {
    blogService.getAllBlogs().subscribe(res => {
      this.blogs = res;
    });

    blogService.blogChanged.subscribe(res => {
      blogService.getAllBlogs().subscribe(res => {
        this.blogs = res;
      });
    })
  }

  ngOnInit(): void {
    //this.blogs = this.blogService.getAllBlogs();
  }

  addBlog(){
    this.router.navigate(['add'], {relativeTo : this.route});
  }

  editBlog(id : number, event){
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate([id,'edit'], {relativeTo : this.route});
  }

  deleteBlog(id : number, event){
    event.preventDefault();
    event.stopPropagation();
    this.blogService.deleteBlog(id);
  }

}
