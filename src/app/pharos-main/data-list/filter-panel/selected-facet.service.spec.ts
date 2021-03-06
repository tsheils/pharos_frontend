import {inject, TestBed} from '@angular/core/testing';

import {SelectedFacetService} from './selected-facet.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('SelectedFacetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        RouterTestingModule,
        ApolloTestingModule,
        SharedModule
      ],
      providers: [
        PharosApiService,
        SelectedFacetService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    });
  });

  it('should be created', inject([SelectedFacetService], (service: SelectedFacetService) => {
    expect(service).toBeTruthy();
  }));
});
