import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    $('.collapsible').collapsible();
  }

}
