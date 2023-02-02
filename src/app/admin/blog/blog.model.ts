export class Blog {
    public id : number ;
    public title : string ;
    public category : number; 
    public description : string;
    public thumbnail : string;
    public content : string;
    public tags : Tags[];
    public auther : string;
    public enter_date : Date;
}

export interface Tags{
    tag : string;
}