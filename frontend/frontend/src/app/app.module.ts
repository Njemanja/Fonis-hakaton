import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Dodajte ovu liniju

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { RegisterComponent } from './register/register.component';
import { KvizHomepageComponent } from './kviz-homepage/kviz-homepage.component';
import { ConnestionsComponent } from './connestions/connestions.component';
import { MyConnectionsComponent } from './my-connections/my-connections.component';
import { MessageBundle } from '@angular/compiler';
import { MessagesComponent } from './messages/messages.component';
import { LearnedWordsComponent } from './learned-words/learned-words.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    RegisterComponent,
    KvizHomepageComponent,
    ConnestionsComponent,
    MyConnectionsComponent,
    MessagesComponent,
    LearnedWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
