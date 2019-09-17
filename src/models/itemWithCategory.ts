import {Category} from './category';
import {Item} from './item';

export class ItemWithCategory {

    public category: Category;

    constructor(public item: Item) {

    }
}

