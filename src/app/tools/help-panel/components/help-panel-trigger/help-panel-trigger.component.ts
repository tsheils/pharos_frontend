import {Component, Input, OnInit} from '@angular/core';
import {HelpPanelOpenerService} from "../../services/help-panel-opener.service";
import {HelpDataService} from "../../services/help-data.service";

@Component({
  selector: 'pharos-help-panel-trigger',
  templateUrl: './help-panel-trigger.component.html',
  styleUrls: ['./help-panel-trigger.component.css']
})
export class HelpPanelTriggerComponent implements OnInit {
  @Input() origin?: string;

  constructor(
    private helpPanelOpenerService : HelpPanelOpenerService,
    private helpDataService : HelpDataService
  ) { }

  ngOnInit() {
  }

  toggle(){
    if(this.origin) {
      this.helpDataService.fetchData(this.origin);
    }
      this.helpPanelOpenerService.toggleVisible();
  }
}