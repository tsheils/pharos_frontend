import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges, AfterViewChecked
} from '@angular/core';
import {GeneDetailsComponent} from "../gene-details/gene-details.component";
import {DiseaseAssociation} from "../../../../../models/disease-association";
import {ActivatedRoute} from "@angular/router";
import {Disease} from "../../../../../models/disease";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

@Component({
  selector: 'pharos-disease-association-details',
  templateUrl: './disease-association-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})
export class DiseaseAssociationDetailsComponent extends GeneDetailsComponent implements OnInit {

  @ViewChild('componentContainer', {read: ElementRef, static: true}) container: ElementRef;
  constructor(private _route: ActivatedRoute) {
    super();
  }

  get scrollable() : boolean {
    if (this.container) {
      return this.container.nativeElement.scrollHeight > this.container.nativeElement.clientHeight;
    }
    return false;
  }

  headerTooltip() : string {
    if(this.scrollable){
      if(this.expanded){
        return 'Click to collapse';
      }
      else{
        return 'Click to expand';
      }
    }
    return '';
  }

  associationFields: string[] =
    ['evidence', 'zscore', 'conf', 'reference', 'drug_name', 'log2foldchange', 'pvalue', 'score', 'source', 'O2S', 'S2O'];

  nonDrugMap: Map<string, DiseaseAssociation[]> = new Map<string, DiseaseAssociation[]>();
  drugMap: Map<string, DiseaseAssociation[]> = new Map<string, DiseaseAssociation[]>();

  nonDrugOrder: string[] = [];
  drugOrder: string[] = [];

  associatedDisease: string = "";

  drugSource: string = 'DrugCentral Indication';

  ngOnInit(): void {
    this.associatedDisease = this._route.snapshot.queryParamMap.get("associatedDisease").toLocaleLowerCase();
    this.target.diseaseAssociationDetails.forEach(assoc => {
      let diseaseName = assoc.name.toLocaleLowerCase();
      if(assoc.type === this.drugSource){
        if (this.drugMap.has(diseaseName)){
          this.drugMap.get(diseaseName).push(assoc);
        }
        else{
          this.drugMap.set(diseaseName, [assoc]);
        }
      }
      else{
        if (this.nonDrugMap.has(diseaseName)){
          this.nonDrugMap.get(diseaseName).push(assoc);
        }
        else{
          this.nonDrugMap.set(diseaseName, [assoc]);
        }
      }
    });
    this.nonDrugOrder = Array.from(this.nonDrugMap.keys()).sort((a,b) => {
      if (a === this.associatedDisease) {return -1;}
      if (b === this.associatedDisease) {return 1;}
      return a.localeCompare(b);
    });
    this.drugOrder = Array.from(this.drugMap.keys()).sort((a,b) => {
      if (a === this.associatedDisease) {return -1;}
      if (b === this.associatedDisease) {return 1;}
      return a.localeCompare(b);
    });
  }
}
