import { TestBed } from '@angular/core/testing';

import { MLRequestService } from './mlrequest.service';

describe('MLRequestService', () => {
  let service: MLRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MLRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
