import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Blog } from './blog.model';
import { Comments } from './comment.model';

@Injectable()
export class BlogService {

    blogs : Blog[] = [];
    blogChanged = new Subject<string>();
    commentChanged = new Subject<Comments[]>();

    constructor(private http : HttpClient) {}

    getAllBlogs(){
        return this.http.get<Blog[]>("http://localhost:3000/blog");
    }

    addBlog(blog : Blog){
        delete blog.id;

        this.http.post("http://localhost:3000/blog",blog).subscribe();
        this.blogChanged.next("");
    }

    getBlogById(id : number){
       return this.http.get<Blog>("http://localhost:3000/blog/"+id);
    }

    deleteBlog(id : number){
        this.http.delete("http://localhost:3000/blog/"+id).subscribe();
        this.blogChanged.next("");
    }

    updateBlog(id : number, blog : Blog){
        console.log(blog);
        this.http.patch("http://localhost:3000/blog/"+id, blog).subscribe();
    }

    addComment(comment : Comments){
        this.http.post("http://localhost:3000/comment", comment).subscribe(res => {
            console.log(res);
        });
        //this.commentChanged.next();
    }

    getCommentsByBlog(blogId : number){
        return this.http.get<Comments[]>("http://localhost:3000/comment?blog_id="+blogId);
    }

    getRelatedBlogs(id : number){
        return this.http.get<Blog[]>("http://localhost:3000/blog?id_ne="+id);
    }
}