import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from 'app/components/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from 'app/components/shopping-list/shopping-list-edit/shopping-list-edit.component';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ]
})

export class ShoppingModule {

}