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
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : " ";
                    return this._http.post('http://localhost:3000/message' + token, body, { headers: headers })
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
                MessageService.prototype.updateMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.patch('http://localhost:3000/message/' + message.messageId, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messageIsEdit.emit(message);
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                    return this._http.delete('http://localhost:3000/message/' + message.messageId)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
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
                    this._messageService.deleteMessage(this.message)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
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
                        this._messageService.updateMessage(this.message)
                            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
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
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n            <div class=\"form-group\">\n                <label for=\"content\">Content</label>\n                <input ngControl=\"content\" type=\"text\" class=\"form-control\" id=\"content\" #input [ngModel]=\"message?.content\">\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onCreate(input.value)\"> {{!message ? 'Send Message' : 'Save Message'}}</button>\n            <button type=\"button\" (click)=\"onCancel()\" *ngIf=\"message\" class=\"btn btn-danger\">Cancel</button>\n            </form>\n        </section>\n",
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
System.register("auth/user", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(email, password, firstName, lastName) {
                    this.email = email;
                    this.password = password;
                    this.firstName = firstName;
                    this.lastName = lastName;
                }
                return User;
            }());
            exports_8("User", User);
        }
    }
});
System.register("auth/auth.service", ["angular2/core", "angular2/http", "angular2/src/http/headers", "rxjs/Observable", 'rxjs/Rx'], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_5, http_2, headers_1, Observable_2;
    var AuthService;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            },
            function (_2) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(_http) {
                    this._http = _http;
                }
                AuthService.prototype.signup = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new headers_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/user', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                AuthService.prototype.signin = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new headers_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/user/signin', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                AuthService.prototype.logout = function () {
                    localStorage.clear();
                };
                AuthService.prototype.isLoggedIn = function () {
                    return localStorage.getItem('token') !== null;
                };
                AuthService = __decorate([
                    core_5.Injectable(), 
                    __metadata('design:paramtypes', [http_2.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_9("AuthService", AuthService);
        }
    }
});
System.register("auth/signup.component", ["angular2/core", "angular2/common", "auth/user", "auth/auth.service"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_6, common_1, user_1, auth_service_1;
    var SignupComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(_fb, _authService) {
                    this._fb = _fb;
                    this._authService = _authService;
                }
                SignupComponent.prototype.onSubmit = function () {
                    var user = new user_1.User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
                    this._authService.signup(user)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
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
                    core_6.Component({
                        selector: 'my-signup',
                        template: "\n    <section class=\"col-md-8 col-md-offset-2\">\n    <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n        <label for=\"firstName\">First Name</label>\n        <input [ngFormControl]=\"myForm.find('firstName')\" type=\"text\" id=\"firstName\" class=\"form-control\">\n        </div>    \n        <div class=\"form-group\">\n        <label for=\"lastName\">Last Name</label>\n        <input [ngFormControl]=\"myForm.find('lastName')\" type=\"text\" id=\"lastName\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n        <label for=\"email\">Mail</label>\n        <input [ngFormControl]=\"myForm.find('email')\" type=\"email\" id=\"email\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n        </div>   \n        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign Up</button>\n    </form>\n</section>"
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_10("SignupComponent", SignupComponent);
        }
    }
});
System.register("auth/signin.component", ["angular2/core", "angular2/common", "auth/user", "auth/auth.service", "angular2/router"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_7, common_2, user_2, auth_service_2, router_2;
    var SigninComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (user_2_1) {
                user_2 = user_2_1;
            },
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            SigninComponent = (function () {
                function SigninComponent(_fb, _authService, _router) {
                    this._fb = _fb;
                    this._authService = _authService;
                    this._router = _router;
                }
                SigninComponent.prototype.onSubmit = function () {
                    var _this = this;
                    var user = new user_2.User(this.myForm.value.email, this.myForm.value.password);
                    this._authService.signin(user)
                        .subscribe(function (data) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userId', data.userId);
                        _this._router.navigateByUrl('/');
                    }, function (error) { return console.error(error); });
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
                    core_7.Component({
                        selector: 'my-sign-in',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n    <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n        <label for=\"email\">Mail</label>\n        <input [ngFormControl]=\"myForm.find('email')\" type=\"email\" id=\"email\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n        </div>   \n        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign In</button>\n    </form>\n</section>\n"
                    }), 
                    __metadata('design:paramtypes', [common_2.FormBuilder, auth_service_2.AuthService, router_2.Router])
                ], SigninComponent);
                return SigninComponent;
            }());
            exports_11("SigninComponent", SigninComponent);
        }
    }
});
System.register("auth/logout.component", ["angular2/core", "auth/auth.service", "angular2/router"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_8, auth_service_3, router_3;
    var LogoutComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (auth_service_3_1) {
                auth_service_3 = auth_service_3_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent(_authService, _router) {
                    this._authService = _authService;
                    this._router = _router;
                }
                LogoutComponent.prototype.onLogout = function () {
                    this._authService.logout();
                    this._router.navigate(['Signin']);
                };
                LogoutComponent = __decorate([
                    core_8.Component({
                        selector: 'my-logout',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <button class=\"btn btn-info\" (click)=\"onLogout()\">Logout</button>\n</section>\n"
                    }), 
                    __metadata('design:paramtypes', [auth_service_3.AuthService, router_3.Router])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_12("LogoutComponent", LogoutComponent);
        }
    }
});
System.register("auth/authentication.component", ["angular2/core", "auth/signup.component", "angular2/router", "auth/signin.component", "auth/logout.component", "auth/auth.service"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_9, signup_component_1, router_4, signin_component_1, logout_component_1, auth_service_4;
    var AuthenticationComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (signin_component_1_1) {
                signin_component_1 = signin_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            },
            function (auth_service_4_1) {
                auth_service_4 = auth_service_4_1;
            }],
        execute: function() {
            AuthenticationComponent = (function () {
                function AuthenticationComponent(_authService) {
                    this._authService = _authService;
                }
                AuthenticationComponent.prototype.isLoggedIn = function () {
                    return this._authService.isLoggedIn();
                };
                AuthenticationComponent = __decorate([
                    core_9.Component({
                        selector: 'my-auth',
                        template: "\n      <header class=\"row spacing\">\n      <nav class=\"col-md-8 col-md-offset-2\">\n      <ul class=\"nav nav-tabs\">\n      <li><a [routerLink]=\"['Signup']\">Signup</a></li>\n      <li><a [routerLink]=\"['Signin']\" *ngIf=\"!isLoggedIn()\">Signin</a></li>\n      <li><a [routerLink]=\"['Logout']\" *ngIf=\"isLoggedIn()\">Logout</a></li>\n      \n</ul>\n</nav>\n</header>\n<div class=\"row spacing\">\n<router-outlet></router-outlet>\n</div>\n",
                        directives: [signup_component_1.SignupComponent, router_4.ROUTER_DIRECTIVES],
                        styles: ["\n    .router-link-active {\n        color: #750fbf;\n        cursor: default;\n        background-color: #00B7FF;\n        border: 1px solid #ddd;\n        border-bottom-color: transparent;\n    }\n"]
                    }),
                    router_4.RouteConfig([
                        { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent, useAsDefault: true },
                        { path: '/signin', name: 'Signin', component: signin_component_1.SigninComponent },
                        { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent }
                    ]), 
                    __metadata('design:paramtypes', [auth_service_4.AuthService])
                ], AuthenticationComponent);
                return AuthenticationComponent;
            }());
            exports_13("AuthenticationComponent", AuthenticationComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "header.component", "angular2/router", "messages/messages.component", "auth/authentication.component"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_10, header_component_1, router_5, messages_component_1, authentication_component_1, router_6;
    var AppComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
                router_6 = router_5_1;
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
                    core_10.Component({
                        selector: 'my-app',
                        template: "  \n       <div class=\"container\">\n       <my-header></my-header>\n       <router-outlet></router-outlet>\n</div>\n    ",
                        directives: [router_6.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }),
                    router_5.RouteConfig([
                        { path: '/', name: 'Messages', component: messages_component_1.MessagesComponent, useAsDefault: true },
                        { path: '/auth/...', name: 'Auth', component: authentication_component_1.AuthenticationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_14("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "angular2/http", "messages/message.service", "angular2/src/router/router_providers", "angular2/core", "angular2/router", "auth/auth.service"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var browser_1, app_component_1, http_3, message_service_4, router_providers_1, core_11, router_7, router_8, auth_service_5;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (message_service_4_1) {
                message_service_4 = message_service_4_1;
            },
            function (router_providers_1_1) {
                router_providers_1 = router_providers_1_1;
            },
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
                router_8 = router_7_1;
            },
            function (auth_service_5_1) {
                auth_service_5 = auth_service_5_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_3.HTTP_PROVIDERS, message_service_4.MessageService, auth_service_5.AuthService, router_providers_1.ROUTER_PROVIDERS, core_11.provide(router_7.LocationStrategy, { useClass: router_8.HashLocationStrategy })]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudC50cyIsImhlYWRlci5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnQudHMiLCJhdXRoL3VzZXIudHMiLCJhdXRoL2F1dGguc2VydmljZS50cyIsImF1dGgvc2lnbnVwLmNvbXBvbmVudC50cyIsImF1dGgvc2lnbmluLmNvbXBvbmVudC50cyIsImF1dGgvbG9nb3V0LmNvbXBvbmVudC50cyIsImF1dGgvYXV0aGVudGljYXRpb24uY29tcG9uZW50LnRzIiwiYXBwLmNvbXBvbmVudC50cyIsImJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUFBO2dCQU1JLGlCQUFhLE9BQWUsRUFBRSxTQUFrQixFQUFFLFFBQWlCLEVBQUUsTUFBZTtvQkFDaEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO29CQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQ0wsY0FBQztZQUFELENBWkEsQUFZQyxJQUFBO1lBWkQsNkJBWUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ0hEO2dCQUdJLHdCQUFvQixLQUFXO29CQUFYLFVBQUssR0FBTCxLQUFLLENBQU07b0JBRi9CLGFBQVEsR0FBYyxFQUFFLENBQUM7b0JBQ3pCLGtCQUFhLEdBQUcsSUFBSSxtQkFBWSxFQUFXLENBQUM7Z0JBQ1YsQ0FBQztnQkFDbkMsbUNBQVUsR0FBVixVQUFXLE9BQWdC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IiwiZmlsZSI6Ii4uLy4uLy4uL2NsLWZpbmFsLXByb2plY3QvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xyXG4gICAgY29udGVudDogc3RyaW5nO1xyXG4gICAgdXNlcm5hbWU6IHN0cmluZztcclxuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xyXG4gICAgdXNlcklkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGNvbnRlbnQ6IHN0cmluZywgbWVzc2FnZUlkPzogc3RyaW5nLCB1c2VybmFtZT86IHN0cmluZywgdXNlcklkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IG1lc3NhZ2VJZDtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcclxuaW1wb3J0IHtIdHRwLCBIZWFkZXJzfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xyXG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcclxuICAgIG1lc3NhZ2VzIDpNZXNzYWdlW10gPSBbXTtcclxuICAgIG1lc3NhZ2VJc0VkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1lc3NhZ2U+KCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKSB7fVxyXG4gICAgYWRkTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTpcIiBcIjtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZScgKyB0b2tlbiAsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoZGF0YS5jb250ZW50LCBkYXRhLl9pZCwgJ0R1bW15JywgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVzc2FnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9tZXNzYWdlJylcclxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgICAgIGxldCBvYmpzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGRhdGFbaV0uY29udGVudCwgZGF0YVtpXS5faWQsICdEdW1teScsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqcztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBhdGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZS8nICsgbWVzc2FnZS5tZXNzYWdlSWQsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG4gICAgZWRpdE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VJc0VkaXQuZW1pdChtZXNzYWdlKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXMuc3BsaWNlKHRoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZGVsZXRlKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZS8nICsgbWVzc2FnZS5tZXNzYWdlSWQpXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xyXG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbWVzc2FnZS51c2VybmFtZX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwib25FZGl0KClcIj5FZGl0PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRGVsZXRlKClcIj5EZWxldGU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxyXG5gLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLmF1dGhvciB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgd2lkdGg6IDgwJTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC5jb25maWcge1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgd2lkdGg6IDE5JTtcclxuICAgIH1cclxuYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgbWVzc2FnZTogTWVzc2FnZTtcclxuICAgIEBPdXRwdXQoKSBlZGl0Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkVkaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZWRpdE1lc3NhZ2UodGhpcy5tZXNzYWdlKTtcclxuICAgIH1cclxuICAgIG9uRGVsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmRlbGV0ZU1lc3NhZ2UodGhpcy5tZXNzYWdlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhXCI7XHJcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XHJcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQge09uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxyXG4gICAgICAgICAgICA8bXktbWVzc2FnZSAqbmdGb3I9XCIjbWVzc2FnZSBvZiBtZXNzYWdlc1wiIFttZXNzYWdlXT1cIm1lc3NhZ2VcIiAoZWRpdENsaWNrZWQpPVwibWVzc2FnZS5jb250ZW50ID0gJGV2ZW50XCIgPjwvbXktbWVzc2FnZT5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG5gLFxyXG4gICAgZGlyZWN0aXZlczogW01lc3NhZ2VDb21wb25lbnRdXHJcblxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdID0gW107XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5nZXRNZXNzYWdlKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gIG1lc3NhZ2VzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VzID0gbWVzc2FnZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YVwiO1xyXG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcclxuaW1wb3J0IHtIdHRwfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xyXG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWlucHV0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIiAjZj1cIm5nRm9ybVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbnRlbnRcIj5Db250ZW50PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBuZ0NvbnRyb2w9XCJjb250ZW50XCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY29udGVudFwiICNpbnB1dCBbbmdNb2RlbF09XCJtZXNzYWdlPy5jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJvbkNyZWF0ZShpbnB1dC52YWx1ZSlcIj4ge3shbWVzc2FnZSA/ICdTZW5kIE1lc3NhZ2UnIDogJ1NhdmUgTWVzc2FnZSd9fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib25DYW5jZWwoKVwiICpuZ0lmPVwibWVzc2FnZVwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIj5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuYCxcclxuXHJcblxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuICAgIG9uU3VibWl0KGZvcm06IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAvL0VkaXRcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLmNvbnRlbnQgPSBmb3JtLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLnVwZGF0ZU1lc3NhZ2UodGhpcy5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBudWxsO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoZm9ybS5jb250ZW50LCBudWxsLCAnRHVtbXknKTtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5hZGRNZXNzYWdlKG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5tZXNzYWdlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcclxuXHJcbiAgICAgICAgICAgICk7fVxyXG4gICAgfVxyXG4gICAgb25DcmVhdGUoY29udGVudDogc3RyaW5nKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIG9uQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpe1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VJc0VkaXQuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBtZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LWhlYWRlcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG48aGVhZGVyIGNsYXNzPVwicm93XCI+XHJcbiAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiPlxyXG4gICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ01lc3NhZ2VzJ11cIj5NZXNzZW5nZXI8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydBdXRoJ11cIj5BdXRoZW50aWNhdGlvbjwvYT48L2xpPlxyXG4gICAgICAgPC91bD5cclxuICAgIDwvbmF2PlxyXG48L2hlYWRlcj5cclxuYCxcclxuICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU10sXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgaGVhZGVyIHtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWwge1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpIHtcclxuICAgICAgICAgICAgZmxvYXQ6IG5vbmU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLnJvdXRlci1saW5rLWFjdGl2ZSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMEI3RkY7XHJcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XHJcblxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7TWVzc2FnZUxpc3RDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UtbGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlcycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxyXG4gICAgICAgICAgICA8bXktbWVzc2FnZS1pbnB1dD48L215LW1lc3NhZ2UtaW5wdXQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XHJcbiAgICAgICAgICAgIDxteS1tZXNzYWdlLWxpc3Q+PC9teS1tZXNzYWdlLWxpc3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbmAsXHJcbiAgICBkaXJlY3RpdmVzOiBbTWVzc2FnZUxpc3RDb21wb25lbnQsIE1lc3NhZ2VJbnB1dENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzQ29tcG9uZW50IHtcclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgVXNlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBlbWFpbDogc3RyaW5nLCBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZywgcHVibGljIGZpcnN0TmFtZT86IHN0cmluZywgcHVibGljIGxhc3ROYW1lPzogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuaW1wb3J0IHtIdHRwfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuL3VzZXJcIjtcclxuaW1wb3J0IHtIZWFkZXJzfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2h0dHAvaGVhZGVyc1wiO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuQEluamVjdGFibGUoKVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKXtcclxuXHJcbiAgICB9XHJcbiAgICBzaWdudXAodXNlcjogVXNlcil7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHVzZXIpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcicsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG4gICAgc2lnbmluKHVzZXI6IFVzZXIpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkodXNlcik7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2VyL3NpZ25pbicsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgaXNMb2dnZWRJbigpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgIT09IG51bGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIENvbnRyb2x9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcclxuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuL2F1dGguc2VydmljZVwiO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktc2lnbnVwJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxyXG4gICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cIm15Rm9ybVwiIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwiZmlyc3ROYW1lXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdmaXJzdE5hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaXJzdE5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PiAgICBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdsYXN0TmFtZScpXCIgdHlwZT1cInRleHRcIiBpZD1cImxhc3ROYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPk1haWw8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnZW1haWwnKVwiIHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiIHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PiAgIFxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFteUZvcm0udmFsaWRcIj5TaWduIFVwPC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcbjwvc2VjdGlvbj5gXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbnVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgbXlGb3JtOiBDb250cm9sR3JvdXA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQoKXtcclxuICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih0aGlzLm15Rm9ybS52YWx1ZS5lbWFpbCwgdGhpcy5teUZvcm0udmFsdWUucGFzc3dvcmQsIHRoaXMubXlGb3JtLnZhbHVlLmZpcnN0TmFtZSwgdGhpcy5teUZvcm0udmFsdWUubGFzdE5hbWUgKTtcclxuICAgICAgICB0aGlzLl9hdXRoU2VydmljZS5zaWdudXAodXNlcilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5teUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzRW1haWwoY29udHJvbDogQ29udHJvbCk6IHsgW3M6IHN0cmluZ106IGJvb2xlYW4gfSB7XHJcbiAgICAgICAgaWYgKCFjb250cm9sLnZhbHVlLm1hdGNoKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIENvbnRyb2x9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcclxuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktc2lnbi1pbicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibXlGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPk1haWw8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnZW1haWwnKVwiIHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiIHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIDwvZGl2PiAgIFxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFteUZvcm0udmFsaWRcIj5TaWduIEluPC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcbjwvc2VjdGlvbj5cclxuYFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25pbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIG15Rm9ybTogQ29udHJvbEdyb3VwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblN1Ym1pdCgpe1xyXG4gICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHRoaXMubXlGb3JtLnZhbHVlLmVtYWlsLCB0aGlzLm15Rm9ybS52YWx1ZS5wYXNzd29yZCApO1xyXG4gICAgICAgIHRoaXMuX2F1dGhTZXJ2aWNlLnNpZ25pbih1c2VyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJJZCcsIGRhdGEudXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGVCeVVybCgnLycpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubXlGb3JtID0gdGhpcy5fZmIuZ3JvdXAoe1xyXG4gICAgICAgICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0VtYWlsKGNvbnRyb2w6IENvbnRyb2wpOiB7IFtzOiBzdHJpbmddOiBib29sZWFuIH0ge1xyXG4gICAgICAgIGlmICghY29udHJvbC52YWx1ZS5tYXRjaCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7aW52YWxpZE1haWw6IHRydWV9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktbG9nb3V0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uTG9nb3V0KClcIj5Mb2dvdXQ8L2J1dHRvbj5cclxuPC9zZWN0aW9uPlxyXG5gXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9nb3V0Q29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKXt9XHJcbiAgICBvbkxvZ291dCgpIHtcclxuICAgICAgICB0aGlzLl9hdXRoU2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWydTaWduaW4nXSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuaW1wb3J0IHtTaWdudXBDb21wb25lbnR9IGZyb20gXCIuL3NpZ251cC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtSb3V0ZUNvbmZpZywgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuaW1wb3J0IHtTaWduaW5Db21wb25lbnR9IGZyb20gXCIuL3NpZ25pbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtMb2dvdXRDb21wb25lbnR9IGZyb20gXCIuL2xvZ291dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1hdXRoJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxyXG4gICAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiPlxyXG4gICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydTaWdudXAnXVwiPlNpZ251cDwvYT48L2xpPlxyXG4gICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydTaWduaW4nXVwiICpuZ0lmPVwiIWlzTG9nZ2VkSW4oKVwiPlNpZ25pbjwvYT48L2xpPlxyXG4gICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydMb2dvdXQnXVwiICpuZ0lmPVwiaXNMb2dnZWRJbigpXCI+TG9nb3V0PC9hPjwvbGk+XHJcbiAgICAgIFxyXG48L3VsPlxyXG48L25hdj5cclxuPC9oZWFkZXI+XHJcbjxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxyXG48cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XHJcbjwvZGl2PlxyXG5gLFxyXG4gICAgZGlyZWN0aXZlczogW1NpZ251cENvbXBvbmVudCwgUk9VVEVSX0RJUkVDVElWRVNdLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLnJvdXRlci1saW5rLWFjdGl2ZSB7XHJcbiAgICAgICAgY29sb3I6ICM3NTBmYmY7XHJcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMEI3RkY7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIH1cclxuYF1cclxufSlcclxuQFJvdXRlQ29uZmlnKFtcclxuICAgIHtwYXRoOiAnL3NpZ251cCcsIG5hbWU6ICdTaWdudXAnLCBjb21wb25lbnQ6IFNpZ251cENvbXBvbmVudCwgdXNlQXNEZWZhdWx0OiB0cnVlfSxcclxuICAgIHtwYXRoOiAnL3NpZ25pbicsIG5hbWU6ICdTaWduaW4nLCBjb21wb25lbnQ6IFNpZ25pbkNvbXBvbmVudH0sXHJcbiAgICB7cGF0aDogJy9sb2dvdXQnLCBuYW1lOiAnTG9nb3V0JywgY29tcG9uZW50OiBMb2dvdXRDb21wb25lbnR9XHJcbl0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2Upe31cclxuXHJcbiAgICBpc0xvZ2dlZEluKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRoU2VydmljZS5pc0xvZ2dlZEluKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge0hlYWRlckNvbXBvbmVudH0gZnJvbSBcIi4vaGVhZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZ30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtNZXNzYWdlc0NvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYCAgXG4gICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgIDxteS1oZWFkZXI+PC9teS1oZWFkZXI+XG4gICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIEhlYWRlckNvbXBvbmVudF1cbn0pXG5AUm91dGVDb25maWcoW1xuICAgIHtwYXRoOiAnLycsIG5hbWU6ICdNZXNzYWdlcycsIGNvbXBvbmVudDogTWVzc2FnZXNDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG4gICAge3BhdGg6ICcvYXV0aC8uLi4nLCBuYW1lOiAnQXV0aCcsIGNvbXBvbmVudDogQXV0aGVudGljYXRpb25Db21wb25lbnR9XG5dKVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cblxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1JPVVRFUl9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNcIjtcbmltcG9ydCB7cHJvdmlkZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtIYXNoTG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC9hdXRoLnNlcnZpY2VcIjtcblxuYm9vdHN0cmFwKEFwcENvbXBvbmVudCwgW0hUVFBfUFJPVklERVJTLCBNZXNzYWdlU2VydmljZSwgQXV0aFNlcnZpY2UsIFJPVVRFUl9QUk9WSURFUlMsIHByb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneX0pXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
