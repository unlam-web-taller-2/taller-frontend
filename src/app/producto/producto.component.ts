import { Component, OnInit } from '@angular/core';
import { producto } from '../interfaces/producto';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
