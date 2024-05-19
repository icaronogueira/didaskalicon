import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {

  showlogo=true;
  title = "Didaskalicon";
  filter="";

  constructor( ) {}

  ngOnInit() {
      setTimeout(() => {
        this.showlogo=false;
      }, 3500);
  }

}
