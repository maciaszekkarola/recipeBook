import { CommonModule } from '@angular/common';
import { DropdownDirective } from 'app/shared/dropdown.directive';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [
        CommonModule,
        DropdownDirective
    ]
})

export class SharedModule {

}