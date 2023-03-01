import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavdefaultComponent } from './components/navdefault/navdefault.component';
import { NavloggedinComponent } from './components/navloggedin/navloggedin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, FontAwesomeModule],
      declarations: [
        AppComponent,
        FooterComponent,
        NavdefaultComponent,
        NavloggedinComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
