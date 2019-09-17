import {Component, OnInit} from '@angular/core';
import {AlertController, Events, PopoverController} from '@ionic/angular';
import {ListOptions} from '../../models/listOptions';
import {Item, ItemType} from '../../models/item';
import {Category} from '../../models/category';
import {Subscription} from 'rxjs';
import {DiacriticsRemoval} from '../utils/DiacriticsRemoval';
import {ItemWithCategory} from '../../models/itemWithCategory';
import {ActivatedRoute, Router} from '@angular/router';
import {List} from '../../models/list';
import {ItemsListOptionsComponent} from '../components/itemsListOptions/itemsListOptions';
import {ItemsService} from '../services/items/items.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    public static fireAllListsPath = '/lists';

    itemsWithCategory: ItemWithCategory[] = [];
    currentList: List = new List('ROOT', 'parrolist');
    CATEGORY_WITHOUT_CATEGORY_NAME = Category.WITHOUT_CATEGORY_NAME;

    private itemsSubscription: Subscription;

    listOptions: ListOptions = new ListOptions();

    searchValue = '';

    private prevCategory: string;

    rd = (val) => typeof val === 'string' ? DiacriticsRemoval.removeDiacritics(val.toLowerCase()) : val;


    constructor(public is: ItemsService, public router: Router, private activatedRoute: ActivatedRoute,
                public alertCtrl: AlertController, public popoverCtrl: PopoverController, public events: Events) {
        console.log('constructor');
    }


    ngOnInit() {
        console.log('ngOnInit');

        const listId = this.activatedRoute.snapshot.paramMap.get('listId');
        const listName = this.activatedRoute.snapshot.paramMap.get('listName');

        if (listId) {
            this.currentList.id = listId;
        }
        if (listName) {
            this.currentList.name = listName;
        }

        console.log('this.currentList.id: ' + this.currentList.id);
    }


    // ngDoCheck() {
    //     console.log('itemList ngDoCheck');
    // }


    ionViewWillEnter() {
        console.log('itemList ionViewWillEnter, id: ' + this.currentList.id + ', name: ' + this.currentList.name);

        // this.categoriesSubscription = this.dbCategories.valueChanges().subscribe(
        //     ctgrs => {this.categories = ctgrs as Category[]; this.appendCategories2Items(); });
        // this.itemsSubscription = this.dbCurrentItemList.valueChanges().subscribe(
        //     itms => {this.items = itms as Item[]; this.appendCategories2Items(); });

        this.itemsSubscription = this.is.getList(this.currentList.id).subscribe(
            lst => this.itemsWithCategory = lst.itemsWithCategory as ItemWithCategory[]);

        this.events.subscribe('itemsAddedTopic', event => {
            this.clearSearchValue();
        });

    }


    ionViewWillLeave(): void {
        console.log('itemList ionViewWillLeave, id: ' + this.currentList.id + ', name: ' + this.currentList.name);

        this.itemsSubscription.unsubscribe();

        this.events.unsubscribe('itemsAddedTopic', () => {
            console.log('Unsubscribed itemsAddedTopic');
        });
    }


    // appendCategories2Items() {
    //   console.log('itemList appendCategories2Items');
    //   console.log('items: ', this.items);
    //   console.log('categories: ', this.categories);
    //   this.itemsWithCategory = this.items.map(itm => {const itmWC = new ItemWithCategory(); itmWC.item = itm; return itmWC; });
    //   this.itemsWithCategory.map(itmWC => {const category = this.categories.find(
    //       ctgr => ctgr.id === itmWC.item.categoryId);
    //         itmWC.category = category ? category : Category.CATEGORY_WITHOUT_CATEGORY; return itmWC; });
    //   console.log('items with categories: ', this.itemsWithCategory);
    // }


    isCategoryChanged(currIdx, currCategory): boolean {
        if (currIdx === 0 || currCategory !== this.prevCategory) {
            this.prevCategory = currCategory;
            return true;
        }
        return false;
    }


    clearSearchValue() {
        this.searchValue = '';
    }


    async showOptionsPopover(event) {
        const popover = await this.popoverCtrl.create({
            component: ItemsListOptionsComponent,
            event: event,
            componentProps: {listOptions: this.listOptions},
            translucent: false
        });

        // popover.onDidDismiss().then((optionsData) => {
        //   if (optionsData) {
        //     this.listOptions = optionsData.data.listOptions;
        //   }
        // });

        await popover.present();
    }


    goToHomePage(listId, listName) {
        console.log('goToHomePage', listId, listName);
        this.router.navigate(['home', listId, listName]);
    }


    goToNewItemPage() {
        // if (this.searchValue == null) this.searchValue = '';
        // this.router.navigateByUrl('NewItemPage/${itemName:' this.searchValue,
        // dbAllLists: this.dbAllLists, dbCurrentItemList: this.dbCurrentItemList, dbCategories: this.dbCategories});
    }


    goToEditItemPage(itemWC: ItemWithCategory) {
        // this.navCtrl.push('EditItemPage',
        //     {itemWithCategory: itemWC, dbAllLists: this.dbAllLists, dbCurrentItemList: this.dbCurrentItemList,
        //       dbCategories: this.dbCategories});
    }


    goToCategoriesPage() {
        // this.navCtrl.push('CategoriesListPage', {showRadio: false, categoryId: null, dbCategories: this.dbCategories,
        //   dbCurrentItemList: this.dbCurrentItemList});
    }


    doActionIfSwipeIsEnough(slidingItem, item) {
        // if (slidingItem.getOpenAmount() < -50) {
        if (slidingItem.getSlidingRatio() < -1.1) {
            this.markAsDone(item);
        }
    }


    markAsDone(item: Item) {
        if (item.type === ItemType.List) {
        }
        item.active = false;
        this.clearSearchValue();
        this.updateItemInDB(item);
    }


    markAsActive(item: Item) {
        item.active = true;
        this.clearSearchValue();
        this.updateItemInDB(item);
    }


    updateItemInDB(item: Item) {
        // console.log('update item: ' + JSON.stringify(item));
        // this.dbCurrentItemList.update(item.id, item);
    }


    removeItem(item: Item) {
        const alert = this.alertCtrl.create({
            header: 'Confirm removing',
            message: 'Do you really want to remove this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Remove',
                    handler: () => {
                        if (ItemType.List === item.type) {
                            // this.dbAllLists.remove(item.listRef);
                        }
                        // this.dbCurrentItemList.remove(item.id);
                    }
                }
            ]
        });
        // FIXME do poprawy
        // alert.present();
    }


    consoleLog(str: string) {
        console.log(str);
    }
}



