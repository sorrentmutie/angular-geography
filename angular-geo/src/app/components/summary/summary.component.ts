import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Summary } from 'src/app/models/summary';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from 'angular-google-charts';
import { MyChart } from 'src/app/models/my-chart';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: Summary[] = [];
  geoSummary = [];
  myChangingCart = null;
  selectedNation = '';

  constructor(private data: DataService) { }


  ngOnInit() {
    this.data.getSummary().subscribe(s => {
      this.summary = s;
      this.ConvertData();
    });
  }

  onSelect(event: ChartEvent) {
    if (event && event[0] && event[0].row >= 0) {
      const row= event[0].row;
      this.selectedNation = this.geoSummary[row][0];
    }
  }

  private SetChart(data: any): MyChart  {
     const columnNames = ['Nation', 'Count'];
     const mychart: MyChart = {
      type: 'GeoChart',
      columnNames,
      data,
      options: {
        colorAxis: {colors: ['purple', 'blue', 'green']},
        backgroundColor: '#81d4fa',
        datalessRegionColor: 'white'
      }
     };
     return mychart;
  }


  private ConvertData(): void {
    this.summary.forEach(x => {
      const d = [];
      d.push(x.Nation);
      d.push(x.Count);
      this.geoSummary.push(d);
    });
    this.myChangingCart = this.SetChart(this.geoSummary);
  }

}
