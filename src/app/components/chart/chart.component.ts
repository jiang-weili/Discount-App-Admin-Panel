import { Component, OnInit, Input } from "@angular/core";
import * as FusionCharts from "fusioncharts";

const dataUrl =
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json';
const schemaUrl =
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  dataSource: any;
  @Input() dataList: any[];

  ngOnInit(): void {
    this.dataSource = {
      // Initially data is set as null
      data: null,
      caption: {
        text: ''
      },
      subcaption: {
        text: ''
      },
      series: 'Type',
      yAxis: [
        {
          plot: '',
          title: '',
          format: {
            // prefix: '$'
            prefix: ''
          }
        }
      ]
    };
    this.fetchData();
  }

  constructor() {
  }

  fetchData() {
    let jsonify = res => res.json();
    // let dataFetch = fetch(dataUrl).then(jsonify);
    // let schemaFetch = fetch(schemaUrl).then(jsonify);

    let dataFetch = this.dataList;
    let schemaFetch = [
        {
            'name': 'Time',
            'type': 'date',
            'format': '%d-%b-%y'
        },
        {
            'name': 'Type',
            'type': 'string'
        },
        {
            'name': 'Sale',
            'type': 'number'
        },
    ];
    Promise.all([dataFetch, schemaFetch]).then(res => {
      let data = res[0];
      let schema = res[1];
      let fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      ); // Instance of DataTable to be passed as data in dataSource
      this.dataSource.data = fusionTable;
    });
  }
}
