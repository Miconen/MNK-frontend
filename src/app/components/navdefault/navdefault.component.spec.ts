import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdefaultComponent } from './navdefault.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavdefaultComponent', () => {
  let component: NavdefaultComponent;
  let fixture: ComponentFixture<NavdefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HttpClientTestingModule],
      declarations: [NavdefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavdefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
