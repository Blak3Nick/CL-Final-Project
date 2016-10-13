var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("messages/message", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message(content, messageId, username, userId) {
                    this.content = content;
                    this.messageId = messageId;
                    this.username = username;
                    this.userId = userId;
                }
                return Message;
            }());
            exports_1("Message", Message);
        }
    }
});
System.register("messages/message.service", ["messages/message", "angular2/http", "angular2/core", 'rxjs/Rx', "rxjs/Observable"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var message_1, http_1, core_1, Observable_1;
    var MessageService;
    return {
        setters:[
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            MessageService = (function () {
                function MessageService(_http) {
                    this._http = _http;
                    this.messages = [];
                    this.messageIsEdit = new core_1.EventEmitter();
                }
                MessageService.prototype.addMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/message', body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var message = new message_1.Message(data.content, data._id, 'Dummy', null);
                        return message;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.getMessage = function () {
                    return this._http.get('http://localhost:3000/message')
                        .map(function (response) {
                        var data = response.json().obj;
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var message = new message_1.Message(data[i].content, data[i]._id, 'Dummy', null);
                            objs.push(message);
                        }
                        ;
                        return objs;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.updateMessage = function () {
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messageIsEdit.emit(message);
                    // this.messages[this.messages.indexOf(message)] = new Message('Edited', null, 'Dummy');
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                };
                MessageService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MessageService);
                return MessageService;
            }());
            exports_2("MessageService", MessageService);
        }
    }
});
System.register("messages/message.component", ["angular2/core", "messages/message", "messages/message.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, message_2, message_service_1;
    var MessageComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (message_2_1) {
                message_2 = message_2_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            }],
        execute: function() {
            MessageComponent = (function () {
                function MessageComponent(_messageService) {
                    this._messageService = _messageService;
                    this.editClicked = new core_2.EventEmitter();
                }
                MessageComponent.prototype.onEdit = function () {
                    this._messageService.editMessage(this.message);
                };
                MessageComponent.prototype.onDelete = function () {
                    this._messageService.deleteMessage(this.message);
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', message_2.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_2.Component({
                        selector: 'my-message',
                        template: "\n                <article class=\"panel panel-default\" >\n                    <div class=\"panel-body\">\n                    {{ message.content }}\n            \n                    </div> \n                    <footer class=\"panel-footer\">\n                        <div class=\"author\">\n                            {{ message.username}}\n                        </div>\n                        <div class=\"config\">\n                            <a (click)=\"onEdit()\">Edit</a>\n                            <a (click)=\"onDelete()\">Delete</a>\n                        </div>\n                    </footer>\n                </article>\n",
                        styles: ["\n    .author {\n        display: inline-block;\n        font-style: italic;\n        font-size: 12px;\n        width: 80%;\n        \n    }\n    .config {\n        display: inline-block;\n        text-align: right;\n        font-size: 12px;\n        width: 19%;\n    }\n"]
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_3("MessageComponent", MessageComponent);
        }
    }
});
System.register("messages/message-list.component", ["angular2/src/core/metadata", "messages/message.component", "messages/message.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var metadata_1, message_component_1, message_service_2;
    var MessageListComponent;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_service_2_1) {
                message_service_2 = message_service_2_1;
            }],
        execute: function() {
            MessageListComponent = (function () {
                function MessageListComponent(_messageService) {
                    this._messageService = _messageService;
                    this.messages = [];
                }
                MessageListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.getMessage()
                        .subscribe(function (messages) {
                        _this.messages = messages;
                        _this._messageService.messages = messages;
                    });
                };
                MessageListComponent = __decorate([
                    metadata_1.Component({
                        selector: 'my-message-list',
                        template: "\n            <section class=\"col-md-8 col-md-offset-2\">\n            <my-message *ngFor=\"#message of messages\" [message]=\"message\" (editClicked)=\"message.content = $event\" ></my-message>\n            </section>\n",
                        directives: [message_component_1.MessageComponent]
                    }), 
                    __metadata('design:paramtypes', [message_service_2.MessageService])
                ], MessageListComponent);
                return MessageListComponent;
            }());
            exports_4("MessageListComponent", MessageListComponent);
        }
    }
});
System.register("messages/message-input.component", ["angular2/src/core/metadata", "messages/message", "messages/message.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var metadata_2, message_3, message_service_3;
    var MessageInputComponent;
    return {
        setters:[
            function (metadata_2_1) {
                metadata_2 = metadata_2_1;
            },
            function (message_3_1) {
                message_3 = message_3_1;
            },
            function (message_service_3_1) {
                message_service_3 = message_service_3_1;
            }],
        execute: function() {
            MessageInputComponent = (function () {
                function MessageInputComponent(_messageService) {
                    this._messageService = _messageService;
                    this.message = null;
                }
                MessageInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    if (this.message) {
                        //Edit
                        this.message.content = form.content;
                        this.message = null;
                    }
                    else {
                        var message = new message_3.Message(form.content, null, 'Dummy');
                        this._messageService.addMessage(message)
                            .subscribe(function (data) {
                            console.log(data);
                            _this._messageService.messages.push(data);
                        }, function (error) { return console.error(error); });
                    }
                };
                MessageInputComponent.prototype.onCreate = function (content) {
                };
                MessageInputComponent.prototype.onCancel = function () {
                    this.message = null;
                };
                MessageInputComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.messageIsEdit.subscribe(function (message) {
                        _this.message = message;
                    });
                };
                MessageInputComponent = __decorate([
                    metadata_2.Component({
                        selector: 'my-message-input',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n            <div class=\"form-group\">\n                <label for=\"content\">Content</label>\n                <input ngControl=\"content\" type=\"text\" class=\"form-control\" id=\"content\" #input [value]=\"message?.content\">\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onCreate(input.value)\"> {{!message ? 'Send Message' : 'Save Message'}}</button>\n            <button type=\"button\" (click)=\"onCancel()\" *ngIf=\"message\" class=\"btn btn-danger\">Cancel</button>\n            </form>\n        </section>\n",
                    }), 
                    __metadata('design:paramtypes', [message_service_3.MessageService])
                ], MessageInputComponent);
                return MessageInputComponent;
            }());
            exports_5("MessageInputComponent", MessageInputComponent);
        }
    }
});
System.register("header.component", ["angular2/core", "angular2/router"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_3, router_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent = __decorate([
                    core_3.Component({
                        selector: 'my-header',
                        template: "\n<header class=\"row\">\n    <nav class=\"col-md-8 col-md-offset-2\">\n        <ul class=\"nav nav-pills\">\n        <li><a [routerLink]=\"['Messages']\">Messenger</a></li>\n        <li><a [routerLink]=\"['Auth']\">Authentication</a></li>\n       </ul>\n    </nav>\n</header>\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        styles: ["\n        header {\n            margin-bottom: 20px;\n        }\n        ul {\n            text-align: center;\n        }\n        li {\n            float: none;\n            display: inline-block;\n        }\n        .router-link-active {\n            background-color: #00B7FF;\n            color: whitesmoke;\n        }\n"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_6("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("messages/messages.component", ["angular2/core", "messages/message-list.component", "messages/message-input.component"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_4, message_list_component_1, message_input_component_1;
    var MessagesComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (message_list_component_1_1) {
                message_list_component_1 = message_list_component_1_1;
            },
            function (message_input_component_1_1) {
                message_input_component_1 = message_input_component_1_1;
            }],
        execute: function() {
            MessagesComponent = (function () {
                function MessagesComponent() {
                }
                MessagesComponent = __decorate([
                    core_4.Component({
                        selector: 'my-messages',
                        template: "\n        <div class=\"row spacing\">\n            <my-message-input></my-message-input>\n        </div>\n        <div class=\"row spacing\">\n            <my-message-list></my-message-list>\n        </div>\n",
                        directives: [message_list_component_1.MessageListComponent, message_input_component_1.MessageInputComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessagesComponent);
                return MessagesComponent;
            }());
            exports_7("MessagesComponent", MessagesComponent);
        }
    }
});
System.register("auth/signup.component", ["angular2/core", "angular2/common"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_5, common_1;
    var SignupComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(_fb) {
                    this._fb = _fb;
                }
                SignupComponent.prototype.onSubmit = function () {
                    console.log(this.myForm.value);
                };
                SignupComponent.prototype.ngOnInit = function () {
                    this.myForm = this._fb.group({
                        firstName: ['', common_1.Validators.required],
                        lastName: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.required],
                        password: ['', common_1.Validators.required]
                    });
                };
                SignupComponent.prototype.isEmail = function (control) {
                    if (!control.value.match()) {
                        return { invalidMail: true };
                    }
                };
                SignupComponent = __decorate([
                    core_5.Component({
                        selector: 'my-signup',
                        template: "\n    <section class=\"col-md-8 col-md-offset-2\">\n    <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n        <label for=\"firstName\">First Name</label>\n        <input [ngFormControl]=\"myForm.find('firstName')\" type=\"text\" id=\"firstName\" class=\"form-control\">\n        </div>    \n        <div class=\"form-group\">\n        <label for=\"lastName\">Last Name</label>\n        <input [ngFormControl]=\"myForm.find('lastName')\" type=\"text\" id=\"lastName\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n        <label for=\"email\">Mail</label>\n        <input [ngFormControl]=\"myForm.find('email')\" type=\"email\" id=\"email\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n        </div>   \n        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign Up</button>\n    </form>\n</section>"
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_8("SignupComponent", SignupComponent);
        }
    }
});
System.register("auth/signin.component", ["angular2/core", "angular2/common"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_6, common_2;
    var SigninComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            }],
        execute: function() {
            SigninComponent = (function () {
                function SigninComponent(_fb) {
                    this._fb = _fb;
                }
                SigninComponent.prototype.onSubmit = function () {
                    console.log(this.myForm.value);
                };
                SigninComponent.prototype.ngOnInit = function () {
                    this.myForm = this._fb.group({
                        email: ['', common_2.Validators.required],
                        password: ['', common_2.Validators.required]
                    });
                };
                SigninComponent.prototype.isEmail = function (control) {
                    if (!control.value.match()) {
                        return { invalidMail: true };
                    }
                };
                SigninComponent = __decorate([
                    core_6.Component({
                        selector: 'my-sign-in',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n    <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n        <label for=\"email\">Mail</label>\n        <input [ngFormControl]=\"myForm.find('email')\" type=\"email\" id=\"email\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n        </div>   \n        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign In</button>\n    </form>\n</section>\n"
                    }), 
                    __metadata('design:paramtypes', [common_2.FormBuilder])
                ], SigninComponent);
                return SigninComponent;
            }());
            exports_9("SigninComponent", SigninComponent);
        }
    }
});
System.register("auth/logout.component", ["angular2/core"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_7;
    var LogoutComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent() {
                }
                LogoutComponent.prototype.onLogout = function () {
                };
                LogoutComponent = __decorate([
                    core_7.Component({
                        selector: 'my-logout',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <button class=\"btn btn-info\" (click)=\"onLogout()\">Logout</button>\n</section>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_10("LogoutComponent", LogoutComponent);
        }
    }
});
System.register("auth/authentication.component", ["angular2/core", "auth/signup.component", "angular2/router", "auth/signin.component", "auth/logout.component"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_8, signup_component_1, router_2, signin_component_1, logout_component_1;
    var AuthenticationComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (signin_component_1_1) {
                signin_component_1 = signin_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            }],
        execute: function() {
            AuthenticationComponent = (function () {
                function AuthenticationComponent() {
                }
                AuthenticationComponent = __decorate([
                    core_8.Component({
                        selector: 'my-auth',
                        template: "\n      <header class=\"row spacing\">\n      <nav class=\"col-md-8 col-md-offset-2\">\n      <ul class=\"nav nav-tabs\">\n      <li><a [routerLink]=\"['Signup']\">Signup</a></li>\n      <li><a [routerLink]=\"['Signin']\">Signin</a></li>\n      <li><a [routerLink]=\"['Logout']\">Logout</a></li>\n      \n</ul>\n</nav>\n</header>\n<div class=\"row spacing\">\n<router-outlet></router-outlet>\n</div>\n",
                        directives: [signup_component_1.SignupComponent, router_2.ROUTER_DIRECTIVES],
                        styles: ["\n    .router-link-active {\n        color: #750fbf;\n        cursor: default;\n        background-color: #00B7FF;\n        border: 1px solid #ddd;\n        border-bottom-color: transparent;\n    }\n"]
                    }),
                    router_2.RouteConfig([
                        { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent, useAsDefault: true },
                        { path: '/signin', name: 'Signin', component: signin_component_1.SigninComponent },
                        { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AuthenticationComponent);
                return AuthenticationComponent;
            }());
            exports_11("AuthenticationComponent", AuthenticationComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "header.component", "angular2/router", "messages/messages.component", "auth/authentication.component"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_9, header_component_1, router_3, messages_component_1, authentication_component_1, router_4;
    var AppComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
                router_4 = router_3_1;
            },
            function (messages_component_1_1) {
                messages_component_1 = messages_component_1_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_9.Component({
                        selector: 'my-app',
                        template: "  \n       <div class=\"container\">\n       <my-header></my-header>\n       <router-outlet></router-outlet>\n</div>\n    ",
                        directives: [router_4.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }),
                    router_3.RouteConfig([
                        { path: '/', name: 'Messages', component: messages_component_1.MessagesComponent, useAsDefault: true },
                        { path: '/auth/...', name: 'Auth', component: authentication_component_1.AuthenticationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_12("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "angular2/http", "messages/message.service", "angular2/src/router/router_providers", "angular2/core", "angular2/router"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var browser_1, app_component_1, http_2, message_service_4, router_providers_1, core_10, router_5, router_6;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (message_service_4_1) {
                message_service_4 = message_service_4_1;
            },
            function (router_providers_1_1) {
                router_providers_1 = router_providers_1_1;
            },
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
                router_6 = router_5_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_2.HTTP_PROVIDERS, message_service_4.MessageService, router_providers_1.ROUTER_PROVIDERS, core_10.provide(router_5.LocationStrategy, { useClass: router_6.HashLocationStrategy })]);
        }
    }
});
System.register("auth/auth.service", ["angular2/core"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_11;
    var LogoutComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent() {
                }
                LogoutComponent.prototype.onLogout = function () {
                };
                LogoutComponent = __decorate([
                    core_11.Component({
                        selector: 'my-logout',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <button class=\"btn btn-danger\" (click)=\"onLogout()\">Logout</button>\n</section>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_14("LogoutComponent", LogoutComponent);
        }
    }
});
System.register("auth/user", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(email, password, firstName, lastName) {
                    this.email = email;
                    this.password = password;
                    this.lastName = lastName;
                }
                return User;
            }());
            exports_15("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudC50cyIsImhlYWRlci5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnQudHMiLCJhdXRoL3NpZ251cC5jb21wb25lbnQudHMiLCJhdXRoL3NpZ25pbi5jb21wb25lbnQudHMiLCJhdXRoL2xvZ291dC5jb21wb25lbnQudHMiLCJhdXRoL2F1dGhlbnRpY2F0aW9uLmNvbXBvbmVudC50cyIsImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIiwiYXV0aC9hdXRoLnNlcnZpY2UudHMiLCJhdXRoL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUFBO2dCQU1JLGlCQUFhLE9BQWUsRUFBRSxTQUFrQixFQUFFLFFBQWlCLEVBQUUsTUFBZTtvQkFDaEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO29CQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQ0wsY0FBQztZQUFELENBWkEsQUFZQyxJQUFBO1lBWkQsNkJBWUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ0hEO2dCQUdJLHdCQUFvQixLQUFXO29CQUFYLFVBQUssR0FBTCxLQUFLLENBQU07b0JBRi9CLGFBQVEsR0FBYyxFQUFFLENBQUM7b0JBQ3pCLGtCQUFhLEdBQUcsSUFBSSxtQkFBWSxFQUFXLENBQUM7Z0JBQ1YsQ0FBQztnQkFDbkMsbUNBQVUsR0FBVixVQUFXLE9BQWdC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S0FBYSxFQUFTLFFBQWdCLEVBQUUsU0FBa0IsRUFBUyxRQUFpQjtvQkFBcEYsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO29CQUE2QixhQUFRLEdBQVIsUUFBUSxDQUFTO2dCQUV4RyxDQUFDO2dCQUNMLFdBQUM7WUFBRCxDQUxBLEFBS0MsSUFBQTtZQUxELHdCQUtDLENBQUEiLCJmaWxlIjoiLi4vLi4vLi4vY2wtZmluYWwtcHJvamVjdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XHJcbiAgICB1c2VySWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoY29udGVudDogc3RyaW5nLCBtZXNzYWdlSWQ/OiBzdHJpbmcsIHVzZXJuYW1lPzogc3RyaW5nLCB1c2VySWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMubWVzc2FnZUlkID0gbWVzc2FnZUlkO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xyXG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQgJ3J4anMvUngnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xyXG4gICAgbWVzc2FnZXMgOk1lc3NhZ2VbXSA9IFtdO1xyXG4gICAgbWVzc2FnZUlzRWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8TWVzc2FnZT4oKTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9XHJcbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UnLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGRhdGEuY29udGVudCwgZGF0YS5faWQsICdEdW1teScsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZScpXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZShkYXRhW2ldLmNvbnRlbnQsIGRhdGFbaV0uX2lkLCAnRHVtbXknLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ianM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTWVzc2FnZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBlZGl0TWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZUlzRWRpdC5lbWl0KG1lc3NhZ2UpO1xyXG5cclxuICAgICAgIC8vIHRoaXMubWVzc2FnZXNbdGhpcy5tZXNzYWdlcy5pbmRleE9mKG1lc3NhZ2UpXSA9IG5ldyBNZXNzYWdlKCdFZGl0ZWQnLCBudWxsLCAnRHVtbXknKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzLnNwbGljZSh0aGlzLm1lc3NhZ2VzLmluZGV4T2YobWVzc2FnZSksIDEpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XHJcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UuY29udGVudCB9fVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cInBhbmVsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLnVzZXJuYW1lfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkVkaXQoKVwiPkVkaXQ8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwib25EZWxldGUoKVwiPkRlbGV0ZTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgICAgICAgICA8L2FydGljbGU+XHJcbmAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAuYXV0aG9yIHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICB3aWR0aDogODAlO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLmNvbmZpZyB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICB3aWR0aDogMTklO1xyXG4gICAgfVxyXG5gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSBtZXNzYWdlOiBNZXNzYWdlO1xyXG4gICAgQE91dHB1dCgpIGVkaXRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRWRpdCgpIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5lZGl0TWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgb25EZWxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZGVsZXRlTWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YVwiO1xyXG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xyXG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICAgICAgPG15LW1lc3NhZ2UgKm5nRm9yPVwiI21lc3NhZ2Ugb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtZXNzYWdlXCIgKGVkaXRDbGlja2VkKT1cIm1lc3NhZ2UuY29udGVudCA9ICRldmVudFwiID48L215LW1lc3NhZ2U+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuYCxcclxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSl7XHJcblxyXG4gICAgfVxyXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IFtdO1xyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZ2V0TWVzc2FnZSgpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9ICBtZXNzYWdlcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGFcIjtcclxuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XHJcbmltcG9ydCB7SHR0cH0gZnJvbSBcImFuZ3VsYXIyL2h0dHBcIjtcclxuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7T25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktbWVzc2FnZS1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uU3VibWl0KGYudmFsdWUpXCIgI2Y9XCJuZ0Zvcm1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb250ZW50XCI+Q29udGVudDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgbmdDb250cm9sPVwiY29udGVudFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImNvbnRlbnRcIiAjaW5wdXQgW3ZhbHVlXT1cIm1lc3NhZ2U/LmNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlKGlucHV0LnZhbHVlKVwiPiB7eyFtZXNzYWdlID8gJ1NlbmQgTWVzc2FnZScgOiAnU2F2ZSBNZXNzYWdlJ319PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvbkNhbmNlbCgpXCIgKm5nSWY9XCJtZXNzYWdlXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiPkNhbmNlbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5gLFxyXG5cclxuXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UgPSBudWxsO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG4gICAgb25TdWJtaXQoZm9ybTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZSl7XHJcbiAgICAgICAgICAgIC8vRWRpdFxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UuY29udGVudCA9IGZvcm0uY29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZTogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKGZvcm0uY29udGVudCwgbnVsbCwgJ0R1bW15Jyk7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuYWRkTWVzc2FnZShtZXNzYWdlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UubWVzc2FnZXMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblxyXG4gICAgICAgICAgICApO31cclxuICAgIH1cclxuICAgIG9uQ3JlYXRlKGNvbnRlbnQ6IHN0cmluZylcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBvbkNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKXtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5tZXNzYWdlSXNFZGl0LnN1YnNjcmliZShcclxuICAgICAgICAgICAgbWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1oZWFkZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuPGhlYWRlciBjbGFzcz1cInJvd1wiPlxyXG4gICAgPG5hdiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxyXG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIj5cclxuICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydNZXNzYWdlcyddXCI+TWVzc2VuZ2VyPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnQXV0aCddXCI+QXV0aGVudGljYXRpb248L2E+PC9saT5cclxuICAgICAgIDwvdWw+XHJcbiAgICA8L25hdj5cclxuPC9oZWFkZXI+XHJcbmAsXHJcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIGhlYWRlciB7XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVsIHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaSB7XHJcbiAgICAgICAgICAgIGZsb2F0OiBub25lO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5yb3V0ZXItbGluay1hY3RpdmUge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBCN0ZGO1xyXG4gICAgICAgICAgICBjb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbmBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQge1xyXG5cclxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQge01lc3NhZ2VMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlLWxpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7TWVzc2FnZUlucHV0Q29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlLWlucHV0LmNvbXBvbmVudFwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktbWVzc2FnZXMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cclxuICAgICAgICAgICAgPG15LW1lc3NhZ2UtaW5wdXQ+PC9teS1tZXNzYWdlLWlucHV0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxyXG4gICAgICAgICAgICA8bXktbWVzc2FnZS1saXN0PjwvbXktbWVzc2FnZS1saXN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG5gLFxyXG4gICAgZGlyZWN0aXZlczogW01lc3NhZ2VMaXN0Q29tcG9uZW50LCBNZXNzYWdlSW5wdXRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc0NvbXBvbmVudCB7XHJcblxyXG59IiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuaW1wb3J0IHtGb3JtQnVpbGRlciwgQ29udHJvbEdyb3VwLCBWYWxpZGF0b3JzLCBDb250cm9sfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1zaWdudXAnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibXlGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ2ZpcnN0TmFtZScpXCIgdHlwZT1cInRleHRcIiBpZD1cImZpcnN0TmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgPC9kaXY+ICAgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImxhc3ROYW1lXCI+TGFzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ2xhc3ROYW1lJylcIiB0eXBlPVwidGV4dFwiIGlkPVwibGFzdE5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+TWFpbDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdlbWFpbCcpXCIgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdwYXNzd29yZCcpXCIgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgPC9kaXY+ICAgXHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIW15Rm9ybS52YWxpZFwiPlNpZ24gVXA8L2J1dHRvbj5cclxuICAgIDwvZm9ybT5cclxuPC9zZWN0aW9uPmBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWdudXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICBteUZvcm06IENvbnRyb2xHcm91cDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQoKXtcclxuICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlGb3JtLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm15Rm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcclxuICAgICAgICAgICAgZmlyc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNFbWFpbChjb250cm9sOiBDb250cm9sKTogeyBbczogc3RyaW5nXTogYm9vbGVhbiB9IHtcclxuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUubWF0Y2goKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge2ludmFsaWRNYWlsOiB0cnVlfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIENvbnRyb2xHcm91cCwgVmFsaWRhdG9ycywgQ29udHJvbH0gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktc2lnbi1pbicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibXlGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPk1haWw8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnZW1haWwnKVwiIHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiIHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PiAgIFxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFteUZvcm0udmFsaWRcIj5TaWduIEluPC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcbjwvc2VjdGlvbj5cclxuYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25pbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIG15Rm9ybTogQ29udHJvbEdyb3VwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlcikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblN1Ym1pdCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlGb3JtLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm15Rm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcclxuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNFbWFpbChjb250cm9sOiBDb250cm9sKTogeyBbczogc3RyaW5nXTogYm9vbGVhbiB9IHtcclxuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUubWF0Y2goKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge2ludmFsaWRNYWlsOiB0cnVlfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktbG9nb3V0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uTG9nb3V0KClcIj5Mb2dvdXQ8L2J1dHRvbj5cclxuPC9zZWN0aW9uPlxyXG5gXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9nb3V0Q29tcG9uZW50IHtcclxuICAgIG9uTG9nb3V0KCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQge1NpZ251cENvbXBvbmVudH0gZnJvbSBcIi4vc2lnbnVwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1JvdXRlQ29uZmlnLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xyXG5pbXBvcnQge1NpZ25pbkNvbXBvbmVudH0gZnJvbSBcIi4vc2lnbmluLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0xvZ291dENvbXBvbmVudH0gZnJvbSBcIi4vbG9nb3V0LmNvbXBvbmVudFwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktYXV0aCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICA8aGVhZGVyIGNsYXNzPVwicm93IHNwYWNpbmdcIj5cclxuICAgICAgPG5hdiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxyXG4gICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj5cclxuICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbnVwJ11cIj5TaWdudXA8L2E+PC9saT5cclxuICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbmluJ11cIj5TaWduaW48L2E+PC9saT5cclxuICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnTG9nb3V0J11cIj5Mb2dvdXQ8L2E+PC9saT5cclxuICAgICAgXHJcbjwvdWw+XHJcbjwvbmF2PlxyXG48L2hlYWRlcj5cclxuPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XHJcbjxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cclxuPC9kaXY+XHJcbmAsXHJcbiAgICBkaXJlY3RpdmVzOiBbU2lnbnVwQ29tcG9uZW50LCBST1VURVJfRElSRUNUSVZFU10sXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAucm91dGVyLWxpbmstYWN0aXZlIHtcclxuICAgICAgICBjb2xvcjogIzc1MGZiZjtcclxuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwQjdGRjtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgfVxyXG5gXVxyXG59KVxyXG5AUm91dGVDb25maWcoW1xyXG4gICAge3BhdGg6ICcvc2lnbnVwJywgbmFtZTogJ1NpZ251cCcsIGNvbXBvbmVudDogU2lnbnVwQ29tcG9uZW50LCB1c2VBc0RlZmF1bHQ6IHRydWV9LFxyXG4gICAge3BhdGg6ICcvc2lnbmluJywgbmFtZTogJ1NpZ25pbicsIGNvbXBvbmVudDogU2lnbmluQ29tcG9uZW50fSxcclxuICAgIHtwYXRoOiAnL2xvZ291dCcsIG5hbWU6ICdMb2dvdXQnLCBjb21wb25lbnQ6IExvZ291dENvbXBvbmVudH1cclxuXSlcclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uQ29tcG9uZW50IHtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge0hlYWRlckNvbXBvbmVudH0gZnJvbSBcIi4vaGVhZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZ30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtNZXNzYWdlc0NvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYCAgXG4gICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgIDxteS1oZWFkZXI+PC9teS1oZWFkZXI+XG4gICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIEhlYWRlckNvbXBvbmVudF1cbn0pXG5AUm91dGVDb25maWcoW1xuICAgIHtwYXRoOiAnLycsIG5hbWU6ICdNZXNzYWdlcycsIGNvbXBvbmVudDogTWVzc2FnZXNDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG4gICAge3BhdGg6ICcvYXV0aC8uLi4nLCBuYW1lOiAnQXV0aCcsIGNvbXBvbmVudDogQXV0aGVudGljYXRpb25Db21wb25lbnR9XG5dKVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cblxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1JPVVRFUl9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNcIjtcbmltcG9ydCB7cHJvdmlkZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtIYXNoTG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5ib290c3RyYXAoQXBwQ29tcG9uZW50LCBbSFRUUF9QUk9WSURFUlMsIE1lc3NhZ2VTZXJ2aWNlLCBST1VURVJfUFJPVklERVJTLCBwcm92aWRlKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogSGFzaExvY2F0aW9uU3RyYXRlZ3l9KV0pOyIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktbG9nb3V0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiAoY2xpY2spPVwib25Mb2dvdXQoKVwiPkxvZ291dDwvYnV0dG9uPlxyXG48L3NlY3Rpb24+XHJcbmBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dvdXRDb21wb25lbnQge1xyXG4gICAgb25Mb2dvdXQoKSB7XHJcblxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFVzZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgZW1haWw6IHN0cmluZywgcHVibGljIHBhc3N3b3JkOiBzdHJpbmcsIGZpcnN0TmFtZT86IHN0cmluZywgcHVibGljIGxhc3ROYW1lPzogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
