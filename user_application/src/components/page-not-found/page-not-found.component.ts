import { Component } from '@angular/core';
import {

 FormsModule,
 ReactiveFormsModule,
 
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
 selector: 'app-page-not-found',
 standalone: true,
 imports: [
  MatFormFieldModule,
  ReactiveFormsModule,
  FormsModule,
  MatFormFieldModule,
 ],
 templateUrl: './page-not-found.component.html',
 styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent  {

}