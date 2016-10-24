import {Component} from 'angular2/core';
import {HeaderComponent} from "./header.component";
import {RouteConfig} from "angular2/router";
import {MessagesComponent} from "./messages/messages.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ExercisesComponent} from "./exercises/exercises.component";


@Component({
    selector: 'my-app',
    template: `  
       <div class="container">
       <my-header></my-header>
       <router-outlet></router-outlet>
</div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
@RouteConfig([
    {path: '/', name: 'Exercises', component: ExercisesComponent, useAsDefault: true},
    {path: '/auth/...', name: 'Auth', component: AuthenticationComponent}
])
export class AppComponent {


}