import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {TaskComponent} from "./task/task.component";
import {TaskResolver} from "./services/task.resolver";
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent

  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'tasks/:taskUrl',
    component: TaskComponent,
    resolve: {
      task: TaskResolver
    }
  },
  {
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
