///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {HTTP_PROVIDERS} from "angular2/http";
//import {MessageService} from "./messages/message.service";
import {ROUTER_PROVIDERS} from "angular2/src/router/router_providers";
import {provide} from "angular2/core";
import {LocationStrategy} from "angular2/router";
import {HashLocationStrategy} from "angular2/router";
import {AuthService} from "./auth/auth.service";
import {ExerciseService} from "./Exercises/exercise.service";
import {userSignService} from "./auth/userSign.service";



//This is where Angular declares different services that will be used
bootstrap(AppComponent, [HTTP_PROVIDERS, ExerciseService, AuthService, userSignService, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);