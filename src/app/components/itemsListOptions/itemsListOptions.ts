import {Component} from '@angular/core';
import {ListOptions} from '../../../models/listOptions';
import {NavParams, PopoverController} from '@ionic/angular';


@Component({
    selector: 'items-list-options',
    templateUrl: 'itemsListOptions.html'
})
export class ItemsListOptionsComponent {

    listOptions: ListOptions;
    currentSortField: string;

    constructor(public popoverCtrl: PopoverController, navParams: NavParams) {
        this.listOptions = navParams.get('listOptions');
        this.currentSortField = this.listOptions.sortField;
    }


    sortChanged() {
        if (this.listOptions.sortField === this.currentSortField) {
            this.listOptions.sortDesc = !this.listOptions.sortDesc;
        } else {
            this.listOptions.sortDesc = false;
            this.listOptions.sortField = this.currentSortField;
        }
        this.close();
    }


    close() {
        this.popoverCtrl.dismiss({listOptions: this.listOptions});
    }
}
