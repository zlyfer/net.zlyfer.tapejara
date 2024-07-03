import { TestBed } from '@angular/core/testing';

import { PterodactylApiService } from './pterodactyl-api.service';

describe('PterodactylApiService', () => {
  let service: PterodactylApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PterodactylApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
