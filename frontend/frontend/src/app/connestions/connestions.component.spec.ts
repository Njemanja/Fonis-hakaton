import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnestionsComponent } from './connestions.component';

describe('ConnestionsComponent', () => {
  let component: ConnestionsComponent;
  let fixture: ComponentFixture<ConnestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnestionsComponent]
    });
    fixture = TestBed.createComponent(ConnestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
