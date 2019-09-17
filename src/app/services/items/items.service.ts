import {Injectable} from '@angular/core';
import {ItemWithCategory} from '../../../models/itemWithCategory';
import {Category} from '../../../models/category';
import {Item} from '../../../models/item';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {List} from '../../../models/list';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    public static fireAllListsPath = '/lists';

    dbAllLists: AngularFireList<any>;
    dbCurrentItemList: AngularFireList<any>;
    dbCategories: AngularFireList<any>;

    items: Item[] = [];
    // itemsWithCategory: ItemWithCategory[] = [];
    itemsWithCategory: Observable<ItemWithCategory[]>;
    categories: Category[] = [];

    list: Observable<List>;


    constructor(public afDatabase: AngularFireDatabase) {
        this.dbAllLists = this.afDatabase.list(ItemsService.fireAllListsPath);
    }


    getList(listId) {
        const fireCurrentListPath = ItemsService.fireAllListsPath + '/' + listId;
        console.log('firePath: ' + fireCurrentListPath);

        const list = this.afDatabase.object<any>(fireCurrentListPath).valueChanges().pipe(map(lst => {
            const l = new List(lst.id, lst.name);
            l.items = Object.values<Item>(lst.items);
            l.categories = Object.values<Category>(lst.categories);
            l.itemsWithCategory = l.items.map(itm => {
                const iwc = new ItemWithCategory(itm);
                const category = l.categories.find(ctgr => ctgr.id === iwc.item.categoryId);
                iwc.category = category ? category : Category.CATEGORY_WITHOUT_CATEGORY;
                return iwc;
            });
            return l;
        }));

        // const list = this.afDatabase.object<any>(fireCurrentListPath).valueChanges().pipe(
        // map(lst => {Object.values<Item>(lst.items).map(itm => lst.itemsWithCategory.push(new ItemWithCategory(itm))) ; return lst; }));

        // const list = this.afDatabase.object<any>(fireCurrentListPath).valueChanges().pipe(
        //     map(lst => {const l = new List(lst.id, lst.name) ; l.items.push(new Item('aaaa')); return l; }));

        // const list = this.afDatabase.object<List>(fireCurrentListPath).valueChanges().pipe(
        //     map(lst => {lst.items.map(itm => lst.itemsWithCategory.push(new ItemWithCategory(itm))); return lst; }));

        list.subscribe(lst => console.log('list: ' + lst));
        list.subscribe(lst => lst.itemsWithCategory.map(itm => console.log('item:', itm.item.name, itm.category.name )));
        // list.subscribe(lst => lst.itemsWithCategory.map(itm => console.log('l: ' + itm)));
        return list;
    }


    // this.itemsWithCategory. = this.items.map(itm => {const itmWC = new ItemWithCategory(itm); return itmWC; });
    // this.itemsWithCategory.map(itmWC => {const category = this.categories.find(
    //     ctgr => ctgr.id === itmWC.item.categoryId);
    //     itmWC.category = category ? category : Category.CATEGORY_WITHOUT_CATEGORY; return itmWC; });
    // console.log('items with categories: ', this.itemsWithCategory);

}
