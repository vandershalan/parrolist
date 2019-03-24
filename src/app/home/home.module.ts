import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {PipesModule} from '../pipes/pipes.module';
import {ItemsListOptionsModule} from '../components/itemsListOptions/itemsListOptions.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsListOptionsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    PipesModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
