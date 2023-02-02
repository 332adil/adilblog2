import { PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name : 'shorten'
})
export class ShortenPipe implements PipeTransform{
    transform(value: any, ...args: any[]) {
        let str : string = value;
        if(value.length > 50){
            return str.substring(1,200) + ' ...';
        }
        return value;
    }
}