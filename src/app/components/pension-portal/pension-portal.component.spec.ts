import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionPortalComponent } from './pension-portal.component';

describe('PensionPortalComponent', () => {
  let component: PensionPortalComponent;
  let fixture: ComponentFixture<PensionPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PensionPortalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
