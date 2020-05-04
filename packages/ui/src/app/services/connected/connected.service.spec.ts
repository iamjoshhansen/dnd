import { TestBed } from '@angular/core/testing';

import { ConnectedService } from './connected.service';

describe('ConnectedService', () => {
  let service: ConnectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
