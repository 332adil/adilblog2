import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';
import { CommentList } from '../comment-list.model';
import { Comments } from '../comment.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit{

  blog : Blog;
  blogId : number;
  blogComments : CommentList[];
  relatedBlogs : Blog[];
  @ViewChild('comment') cmt : ElementRef;

  constructor(private blogService : BlogService,
              private route : ActivatedRoute,
              private userService : UserService,
              private router : Router) {}

  ngOnInit(): void {

    this.route.params.subscribe((param : Params) => {
      let id = param['id'];
      this.blogId = id;
      this.blogService.getBlogById(+id).subscribe(res => {
        this.blog =  res;
        this.blogService.getCommentsByBlog(this.blogId).subscribe(comments => {
          this.parseComments(comments);
          this.setRelatedBlogs();
        })
      });
    });

  }

  addComment(){
    let comment = new Comments();
    comment.blog_id = this.blogId;
    comment.user_id = this.userService.userId
    comment.comment = this.cmt.nativeElement.value;
    comment.enter_date = new Date();

    this.blogService.addComment(comment);
  }

  parseComments(comment : Comments[]){
    let commentList = new Array<CommentList>();
    this.userService.getAllUsers().subscribe(users => {
      comment.forEach(ele => {
        let cmt = new CommentList();
        cmt.id = ele.id;
        cmt.blogId = ele.blog_id;
        cmt.comment = ele.comment;
        cmt.enter_date = ele.enter_date;
        cmt.userId = ele.user_id;

        let usr = users.find(x => x.id == ele.user_id);
        cmt.userName = usr.name;
        cmt.userImage = usr.image;
        commentList.push(cmt);
      });
      this.blogComments = commentList;
    });
  }

  setRelatedBlogs(){
    this.blogService.getRelatedBlogs(this.blogId).subscribe(res => {
      this.relatedBlogs = res;
    });
  }

  replaceBlog(id : number){
    this.router.navigate(['admin','blog',id]);
  }
}
