import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPensionerComponent } from './add-pensioner.component';

describe('AddPensionerComponent', () => {
  let component: AddPensionerComponent;
  let fixture: ComponentFixture<AddPensionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPensionerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPensionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
