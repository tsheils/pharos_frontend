import { TestBed } from '@angular/core/testing';

import { NavSectionsService } from './nav-sections.service';

describe('NavSectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavSectionsService = TestBed.inject(NavSectionsService);
    expect(service).toBeTruthy();
  });
});
