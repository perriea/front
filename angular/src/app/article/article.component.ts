import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  computer: any;
  chart = [];
  chart2 = [];
  chart3 = [];
  expertMode = true;
  simpleMode = false;
  textMode = "Mode expert";

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  dailyForecast() {
    return this.http.get("http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22");
  }

  toggleMode(event) {
    if (this.textMode == "Mode expert") {
      this.expertMode = false;
      this.simpleMode = true;
      this.textMode = " Mode simplifié"
    }
    else {
      this.expertMode = true;
      this.simpleMode = false;
      this.textMode = "Mode expert"
    }
  }

  getAll() {
    this.computer = [];
    this.route.params.subscribe(params => {
      this.http.get('https://127.0.0.1:4433/api/v1/search/computers/'+params['id']).subscribe(data => {
        // Read the result field from the JSON response.
        this.computer = data['data'][0];
        console.log(this.computer);
      });
    });
  }

  ngOnInit() {
    this.getAll();

    this.dailyForecast().subscribe(res => {

      // first chart
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: ["Gaming", "Bureautique", "Multimédia"],
          datasets: [
            {
              data: [20, 15, 40],
              backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            }
          ]
        }
      });

      // second chart
      this.chart2 = new Chart('canvas2', {
        type: 'doughnut',
        data: {
          labels: ["Gaming", "Bureautique", "Multimédia"],
          datasets: [
            {
              data: [82, 8, 10],
              backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            }
          ]
        }
      });

      // third chart
      this.chart3 = new Chart('canvas3', {
        type: 'doughnut',
        data: {
          labels: ["Gaming", "Bureautique", "Multimédia"],
          datasets: [
            {
              data: [50, 30, 20],
              backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            }
          ]
        }
      });

    });
  }
}
