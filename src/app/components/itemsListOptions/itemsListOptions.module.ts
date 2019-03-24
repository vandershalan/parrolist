import {NgModule} from '@angular/core';
import {ItemsListOptionsComponent} from './itemsListOptions';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ItemsListOptionsComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ],
    entryComponents: [
        ItemsListOptionsComponent
    ],
    exports: [
        ItemsListOptionsComponent
    ]

})


export class ItemsListOptionsModule {
}
