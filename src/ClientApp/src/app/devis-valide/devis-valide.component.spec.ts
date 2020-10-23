import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisValideComponent } from './devis-valide.component';

describe('DevisValideComponent', () => {
  let component: DevisValideComponent;
  let fixture: ComponentFixture<DevisValideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevisValideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
