import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddAndEditComponent } from './user-add-and-edit.component';

describe('UserAddAndEditComponent', () => {
  let component: UserAddAndEditComponent;
  let fixture: ComponentFixture<UserAddAndEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddAndEditComponent]
    });
    fixture = TestBed.createComponent(UserAddAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
