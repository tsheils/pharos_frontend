import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
      ],
      providers: [
        AngularFireAuth,
        {provide: AngularFirestore, useValue: FIRESTORESTUB},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
