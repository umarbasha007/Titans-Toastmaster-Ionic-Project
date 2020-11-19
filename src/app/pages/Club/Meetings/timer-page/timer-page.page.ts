import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.page.html',
  styleUrls: ['./timer-page.page.scss'],
})
export class TimerPagePage implements OnInit {
  chartData: ChartDataSets[] = [{
                                label: 'My First dataset',
                                backgroundColor: ['green', 'yellow', 'red'],
                                borderColor: '#fff',
                                data: [5,1,1],
                            }];
  chartLabels: Label[] =['a','b','c','d'];
 
  // Options
  chartOptions = {
    circumference: 1 * Math.PI,
    rotation: 1 * Math.PI,
    cutoutPercentage: 90,
    responsive: true,
    title: {
      display: true,
      text: 'Timer'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor:['green', 'yellow', 'red'],
    }
  ];
  chartType = 'doughnut';
  showLegend = true;
 
  // For search
  stock = '';

    public lineChartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    ];
    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: ChartOptions = {
      responsive: true,
    };
    public lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    public lineChartLegend = true;
    public lineChartType: ChartType = 'line';
    public lineChartPlugins = [];
    public chartReady = false;
  
    constructor() {this.chartReady = true; }
  
    ngOnInit() {
    }
  }
