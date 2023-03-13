import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdefaultComponent } from './navdefault.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('NavdefaultComponent', () => {
  let component: NavdefaultComponent;
  let fixture: ComponentFixture<NavdefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
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
