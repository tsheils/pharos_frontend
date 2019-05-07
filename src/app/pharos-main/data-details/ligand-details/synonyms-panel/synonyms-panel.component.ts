import {Component} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-synonyms-panel',
  templateUrl: './synonyms-panel.component.html',
  styleUrls: ['./synonyms-panel.component.css']
})
export class SynonymsPanelComponent extends DynamicPanelComponent {

  /**
   * no args constructor
   * calls super object constructor
   */
  constructor() {
    super();
  }
}
