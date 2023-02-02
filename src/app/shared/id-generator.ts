export class IdGenerator {
    getId(obj : any) : number{
        let id : number = -1;
        if(obj.length <= 0)
            return 1;
        obj.forEach(element => {
            id = Math.max(id , element.id);
        });
        return id + 1;
    }
}