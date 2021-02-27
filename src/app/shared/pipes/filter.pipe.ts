import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(list: any[], filterText: string): any {
        return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1 || item.description.search(new RegExp(filterText, 'i')) > -1) : [];
    }
}
