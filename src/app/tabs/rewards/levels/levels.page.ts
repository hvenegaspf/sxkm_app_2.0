import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {

  uiColor: string = '#ffbb01';

  constructor() { }

  ngOnInit() {}

  // novato
  uiSky() {
    this.uiColor = '#0cc1f9';
  }
  // guerrero
  uiYellow() {
    this.uiColor = '#ffbb01';
  }
  // rockstar
  uiGreen() {
    this.uiColor = '#2ec23b';
  }
  // leyenda
  uiBlue() {
    this.uiColor = '#5387d1';
  }

}
