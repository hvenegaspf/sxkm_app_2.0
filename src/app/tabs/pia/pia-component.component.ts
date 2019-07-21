import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
// declare var TweenMax;
// declare var TweenLite;
// declare var Power2;
// declare var $;


/**
 *
 * Original
 * https://losrodriguez.studio/sxkm/
 * .
 */
@Component({
  selector: 'pia-component',
  templateUrl: './pia-component.component.html',
  styleUrls: ['./pia-component.component.scss'],
})
export class PiaComponent {
  @ViewChild('canvas') canvasEl: ElementRef;
  private _CANVAS: any;
  dtc: any = {};
  App: any = {};

  constructor(public platform: Platform) {
    /* Valores de contro PIA */
    platform.ready().then(() => {
      this.App.width = platform.width()
      this.App.height = platform.height()
      this.dtc.sides = 20;
      this.dtc.twists = 6;
      this.dtc.lineWidth = 1;
      this.dtc.maxRadius = Math.min(200 * 0.35, 250);
      this.dtc.radius = Math.min(200 * 0.35, 250);
      this.dtc.diameter = 0;
      this.dtc.dps = null;
      this.dtc.center = null;
      this.dtc.alpha = 0;
      this.dtc.alphaClear = 0.1;
      this.dtc.separation = 5;
      this.dtc.defaceFactor = 2;
      // Sensors
      this.dtc.electronic = 0;
      this.dtc.fuel_air = 0;
      this.dtc.injectors = 0;
      this.dtc.ignition = 0;
      this.dtc.emissions = 0;
      this.dtc.speed = 0;
      this.dtc.ECU = 0;
      this.dtc.transmission = 0;
      this.dtc.rotation = 0;
      this.dtc.vibration = 2;
      this.dtc.color = {
        r: 0,
        g: 0,
        b: 0
      };
    });
  }

  ngAfterViewInit() {
    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = 200;
    this._CANVAS.height = 200;
    this.init_dtc();
    // this.init_App();
  }

  init_dtc() {
    this.dtc.dps = 360 / this.dtc.sides;
    this.set_vertices();
  }

  set_vertices() {
    var radius = this.dtc.radius;
    this.dtc.points = [];
    for (var i = 0; i < this.dtc.twists; i++) {
      radius += this.dtc.separation;
      this.dtc.diameter = radius * 2;
      this.dtc.center = {
        x: (200 - this.dtc.diameter) / 2 + radius,
        y: (200 - this.dtc.diameter) / 2 + radius
      };
      for (var j = 0; j < this.dtc.sides; j++) {
        var angle = this.dtc.dps * j,
          radians = angle * Math.PI / 180;
        var deface = Math.random() * this.dtc.defaceFactor - (this.dtc.defaceFactor / 2);
        var x = this.dtc.diameter * Math.cos(radians) + deface;
        var y = this.dtc.diameter * Math.sin(radians) + deface;
        var coords = {
          rand: Math.random() * (this.dtc.vibration) - (this.dtc.vibration / 2),
          deface: deface,
          x: x,
          y: y
        };
        this.dtc.points.push(coords);
      };
    };
    this.dtc.points.push(this.dtc.points[0]);
    this.dtc.points.push(this.dtc.points[1]);
    this.dtc.points.push(this.dtc.points[2]);
  }
}
