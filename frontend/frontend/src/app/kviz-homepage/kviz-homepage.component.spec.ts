import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvizHomepageComponent } from './kviz-homepage.component';

describe('KvizHomepageComponent', () => {
  let component: KvizHomepageComponent;
  let fixture: ComponentFixture<KvizHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KvizHomepageComponent]
    });
    fixture = TestBed.createComponent(KvizHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
