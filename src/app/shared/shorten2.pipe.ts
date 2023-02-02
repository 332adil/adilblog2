import { PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name : 'shorten2'
})
export class ShortenPipe2 implements PipeTransform{
    transform(value: any, ...args: any[]) {
        let str : string = value;
        if(value.length > 100){
            return str.substring(1,100) + ' ...';
        }
        return value;
    }
}