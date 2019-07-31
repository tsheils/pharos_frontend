import {NodeSerializer, SGNode} from 'smrtgraph-core';
import {DiseaseNodeSerializer} from './disease-node';
import {LigandNodeSerializer} from './ligand-node';
import {TargetNodeSerializer} from './target-node';

export class PharosNodeSerializer extends NodeSerializer {
  targetNodeSerializer: TargetNodeSerializer = new TargetNodeSerializer();
  diseaseNodeSerializer: DiseaseNodeSerializer = new DiseaseNodeSerializer();
  ligandNodeSerializer: LigandNodeSerializer = new LigandNodeSerializer();
  nodeSerializer: NodeSerializer = new NodeSerializer();

  /**
   * no args constructor
   */
  constructor () {
    super();
  }


  /**
   * create ligand object from json
   * @param json
   * @param id
   */
  fromJson(json: any, id?: string): any {
    const convertedJson = super.fromJson(json);
    switch (json.kind) {
      case 'ix.idg.models.Disease': {
        return this.diseaseNodeSerializer.fromJson(convertedJson, id);
      }

      case 'ix.idg.models.Target': {
        return this.targetNodeSerializer.fromJson(convertedJson, id);
      }

      case 'ix.idg.models.Ligand': {
        return this.ligandNodeSerializer.fromJson(convertedJson, id);
      }
      default : {
        return this.nodeSerializer.fromJson(convertedJson, id);
      }
    }


  }

  /**
   * flatten object to json
   * @param obj
   */
  toJson(obj: SGNode): any {
    return [];
  }

 /* mergeNodes(node: TargetNode, data: any): TargetNode {
    /!*    const tempNode: SGNode = this.fromJson(data);
        Object.entries((node)).forEach((prop) => tempNode[prop[0]] = prop[1]);
        node = tempNode;
        *!/
    Object.entries((data.properties)).forEach((prop) => node.properties[prop[0]] = prop[1]);
    return node;
  }*/
}