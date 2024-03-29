import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './components/profile/profile.component';
import { NavdefaultComponent } from './components/navdefault/navdefault.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentPageComponent } from './components/content-page/content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SignupPageComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NavdefaultComponent,
    FooterComponent,
    ContentPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
