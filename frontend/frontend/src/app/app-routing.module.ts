import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { KvizComponent } from './kviz/kviz.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LearnComponent } from './learn/learn.component';
import { RegisterComponent } from './register/register.component';
import { KvizHomepageComponent } from './kviz-homepage/kviz-homepage.component';
import { ConnestionsComponent } from './connestions/connestions.component';
import { MyConnectionsComponent } from './my-connections/my-connections.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { CommonModule } from '@angular/common';
import { LearnedWordsComponent } from './learned-words/learned-words.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: "quiz/questions", component: KvizComponent },
  { path: "login", component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'register', component: RegisterComponent },
  { path: "quiz", component: KvizHomepageComponent },
  { path: "connestions", component: ConnestionsComponent },
  { path: "myconnections", component: MyConnectionsComponent },
  { path: "quiz", component: KvizHomepageComponent },
  { path: "about", component: AboutComponent },
  { path: "profile", component: ProfileComponent },
  { path: "messages", component: MessagesComponent },
  { path: "hit", component: LearnedWordsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }