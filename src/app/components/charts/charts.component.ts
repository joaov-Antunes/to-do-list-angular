import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import axios from 'axios';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  chart: any = {};
  data: [] = [];

  constructor() {}
  
  ngOnInit() {
    axios.get('http://localhost:3000/numberoftasks')
    .then(res => {
      this.data = res.data
      
      const options = {
        chart: {
          type: 'bar',
          backgroundColor: '#fff',
        },
        title: {
          text: 'Tarefas por urgencia'
        },
        credits: {
          enabled: false,
        },
        series: [{}],
      }
      options.series.pop();
      this.data.forEach((i: any) => {
        options.series.push({name: i.Nivel, type: 'bar', data: [Number(i.qtd)]})
      })
      console.log(options);
      this.renderChart(options)
    })
    .catch(err => {
      console.log(err);
    })
  }

  renderChart(options: object) {
    const chart = new Chart(options);
    return this.chart = chart;
  }
}
