import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-pie',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Ramdon DATA'
      },
      tooltip: {
          valueSuffix: '%'
      },
      subtitle: {
          text:
          'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },      
      exporting: {
        enabled:true,
      },
      credits: {
        enabled: false,
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [
                  {
                      name: 'Water',
                      y: 55.02
                  },
                  {
                      name: 'Fat',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Carbohydrates',
                      y: 1.09
                  },
                  {
                      name: 'Protein',
                      y: 15.5
                  },
                  {
                      name: 'Ash',
                      y: 1.68
                  }
              ]
          }
      ]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}
