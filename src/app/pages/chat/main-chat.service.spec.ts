import { TestBed } from '@angular/core/testing';

import { MainChatService } from './main-chat.service';

describe('MainChatService', () => {
  let service: MainChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
