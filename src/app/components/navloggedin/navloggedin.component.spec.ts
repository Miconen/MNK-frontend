import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavloggedinComponent } from './navloggedin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavloggedinComponent', () => {
  let component: NavloggedinComponent;
  let fixture: ComponentFixture<NavloggedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NavloggedinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavloggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
