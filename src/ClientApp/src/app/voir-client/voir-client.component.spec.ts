import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirClientComponent } from './voir-client.component';

describe('VoirClientComponent', () => {
  let component: VoirClientComponent;
  let fixture: ComponentFixture<VoirClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
