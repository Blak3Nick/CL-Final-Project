///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {MessageService} from "./messages/message.service";
import {ROUTER_PROVIDERS} from "angular2/src/router/router_providers";

bootstrap(AppComponent, [HTTP_PROVIDERS, MessageService, ROUTER_PROVIDERS]);