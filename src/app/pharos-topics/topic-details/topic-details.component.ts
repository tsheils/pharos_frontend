import {Component, forwardRef, Inject, Injector, Input, OnInit, Type, ViewChild} from '@angular/core';
import {ComponentLookupService} from '../../pharos-services/component-lookup.service';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {Subject} from 'rxjs/Subject';
import {Target} from '../../models/target';
import {Publication} from '../../models/publication';
import {CustomContentDirective} from '../../tools/custom-content.directive';
import {DataDetailsResolver} from '../../pharos-main/services/data-details.resolver';
import {DynamicPanelComponent} from '../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {Topic} from '../../models/topic';
import {DataConnectionService} from '../topics-graph/services/connection/data-connection.service';
import {NodeService} from "../topics-graph/services/event-tracking/node.service";

@Component({
  selector: 'pharos-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent extends DynamicPanelComponent implements OnInit {
  path: string;
  topic: Topic;
  data: any;
 // private ngUnsubscribe: Subject<any> = new Subject();

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;
  private TOPICS = [
    new Topic({
      id: 0,
      name: 'Bromodomain Inhibitors',
      description: 'Imagination is the key to painting. Just let your mind wander and enjoy. This should make you happy.' +
      ' Isn\'t it great to do something you can\'t fail at? Nature is so fantastic, enjoy it. Let it make you happy. ' +
      'You\'re the greatest thing that has ever been or ever will be. You\'re special. You\'re so very special. ' +
      'I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue In this world, everything can be happy. ' +
      'Trees get lonely too, so we\'ll give him a little friend. This is your world, whatever makes you happy you can put in it. ' +
      'Go crazy. Put your feelings into it, your heart, it\'s your world. Even the worst thing we can do here is good.' +
      ' Don\'t fiddle with it all day. The very fact that you\'re aware of suffering is enough reason to be overjoyed that ' +
      'you\'re alive and can experience it. You have freedom here. The only guide is your heart. ' +
      'We don\'t want to set these clouds on fire. Let your imagination be your guide.',
      class: 'target',
      diseaseCt: 45,
      ligandCt: 43,
      targetCt: 0,
      publicationCt: 25
    }),
  ];


  constructor(
    private dataConnectionService: DataConnectionService,
    private _injector: Injector,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService,
  private nodeService: NodeService) {
    super();
  }


  ngOnInit() {
    this.topic = this.TOPICS[0];
        this._data
         // .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => {
            console.log(x);
            console.log(this.data);
         //   this.topic = this.data;
            // childComponent.instance.data = this.pick(this.data, keys);
          });
        console.log(this);

    this.nodeService.nodeList$
      .subscribe(res => {
        this.data = Array.from(new Set(res.hovered.concat(res.clicked)));
      });
    if (this.data) {
      this.data = [this.data];
    }
  }


  doIt () {
    console.log('doing it');
    this.dataConnectionService.messages.next({message: 'MATCH (n:`KG:1`)-[r]-(b) with {segments:[{start: startNode(r), relationship:r, end: endNode(r)}]} AS ret RETURN ret LIMIT 25', params: {}});
  }
}