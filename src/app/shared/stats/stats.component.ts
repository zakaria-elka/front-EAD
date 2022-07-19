import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sa-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {

  @Input() data: any;

  constructor() {}

  ngOnInit() {
  }

}
