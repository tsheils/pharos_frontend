import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

/**
 * controls visibility of loading modal
 */
@Injectable()
export class LoadingService {
  /**
   * RxJs subject to broadcast loading modal visibility changes
   * @type {Subject<boolean>}
   * @private
   */
  private _loadingSource = new Subject<boolean>();

  /**
   * Observable stream of visibility changes
    * @type {Observable<boolean>}
   */
  loading$ = this._loadingSource.asObservable();

  /**
   * change visibility of loading modal
   * @param {boolean} force
   */
  toggleVisible(force: boolean) {
    this._loadingSource.next(force);
  }
}


