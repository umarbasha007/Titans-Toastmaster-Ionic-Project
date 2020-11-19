import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.page.html',
  styleUrls: ['./screenshot.page.scss'],
})
export class ScreenshotPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
public takescreenshot(){
  const svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));

  const canvas: any = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const DOMURL: any = self.URL || self.webkitURL || self;
  const img = new Image();
  const svg = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = DOMURL.createObjectURL(svg);
  const img1 = new Image();
  img1.onload = function() {
    canvas.width = img1.width;
    canvas.height = img1.height;
    img.src = url;

  };
  img.onload = function() {
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, 0, 0);
    ctx.globalAlpha = 0.5; 
    ctx.drawImage(img, 0, 0);
    const png = canvas.toDataURL('image/png');
    document.querySelector('#png-container').innerHTML = '<img src="' + png + '"/>';
    DOMURL.revokeObjectURL(png);
  };
  //img1.crossOrigin = 'Anonymous';
  img1.src = 'http://localhost:8100/assets/bestSpeaker.PNG';
}
}
