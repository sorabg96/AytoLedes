import { Component, OnInit, Input} from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-widget-card',
  standalone: true,
  imports: [HighchartsChartModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input() label: any | string;
  @Input() total: any | string;
  @Input() percentage: any | string;

  Highcharts = Highcharts;
  chartOptions = {};
  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'area',
          backgroundColor: null,
          borderwidth: 0,
          margin: [2,2,2,2],
          height: 60,
      },
      title: {
          text: null,
          align: 'left'
      },
      subtitle: {
          text: null,
          align: 'left'
      },
      tooltip: {
          split: true,
          outside: true,
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled:false,
      },
      xAxis:{
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        starOn: false,
        endOnTick: false,
        tickOptions: [],
      },
      yAxis:{
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        starOn: false,
        endOnTick: false,
        tickOptions: [],
      },
      series: [{
          data: [71, 78, 39, 66]
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}
