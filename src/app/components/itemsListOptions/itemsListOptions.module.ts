import {NgModule} from '@angular/core';
import {ItemsListOptionsComponent} from './itemsListOptions';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        ItemsListOptionsComponent
    ],
    imports: [
        RouterModule.forChild([{component: ItemsListOptionsComponent}])
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
