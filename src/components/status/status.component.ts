import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements ICellRendererAngularComp {

  params: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log(this.params, " this.params")
  }
  refresh() {
    return true;
  }

}
