import {Category} from './category';
import {Item} from './item';
import {ItemWithCategory} from './itemWithCategory';

export class List {

    public categories: Category[];
    public items: Item[] = [];
    public itemsWithCategory: ItemWithCategory[];

    constructor(public id: string, public name: string) {
    }

}
