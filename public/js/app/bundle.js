var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("header.component", ["angular2/core", "angular2/router"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'my-header',
                        template: "\n<header class=\"row\">\n    <nav class=\"col-md-8 col-md-offset-2\">\n        <ul class=\"nav nav-pills\">\n        <li><a [routerLink]=\"['Exercises']\">Exercises</a></li>\n        <li><a [routerLink]=\"['Auth']\">Authentication</a></li>\n       </ul>\n    </nav>\n</header>\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        styles: ["\n        header {\n            margin-bottom: 20px;\n        }\n        ul {\n            text-align: center;\n        }\n        li {\n            float: none;\n            display: inline-block;\n        }\n        .router-link-active {\n            background-color: #00B7FF;\n            color: whitesmoke;\n        }\n"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("messages/message", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
            exports_2("Message", Message);
        }
    }
});
System.register("messages/message.service", ["messages/message", "angular2/http", "angular2/core", 'rxjs/Rx', "rxjs/Observable"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var message_1, http_1, core_2, Observable_1;
    var MessageService;
    return {
        setters:[
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
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
                    this.messageIsEdit = new core_2.EventEmitter();
                }
                MessageService.prototype.addMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : " ";
                    return this._http.post('http://localhost:3000/message' + token, body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var message = new message_1.Message(data.content, data._id, data.user.firstName, data.user._id);
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
                            var message = new message_1.Message(data[i].content, data[i]._id, data[i].user.firstName, data[i].user._id);
                            objs.push(message);
                        }
                        ;
                        return objs;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error); });
                };
                MessageService.prototype.updateMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : " ";
                    return this._http.patch('http://localhost:3000/message/' + message.messageId + token, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messageIsEdit.emit(message);
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : " ";
                    return this._http.delete('http://localhost:3000/message/' + message.messageId + token)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MessageService);
                return MessageService;
            }());
            exports_3("MessageService", MessageService);
        }
    }
});
System.register("messages/message.component", ["angular2/core", "messages/message", "messages/message.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, message_2, message_service_1;
    var MessageComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
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
                    this.editClicked = new core_3.EventEmitter();
                }
                MessageComponent.prototype.onEdit = function () {
                    this._messageService.editMessage(this.message);
                };
                MessageComponent.prototype.onDelete = function () {
                    this._messageService.deleteMessage(this.message)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                };
                MessageComponent.prototype.belongsToUser = function () {
                    return localStorage.getItem('userId') == this.message.userId;
                };
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', message_2.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_3.Component({
                        selector: 'my-message',
                        template: "\n                <article class=\"panel panel-default\" >\n                    <div class=\"panel-body\">\n                    {{ message.content }}\n            \n                    </div> \n                    <footer class=\"panel-footer\">\n                        <div class=\"author\">\n                            {{ message.username}}\n                        </div>\n                        <div class=\"config\" *ngIf=\"belongsToUser()\">\n                            <a (click)=\"onEdit()\">Edit</a>\n                            <a (click)=\"onDelete()\">Delete</a>\n                        </div>\n                    </footer>\n                </article>\n",
                        styles: ["\n    .author {\n        display: inline-block;\n        font-style: italic;\n        font-size: 12px;\n        width: 80%;\n        \n    }\n    .config {\n        display: inline-block;\n        text-align: right;\n        font-size: 12px;\n        width: 19%;\n    }\n"]
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_4("MessageComponent", MessageComponent);
        }
    }
});
System.register("messages/message-list.component", ["angular2/src/core/metadata", "messages/message.component", "messages/message.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
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
            exports_5("MessageListComponent", MessageListComponent);
        }
    }
});
System.register("messages/message-input.component", ["angular2/src/core/metadata", "messages/message", "messages/message.service"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
            exports_6("MessageInputComponent", MessageInputComponent);
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
//Creates the User object for the app to use
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
            //Creates the user sign-up page
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
            //Create the sign in component
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
            //Logout the current user
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
            //Create the sign-in/sign-out component to log users in and out
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
//Defines what an exercise is and how to use it
System.register("Exercises/exercise", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Exercise;
    return {
        setters:[],
        execute: function() {
            Exercise = (function () {
                function Exercise(exName, sets, reps, weight, id) {
                    this.exName = exName;
                    this.sets = sets;
                    this.reps = reps;
                    this.weight = weight;
                    this.id = id;
                }
                return Exercise;
            }());
            exports_14("Exercise", Exercise);
        }
    }
});
System.register("Exercises/exercise.service", ["Exercises/exercise", "angular2/http", "angular2/core", 'rxjs/Rx', "rxjs/Observable"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var exercise_1, http_3, core_10, Observable_3;
    var ExerciseService;
    return {
        setters:[
            function (exercise_1_1) {
                exercise_1 = exercise_1_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (_3) {},
            function (Observable_3_1) {
                Observable_3 = Observable_3_1;
            }],
        execute: function() {
            ExerciseService = (function () {
                function ExerciseService(_http) {
                    this._http = _http;
                    this.exercises = [];
                    this.exerciseIsEdit = new core_10.EventEmitter();
                }
                ExerciseService.prototype.addExercise = function (exercise) {
                    var body = JSON.stringify(exercise);
                    var headers = new http_3.Headers({ 'Content-Type': 'application/json' });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : " ";
                    return this._http.post('http://localhost:3000/exercise' + token, body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var exercise = new exercise_1.Exercise(data.exName, data.sets, data.reps, data.weight);
                        return exercise;
                    })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                ExerciseService.prototype.getExercise = function () {
                    return this._http.get('http://localhost:3000/exercise')
                        .map(function (response) {
                        var data = response.json().obj;
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var exercise = new exercise_1.Exercise(data[i].exName, data[i].sets, data[i].reps, data[i].weight, data[i]._id);
                            objs.push(exercise);
                            console.log(data[i]);
                        }
                        ;
                        return objs;
                    })
                        .catch(function (error) { return Observable_3.Observable.throw(error); });
                };
                ExerciseService.prototype.updateExercise = function (exercise) {
                    var body = JSON.stringify(exercise);
                    var headers = new http_3.Headers({ 'Content-Type': 'application/json' });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : " ";
                    return this._http.patch('http://localhost:3000/exercise/' + exercise.id + token, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                ExerciseService.prototype.editExercise = function (exercise) {
                    this.exerciseIsEdit.emit(exercise);
                };
                ExerciseService.prototype.deleteExercise = function (exercise) {
                    this.exercises.splice(this.exercises.indexOf(exercise), 1);
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : " ";
                    return this._http.delete('http://localhost:3000/exercise/' + exercise.id + token)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                ExerciseService = __decorate([
                    core_10.Injectable(), 
                    __metadata('design:paramtypes', [http_3.Http])
                ], ExerciseService);
                return ExerciseService;
            }());
            exports_15("ExerciseService", ExerciseService);
        }
    }
});
System.register("Exercises/exercise.component", ["angular2/core", "Exercises/exercise", "Exercises/exercise.service"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_11, exercise_2, exercise_service_1;
    var ExerciseComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (exercise_2_1) {
                exercise_2 = exercise_2_1;
            },
            function (exercise_service_1_1) {
                exercise_service_1 = exercise_service_1_1;
            }],
        execute: function() {
            ExerciseComponent = (function () {
                function ExerciseComponent(_exerciseService) {
                    this._exerciseService = _exerciseService;
                    this.editClicked = new core_11.EventEmitter();
                }
                ExerciseComponent.prototype.onEdit = function () {
                    this._exerciseService.editExercise(this.exercise);
                };
                ExerciseComponent.prototype.onDelete = function () {
                    this._exerciseService.deleteExercise(this.exercise)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                };
                ExerciseComponent.prototype.belongsToUser = function () {
                    return true;
                };
                __decorate([
                    core_11.Input(), 
                    __metadata('design:type', exercise_2.Exercise)
                ], ExerciseComponent.prototype, "exercise", void 0);
                __decorate([
                    core_11.Output(), 
                    __metadata('design:type', Object)
                ], ExerciseComponent.prototype, "editClicked", void 0);
                ExerciseComponent = __decorate([
                    core_11.Component({
                        selector: 'my-exercise',
                        template: "\n                <article class=\"panel panel-default\" >\n                    <div class=\"panel-body\">\n                    <p> Exercise Name  </p>\n                      {{ exercise.exName }}\n            \n                 </div> \n                 <div class=\"author\">\n                       Number of Sets {{ exercise.sets}}\n                 </div>\n                 <div class=\"author\">\n                       {{ exercise.reps}}\n                 </div>\n                 <div class=\"author\">\n                       {{ exercise.weight}}\n                 </div>\n                 <footer class=\"panel-footer\">\n                 \n                        <div class=\"config\" *ngIf=\"belongsToUser()\">\n                            <a (click)=\"onEdit()\">Edit</a>\n                            <a (click)=\"onDelete()\">Delete</a>\n                        </div>\n                    </footer>\n                </article>\n",
                        styles: ["\n    .author {\n        display: inline-block;\n        font-style: italic;\n        font-size: 12px;\n        width: 80%;\n        \n    }\n    .config {\n        display: inline-block;\n        text-align: right;\n        font-size: 12px;\n        width: 19%;\n    }\n"]
                    }), 
                    __metadata('design:paramtypes', [exercise_service_1.ExerciseService])
                ], ExerciseComponent);
                return ExerciseComponent;
            }());
            exports_16("ExerciseComponent", ExerciseComponent);
        }
    }
});
System.register("Exercises/exercise-list.component", ["angular2/core", "Exercises/exercise.component", "Exercises/exercise.service"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_12, exercise_component_1, exercise_service_2;
    var ExerciseListComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (exercise_component_1_1) {
                exercise_component_1 = exercise_component_1_1;
            },
            function (exercise_service_2_1) {
                exercise_service_2 = exercise_service_2_1;
            }],
        execute: function() {
            ExerciseListComponent = (function () {
                function ExerciseListComponent(_exerciseService) {
                    this._exerciseService = _exerciseService;
                    this.exercises = [];
                }
                ExerciseListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('test');
                    this._exerciseService.getExercise()
                        .subscribe(function (exercises) {
                        _this.exercises = exercises;
                        _this._exerciseService.exercises = exercises;
                    });
                };
                ExerciseListComponent = __decorate([
                    core_12.Component({
                        selector: 'my-exercise-list',
                        template: "\n            <section class=\"col-md-8 col-md-offset-2\">\n            <my-exercise *ngFor=\"#exercise of exercises\" [exercise]=\"exercise\" (editClicked)=\"exercise.exName = $event\" ></my-exercise>\n            </section>\n",
                        directives: [exercise_component_1.ExerciseComponent]
                    }), 
                    __metadata('design:paramtypes', [exercise_service_2.ExerciseService])
                ], ExerciseListComponent);
                return ExerciseListComponent;
            }());
            exports_17("ExerciseListComponent", ExerciseListComponent);
        }
    }
});
System.register("Exercises/exercise-input.component", ["angular2/src/core/metadata", "Exercises/exercise", "Exercises/exercise.service"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var metadata_3, exercise_3, exercise_service_3;
    var ExerciseInputComponent;
    return {
        setters:[
            function (metadata_3_1) {
                metadata_3 = metadata_3_1;
            },
            function (exercise_3_1) {
                exercise_3 = exercise_3_1;
            },
            function (exercise_service_3_1) {
                exercise_service_3 = exercise_service_3_1;
            }],
        execute: function() {
            ExerciseInputComponent = (function () {
                function ExerciseInputComponent(_exerciseService) {
                    this._exerciseService = _exerciseService;
                    this.exercise = null;
                }
                ExerciseInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    if (this.exercise) {
                        //Edit
                        this.exercise.exName = form.exName;
                        this.exercise.sets = form.sets;
                        this.exercise.weight = form.weight;
                        this.exercise.reps = form.reps;
                        console.log(this.exercise);
                        this._exerciseService.updateExercise(this.exercise)
                            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                        this.exercise = null;
                    }
                    else {
                        var exercise = new exercise_3.Exercise(form.exName, form.sets, form.reps, form.weight);
                        this._exerciseService.addExercise(exercise)
                            .subscribe(function (data) {
                            console.log(data);
                            _this._exerciseService.exercises.push(data);
                        }, function (error) { return console.error(error); });
                    }
                };
                ExerciseInputComponent.prototype.onCreate = function (content) {
                };
                ExerciseInputComponent.prototype.onCancel = function () {
                    this.exercise = null;
                };
                ExerciseInputComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._exerciseService.exerciseIsEdit.subscribe(function (exercise) {
                        _this.exercise = exercise;
                    });
                };
                ExerciseInputComponent = __decorate([
                    metadata_3.Component({
                        selector: 'my-exercise-input',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n            <div class=\"form-group\">\n                <label for=\"exName\">Exercise Name</label>\n                <input ngControl=\"exName\" type=\"text\" class=\"form-control\" id=\"exName\" #input [ngModel]=\"exercise?.exName\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"sets\">Sets</label>\n                <input ngControl=\"sets\" type=\"text\" class=\"form-control\" id=\"sets\" #input [ngModel]=\"exercise?.sets\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"reps\">Reps</label>\n                <input ngControl=\"reps\" type=\"text\" class=\"form-control\" id=\"reps\" #input [ngModel]=\"exercise?.reps\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"weight\">Weight</label>\n                <input ngControl=\"weight\" type=\"text\" class=\"form-control\" id=\"weight\" #input [ngModel]=\"exercise?.weight\">\n            </div>            \n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onCreate(input.value)\"> {{!exercise ? 'Log Exercise' : 'Save Exercise'}}</button>\n            <button type=\"button\" (click)=\"onCancel()\" *ngIf=\"exercise\" class=\"btn btn-danger\">Cancel</button>\n            </form>\n        </section>\n",
                    }), 
                    __metadata('design:paramtypes', [exercise_service_3.ExerciseService])
                ], ExerciseInputComponent);
                return ExerciseInputComponent;
            }());
            exports_18("ExerciseInputComponent", ExerciseInputComponent);
        }
    }
});
System.register("Exercises/exercises.component", ["angular2/core", "Exercises/exercise-list.component", "Exercises/exercise-input.component"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_13, exercise_list_component_1, exercise_input_component_1;
    var ExercisesComponent;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (exercise_list_component_1_1) {
                exercise_list_component_1 = exercise_list_component_1_1;
            },
            function (exercise_input_component_1_1) {
                exercise_input_component_1 = exercise_input_component_1_1;
            }],
        execute: function() {
            ExercisesComponent = (function () {
                function ExercisesComponent() {
                }
                ExercisesComponent = __decorate([
                    core_13.Component({
                        selector: 'my-exercises',
                        template: "\n        <div class=\"row spacing\">\n            <my-exercise-input></my-exercise-input>\n        </div>\n        <div class=\"row spacing\">\n            <my-exercise-list></my-exercise-list>\n        </div>\n",
                        directives: [exercise_list_component_1.ExerciseListComponent, exercise_input_component_1.ExerciseInputComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ExercisesComponent);
                return ExercisesComponent;
            }());
            exports_19("ExercisesComponent", ExercisesComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "header.component", "angular2/router", "auth/authentication.component", "Exercises/exercises.component"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_14, header_component_1, router_5, authentication_component_1, router_6, exercises_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
                router_6 = router_5_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            },
            function (exercises_component_1_1) {
                exercises_component_1 = exercises_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_14.Component({
                        selector: 'my-app',
                        template: "  \n       <div class=\"container\">\n       <my-header></my-header>\n       <router-outlet></router-outlet>\n</div>\n    ",
                        directives: [router_6.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }),
                    router_5.RouteConfig([
                        { path: '/', name: 'Exercises', component: exercises_component_1.ExercisesComponent, useAsDefault: true },
                        { path: '/auth/...', name: 'Auth', component: authentication_component_1.AuthenticationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_20("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "angular2/http", "angular2/src/router/router_providers", "angular2/core", "angular2/router", "auth/auth.service", "Exercises/exercise.service"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var browser_1, app_component_1, http_4, router_providers_1, core_15, router_7, router_8, auth_service_5, exercise_service_4;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (router_providers_1_1) {
                router_providers_1 = router_providers_1_1;
            },
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
                router_8 = router_7_1;
            },
            function (auth_service_5_1) {
                auth_service_5 = auth_service_5_1;
            },
            function (exercise_service_4_1) {
                exercise_service_4 = exercise_service_4_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_4.HTTP_PROVIDERS, exercise_service_4.ExerciseService, auth_service_5.AuthService, router_providers_1.ROUTER_PROVIDERS, core_15.provide(router_7.LocationStrategy, { useClass: router_8.HashLocationStrategy })]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnRzIiwibWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlLnRzIiwibWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWxpc3QuY29tcG9uZW50LnRzIiwibWVzc2FnZXMvbWVzc2FnZS1pbnB1dC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnQudHMiLCJhdXRoL3VzZXIudHMiLCJhdXRoL2F1dGguc2VydmljZS50cyIsImF1dGgvc2lnbnVwLmNvbXBvbmVudC50cyIsImF1dGgvc2lnbmluLmNvbXBvbmVudC50cyIsImF1dGgvbG9nb3V0LmNvbXBvbmVudC50cyIsImF1dGgvYXV0aGVudGljYXRpb24uY29tcG9uZW50LnRzIiwiRXhlcmNpc2VzL2V4ZXJjaXNlLnRzIiwiRXhlcmNpc2VzL2V4ZXJjaXNlLnNlcnZpY2UudHMiLCJFeGVyY2lzZXMvZXhlcmNpc2UuY29tcG9uZW50LnRzIiwiRXhlcmNpc2VzL2V4ZXJjaXNlLWxpc3QuY29tcG9uZW50LnRzIiwiRXhlcmNpc2VzL2V4ZXJjaXNlLWlucHV0LmNvbXBvbmVudC50cyIsIkV4ZXJjaXNlcy9leGVyY2lzZXMuY29tcG9uZW50LnRzIiwiYXBwLmNvbXBvbmVudC50cyIsImJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFnQ0E7Z0JBQUE7Z0JBRUEsQ0FBQztnQkFoQ0Q7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsV0FBVzt3QkFDckIsUUFBUSxFQUFFLHlSQVNiO3dCQUNHLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO3dCQUMvQixNQUFNLEVBQUUsQ0FBQyxzVUFlWixDQUFDO3FCQUNELENBQUM7O21DQUFBO2dCQUdGLHNCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCw2Q0FFQyxDQUFBOzs7Ozs7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QTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDcEVEO2dCQUFBO2dCQUVBLENBQUM7Z0JBZEQ7b0JBQUMsaUJBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsY0FBYzt3QkFDeEIsUUFBUSxFQUFFLHNOQU9iO3dCQUNHLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixFQUFFLGlEQUFzQixDQUFDO3FCQUM5RCxDQUFDOztzQ0FBQTtnQkFHRix5QkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsb0RBRUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ01EO2dCQUFBO2dCQUdBLENBQUM7Z0JBakJEO29CQUFDLGlCQUFTLENBQUM7d0JBQ1AsUUFBUSxFQUFFLFFBQVE7d0JBQ2xCLFFBQVEsRUFBRSw0SEFLVDt3QkFDRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSxrQ0FBZSxDQUFDO3FCQUNuRCxDQUFDO29CQUNELG9CQUFXLENBQUM7d0JBQ1QsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLHdDQUFrQixFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7d0JBQ2pGLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxrREFBdUIsRUFBQztxQkFDeEUsQ0FBQzs7Z0NBQUE7Z0JBSUYsbUJBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELHdDQUdDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ2RELG1CQUFTLENBQUMsNEJBQVksRUFBRSxDQUFDLHFCQUFjLEVBQUUsa0NBQWUsRUFBRSwwQkFBVyxFQUFFLG1DQUFnQixFQUFFLGVBQU8sQ0FBQyx5QkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4uLy4uLy4uL0NMLUZpbmFsLVByb2plY3QvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGBcbjxoZWFkZXIgY2xhc3M9XCJyb3dcIj5cbiAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIj5cbiAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnRXhlcmNpc2VzJ11cIj5FeGVyY2lzZXM8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnQXV0aCddXCI+QXV0aGVudGljYXRpb248L2E+PC9saT5cbiAgICAgICA8L3VsPlxuICAgIDwvbmF2PlxuPC9oZWFkZXI+XG5gLFxuICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU10sXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICBoZWFkZXIge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgfVxuICAgICAgICB1bCB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGkge1xuICAgICAgICAgICAgZmxvYXQ6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgLnJvdXRlci1saW5rLWFjdGl2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBCN0ZGO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlc21va2U7XG4gICAgICAgIH1cbmBdXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XG5cbn0iLCJleHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gICAgdXNlcklkOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvciAoY29udGVudDogc3RyaW5nLCBtZXNzYWdlSWQ/OiBzdHJpbmcsIHVzZXJuYW1lPzogc3RyaW5nLCB1c2VySWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSBtZXNzYWdlSWQ7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgfVxufSIsImltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xuaW1wb3J0IHtIdHRwLCBIZWFkZXJzfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQgJ3J4anMvUngnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cblxuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xuICAgIG1lc3NhZ2VzIDpNZXNzYWdlW10gPSBbXTtcbiAgICBtZXNzYWdlSXNFZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxNZXNzYWdlPigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9XG4gICAgYWRkTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTpcIiBcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UnICsgdG9rZW4gLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGRhdGEuY29udGVudCwgZGF0YS5faWQsIGRhdGEudXNlci5maXJzdE5hbWUsIGRhdGEudXNlci5faWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UnKVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XG4gICAgICAgICAgICAgICAgbGV0IG9ianM6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZShkYXRhW2ldLmNvbnRlbnQsIGRhdGFbaV0uX2lkLCBkYXRhW2ldLnVzZXIuZmlyc3ROYW1lLCBkYXRhW2ldLnVzZXIuX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgb2Jqcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ianM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IpKTtcbiAgICB9XG4gICAgdXBkYXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTpcIiBcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucGF0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9tZXNzYWdlLycgKyBtZXNzYWdlLm1lc3NhZ2VJZCArIHRva2VuLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cbiAgICBlZGl0TWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VJc0VkaXQuZW1pdChtZXNzYWdlKTtcblxuXG4gICAgfVxuXG4gICAgZGVsZXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMuc3BsaWNlKHRoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKSwgMSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTpcIiBcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZGVsZXRlKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZS8nICsgbWVzc2FnZS5tZXNzYWdlSWQgKyB0b2tlbilcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXG4gICAgICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLnVzZXJuYW1lfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbmZpZ1wiICpuZ0lmPVwiYmVsb25nc1RvVXNlcigpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRWRpdCgpXCI+RWRpdDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwib25EZWxldGUoKVwiPkRlbGV0ZTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICAgICA8L2FydGljbGU+XG5gLFxuICAgIHN0eWxlczogW2BcbiAgICAuYXV0aG9yIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgXG4gICAgfVxuICAgIC5jb25maWcge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIHdpZHRoOiAxOSU7XG4gICAgfVxuYF1cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgbWVzc2FnZTogTWVzc2FnZTtcbiAgICBAT3V0cHV0KCkgZWRpdENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2Upe1xuXG4gICAgfVxuXG4gICAgb25FZGl0KCkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5lZGl0TWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cbiAgICBvbkRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZGVsZXRlTWVzc2FnZSh0aGlzLm1lc3NhZ2UpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICk7XG4gICAgfVxuICAgIGJlbG9uZ3NUb1VzZXIoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJykgPT0gdGhpcy5tZXNzYWdlLnVzZXJJZDtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YVwiO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7T25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWxpc3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICAgICAgPG15LW1lc3NhZ2UgKm5nRm9yPVwiI21lc3NhZ2Ugb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtZXNzYWdlXCIgKGVkaXRDbGlja2VkKT1cIm1lc3NhZ2UuY29udGVudCA9ICRldmVudFwiID48L215LW1lc3NhZ2U+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG5gLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxuXG59KVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKXtcblxuICAgIH1cbiAgICBtZXNzYWdlczogTWVzc2FnZVtdID0gW107XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2UoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBtZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSAgbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG59IiwiXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhXCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7SHR0cH0gZnJvbSBcImFuZ3VsYXIyL2h0dHBcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xuaW1wb3J0IHtPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UtaW5wdXQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdChmLnZhbHVlKVwiICNmPVwibmdGb3JtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb250ZW50XCI+Q29udGVudDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IG5nQ29udHJvbD1cImNvbnRlbnRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJjb250ZW50XCIgI2lucHV0IFtuZ01vZGVsXT1cIm1lc3NhZ2U/LmNvbnRlbnRcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwib25DcmVhdGUoaW5wdXQudmFsdWUpXCI+IHt7IW1lc3NhZ2UgPyAnU2VuZCBNZXNzYWdlJyA6ICdTYXZlIE1lc3NhZ2UnfX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvbkNhbmNlbCgpXCIgKm5nSWY9XCJtZXNzYWdlXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L3NlY3Rpb24+XG5gLFxuXG5cbn0pXG5cblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBtZXNzYWdlOiBNZXNzYWdlID0gbnVsbDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UpIHtcblxuICAgIH1cbiAgICBvblN1Ym1pdChmb3JtOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZSl7XG4gICAgICAgICAgICAvL0VkaXRcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5jb250ZW50ID0gZm9ybS5jb250ZW50O1xuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UudXBkYXRlTWVzc2FnZSh0aGlzLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICBjb25zdCBtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoZm9ybS5jb250ZW50LCBudWxsLCAnRHVtbXknKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuYWRkTWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cbiAgICAgICAgICAgICk7fVxuICAgIH1cbiAgICBvbkNyZWF0ZShjb250ZW50OiBzdHJpbmcpXG4gICAge1xuXG4gICAgfVxuICAgIG9uQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBudWxsO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5tZXNzYWdlSXNFZGl0LnN1YnNjcmliZShcbiAgICAgICAgICAgIG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtNZXNzYWdlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZS1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2VzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgIDxteS1tZXNzYWdlLWlucHV0PjwvbXktbWVzc2FnZS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxuICAgICAgICAgICAgPG15LW1lc3NhZ2UtbGlzdD48L215LW1lc3NhZ2UtbGlzdD5cbiAgICAgICAgPC9kaXY+XG5gLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlTGlzdENvbXBvbmVudCwgTWVzc2FnZUlucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc0NvbXBvbmVudCB7XG5cbn0iLCIvL0NyZWF0ZXMgdGhlIFVzZXIgb2JqZWN0IGZvciB0aGUgYXBwIHRvIHVzZVxuXG5leHBvcnQgY2xhc3MgVXNlciB7XG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGVtYWlsOiBzdHJpbmcsIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nLCBwdWJsaWMgZmlyc3ROYW1lPzogc3RyaW5nLCBwdWJsaWMgbGFzdE5hbWU/OiBzdHJpbmcpIHtcblxuICAgIH1cbn0iLCJpbXBvcnQgeyBJbmplY3RhYmxlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtIdHRwfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi91c2VyXCI7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gXCJhbmd1bGFyMi9zcmMvaHR0cC9oZWFkZXJzXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCAncnhqcy9SeCc7XG5ASW5qZWN0YWJsZSgpXG5cbi8vQ3JlYXRlIGFuIGF1dGhvcml6YXRpb24gc2VydmljZSB0byBsb2cgdXNlcnMgaW4gYW5kIG91dC4gVGhpcyBzZXJ2aWNlIGNhbiBiZSB1c2VkIGJ5IHRoZSBlbnRpcmUgYXBwXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApe1xuXG4gICAgfVxuICAgIHNpZ251cCh1c2VyOiBVc2VyKXtcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHVzZXIpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcicsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG4gICAgfVxuICAgIHNpZ25pbih1c2VyOiBVc2VyKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh1c2VyKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXIvc2lnbmluJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcnN9KVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcbiAgICB9XG4gICAgbG9nb3V0KCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG4gICAgaXNMb2dnZWRJbigpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSBudWxsO1xuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgQ29udHJvbEdyb3VwLCBWYWxpZGF0b3JzLCBDb250cm9sfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuL3VzZXJcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuL2F1dGguc2VydmljZVwiO1xuXG4vL0NyZWF0ZXMgdGhlIHVzZXIgc2lnbi11cCBwYWdlXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktc2lnbnVwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cIm15Rm9ybVwiIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdmaXJzdE5hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaXJzdE5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICA8L2Rpdj4gICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnbGFzdE5hbWUnKVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsYXN0TmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5NYWlsPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdlbWFpbCcpXCIgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiIHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICA8L2Rpdj4gICBcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIW15Rm9ybS52YWxpZFwiPlNpZ24gVXA8L2J1dHRvbj5cbiAgICA8L2Zvcm0+XG48L3NlY3Rpb24+YFxufSlcblxuZXhwb3J0IGNsYXNzIFNpZ251cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBteUZvcm06IENvbnRyb2xHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBvblN1Ym1pdCgpe1xuICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih0aGlzLm15Rm9ybS52YWx1ZS5lbWFpbCwgdGhpcy5teUZvcm0udmFsdWUucGFzc3dvcmQsIHRoaXMubXlGb3JtLnZhbHVlLmZpcnN0TmFtZSwgdGhpcy5teUZvcm0udmFsdWUubGFzdE5hbWUgKTtcbiAgICAgICAgdGhpcy5fYXV0aFNlcnZpY2Uuc2lnbnVwKHVzZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5teUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICAgICAgICBmaXJzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBsYXN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRW1haWwoY29udHJvbDogQ29udHJvbCk6IHsgW3M6IHN0cmluZ106IGJvb2xlYW4gfSB7XG4gICAgICAgIGlmICghY29udHJvbC52YWx1ZS5tYXRjaCgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge2ludmFsaWRNYWlsOiB0cnVlfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBDb250cm9sR3JvdXAsIFZhbGlkYXRvcnMsIENvbnRyb2x9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4vdXNlclwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG4vL0NyZWF0ZSB0aGUgc2lnbiBpbiBjb21wb25lbnRcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1zaWduLWluJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJteUZvcm1cIiAobmdTdWJtaXQpPVwib25TdWJtaXQoKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5NYWlsPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdlbWFpbCcpXCIgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiIHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICA8L2Rpdj4gICBcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIW15Rm9ybS52YWxpZFwiPlNpZ24gSW48L2J1dHRvbj5cbiAgICA8L2Zvcm0+XG48L3NlY3Rpb24+XG5gXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbmluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIG15Rm9ybTogQ29udHJvbEdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG5cbiAgICB9XG5cbiAgICBvblN1Ym1pdCgpe1xuICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih0aGlzLm15Rm9ybS52YWx1ZS5lbWFpbCwgdGhpcy5teUZvcm0udmFsdWUucGFzc3dvcmQgKTtcbiAgICAgICAgdGhpcy5fYXV0aFNlcnZpY2Uuc2lnbmluKHVzZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBkYXRhLnRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJJZCcsIGRhdGEudXNlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlQnlVcmwoJy8nKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubXlGb3JtID0gdGhpcy5fZmIuZ3JvdXAoe1xuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXNzd29yZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNFbWFpbChjb250cm9sOiBDb250cm9sKTogeyBbczogc3RyaW5nXTogYm9vbGVhbiB9IHtcbiAgICAgICAgaWYgKCFjb250cm9sLnZhbHVlLm1hdGNoKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7aW52YWxpZE1haWw6IHRydWV9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5cbi8vTG9nb3V0IHRoZSBjdXJyZW50IHVzZXJcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1sb2dvdXQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWluZm9cIiAoY2xpY2spPVwib25Mb2dvdXQoKVwiPkxvZ291dDwvYnV0dG9uPlxuPC9zZWN0aW9uPlxuYFxufSlcblxuZXhwb3J0IGNsYXNzIExvZ291dENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKXt9XG4gICAgb25Mb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuX2F1dGhTZXJ2aWNlLmxvZ291dCgpO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWydTaWduaW4nXSk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtTaWdudXBDb21wb25lbnR9IGZyb20gXCIuL3NpZ251cC5jb21wb25lbnRcIjtcbmltcG9ydCB7Um91dGVDb25maWcsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge1NpZ25pbkNvbXBvbmVudH0gZnJvbSBcIi4vc2lnbmluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtMb2dvdXRDb21wb25lbnR9IGZyb20gXCIuL2xvZ291dC5jb21wb25lbnRcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuL2F1dGguc2VydmljZVwiO1xuXG4vL0NyZWF0ZSB0aGUgc2lnbi1pbi9zaWduLW91dCBjb21wb25lbnQgdG8gbG9nIHVzZXJzIGluIGFuZCBvdXRcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hdXRoJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgPGhlYWRlciBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ1NpZ251cCddXCI+U2lnbnVwPC9hPjwvbGk+XG4gICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydTaWduaW4nXVwiICpuZ0lmPVwiIWlzTG9nZ2VkSW4oKVwiPlNpZ25pbjwvYT48L2xpPlxuICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnTG9nb3V0J11cIiAqbmdJZj1cImlzTG9nZ2VkSW4oKVwiPkxvZ291dDwvYT48L2xpPlxuICAgICAgXG48L3VsPlxuPC9uYXY+XG48L2hlYWRlcj5cbjxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxuPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuPC9kaXY+XG5gLFxuICAgIGRpcmVjdGl2ZXM6IFtTaWdudXBDb21wb25lbnQsIFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBzdHlsZXM6IFtgXG4gICAgLnJvdXRlci1saW5rLWFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiAjNzUwZmJmO1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMEI3RkY7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbmBdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDogJy9zaWdudXAnLCBuYW1lOiAnU2lnbnVwJywgY29tcG9uZW50OiBTaWdudXBDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG4gICAge3BhdGg6ICcvc2lnbmluJywgbmFtZTogJ1NpZ25pbicsIGNvbXBvbmVudDogU2lnbmluQ29tcG9uZW50fSxcbiAgICB7cGF0aDogJy9sb2dvdXQnLCBuYW1lOiAnTG9nb3V0JywgY29tcG9uZW50OiBMb2dvdXRDb21wb25lbnR9XG5dKVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2Upe31cblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRoU2VydmljZS5pc0xvZ2dlZEluKCk7XG4gICAgfVxufVxuIiwiXG4vL0RlZmluZXMgd2hhdCBhbiBleGVyY2lzZSBpcyBhbmQgaG93IHRvIHVzZSBpdFxuXG5leHBvcnQgY2xhc3MgRXhlcmNpc2Uge1xuICAgIGV4TmFtZTogc3RyaW5nO1xuICAgIHNldHM6IG51bWJlcjtcblxuICAgIHJlcHM6IG51bWJlcjtcbiAgICB3ZWlnaHQ6IG51bWJlcjtcbiAgICBpZDogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3RvciAoZXhOYW1lPzogc3RyaW5nLCBzZXRzPzogbnVtYmVyLCByZXBzPzogbnVtYmVyLCB3ZWlnaHQ/OiBudW1iZXIsIGlkPzogc3RyaW5nICkge1xuICAgICAgICB0aGlzLmV4TmFtZSA9IGV4TmFtZTtcbiAgICAgICAgdGhpcy5zZXRzID0gc2V0cztcbiAgICAgICAgdGhpcy5yZXBzID0gcmVwcztcbiAgICAgICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcblxuXG4gICAgfVxufSIsImltcG9ydCB7RXhlcmNpc2V9IGZyb20gXCIuL2V4ZXJjaXNlXCI7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCAncnhqcy9SeCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBFeGVyY2lzZVNlcnZpY2Uge1xuICAgIGV4ZXJjaXNlcyA6RXhlcmNpc2VbXSA9IFtdO1xuICAgIGV4ZXJjaXNlSXNFZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxFeGVyY2lzZT4oKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKSB7fVxuICAgIGFkZEV4ZXJjaXNlKGV4ZXJjaXNlOiBFeGVyY2lzZSkge1xuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoZXhlcmNpc2UpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpOlwiIFwiO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvZXhlcmNpc2UnICsgdG9rZW4gLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcbiAgICAgICAgICAgICAgICBsZXQgZXhlcmNpc2UgPSBuZXcgRXhlcmNpc2UoZGF0YS5leE5hbWUsIGRhdGEuc2V0cywgZGF0YS5yZXBzLCBkYXRhLndlaWdodCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4ZXJjaXNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIGdldEV4ZXJjaXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9leGVyY2lzZScpXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcbiAgICAgICAgICAgICAgICBsZXQgb2JqczogYW55W10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8ZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXhlcmNpc2UgPSBuZXcgRXhlcmNpc2UoZGF0YVtpXS5leE5hbWUsIGRhdGFbaV0uc2V0cywgZGF0YVtpXS5yZXBzLCBkYXRhW2ldLndlaWdodCwgZGF0YVtpXS5faWQpO1xuICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2goZXhlcmNpc2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yKSk7XG4gICAgfVxuICAgIHVwZGF0ZUV4ZXJjaXNlKGV4ZXJjaXNlOiBFeGVyY2lzZSkge1xuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoZXhlcmNpc2UpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpOlwiIFwiO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wYXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2V4ZXJjaXNlLycgKyBleGVyY2lzZS5pZCArIHRva2VuLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cbiAgICBlZGl0RXhlcmNpc2UoZXhlcmNpc2U6IEV4ZXJjaXNlKSB7XG4gICAgICAgIHRoaXMuZXhlcmNpc2VJc0VkaXQuZW1pdChleGVyY2lzZSk7XG5cblxuICAgIH1cblxuICAgIGRlbGV0ZUV4ZXJjaXNlKGV4ZXJjaXNlOiBFeGVyY2lzZSkge1xuICAgICAgICB0aGlzLmV4ZXJjaXNlcy5zcGxpY2UodGhpcy5leGVyY2lzZXMuaW5kZXhPZihleGVyY2lzZSksIDEpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk6XCIgXCI7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2V4ZXJjaXNlLycgKyBleGVyY2lzZS5pZCArIHRva2VuKVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7RXhlcmNpc2V9IGZyb20gXCIuL2V4ZXJjaXNlXCI7XG5pbXBvcnQge0V4ZXJjaXNlU2VydmljZX0gZnJvbSBcIi4vZXhlcmNpc2Uuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWV4ZXJjaXNlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+IEV4ZXJjaXNlIE5hbWUgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBleGVyY2lzZS5leE5hbWUgfX1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICA8L2Rpdj4gXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyIG9mIFNldHMge3sgZXhlcmNpc2Uuc2V0c319XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgIHt7IGV4ZXJjaXNlLnJlcHN9fVxuICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgICAgICAgICB7eyBleGVyY2lzZS53ZWlnaHR9fVxuICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cInBhbmVsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWdcIiAqbmdJZj1cImJlbG9uZ3NUb1VzZXIoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkVkaXQoKVwiPkVkaXQ8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRGVsZXRlKClcIj5EZWxldGU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgLmF1dGhvciB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgIFxuICAgIH1cbiAgICAuY29uZmlnIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICB3aWR0aDogMTklO1xuICAgIH1cbmBdXG59KVxuZXhwb3J0IGNsYXNzIEV4ZXJjaXNlQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBleGVyY2lzZTogRXhlcmNpc2U7XG4gICAgQE91dHB1dCgpIGVkaXRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfZXhlcmNpc2VTZXJ2aWNlOiBFeGVyY2lzZVNlcnZpY2Upe1xuXG4gICAgfVxuXG4gICAgb25FZGl0KCkge1xuICAgICAgICB0aGlzLl9leGVyY2lzZVNlcnZpY2UuZWRpdEV4ZXJjaXNlKHRoaXMuZXhlcmNpc2UpO1xuICAgIH1cbiAgICBvbkRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fZXhlcmNpc2VTZXJ2aWNlLmRlbGV0ZUV4ZXJjaXNlKHRoaXMuZXhlcmNpc2UpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICk7XG4gICAgfVxuICAgIGJlbG9uZ3NUb1VzZXIoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtFeGVyY2lzZUNvbXBvbmVudH0gZnJvbSBcIi4vZXhlcmNpc2UuY29tcG9uZW50XCI7XG5pbXBvcnQge0V4ZXJjaXNlfSBmcm9tIFwiLi9leGVyY2lzZVwiO1xuaW1wb3J0IHtFeGVyY2lzZVNlcnZpY2V9IGZyb20gXCIuL2V4ZXJjaXNlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1leGVyY2lzZS1saXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxteS1leGVyY2lzZSAqbmdGb3I9XCIjZXhlcmNpc2Ugb2YgZXhlcmNpc2VzXCIgW2V4ZXJjaXNlXT1cImV4ZXJjaXNlXCIgKGVkaXRDbGlja2VkKT1cImV4ZXJjaXNlLmV4TmFtZSA9ICRldmVudFwiID48L215LWV4ZXJjaXNlPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuYCxcbiAgICBkaXJlY3RpdmVzOiBbRXhlcmNpc2VDb21wb25lbnRdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBFeGVyY2lzZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXhlcmNpc2VTZXJ2aWNlOiBFeGVyY2lzZVNlcnZpY2Upe1xuXG4gICAgfVxuICAgIGV4ZXJjaXNlczogRXhlcmNpc2VbXSA9IFtdO1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xuICAgICAgICB0aGlzLl9leGVyY2lzZVNlcnZpY2UuZ2V0RXhlcmNpc2UoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBleGVyY2lzZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZXJjaXNlcyA9ICBleGVyY2lzZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4ZXJjaXNlU2VydmljZS5leGVyY2lzZXMgPSBleGVyY2lzZXM7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cbn0iLCJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGFcIjtcbmltcG9ydCB7RXhlcmNpc2V9IGZyb20gXCIuL2V4ZXJjaXNlXCI7XG5pbXBvcnQge0h0dHB9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5pbXBvcnQge0V4ZXJjaXNlU2VydmljZX0gZnJvbSBcIi4vZXhlcmNpc2Uuc2VydmljZVwiO1xuaW1wb3J0IHtPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWV4ZXJjaXNlLWlucHV0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIiAjZj1cIm5nRm9ybVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZXhOYW1lXCI+RXhlcmNpc2UgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IG5nQ29udHJvbD1cImV4TmFtZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImV4TmFtZVwiICNpbnB1dCBbbmdNb2RlbF09XCJleGVyY2lzZT8uZXhOYW1lXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNldHNcIj5TZXRzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbmdDb250cm9sPVwic2V0c1wiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInNldHNcIiAjaW5wdXQgW25nTW9kZWxdPVwiZXhlcmNpc2U/LnNldHNcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicmVwc1wiPlJlcHM8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBuZ0NvbnRyb2w9XCJyZXBzXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwicmVwc1wiICNpbnB1dCBbbmdNb2RlbF09XCJleGVyY2lzZT8ucmVwc1wiPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIndlaWdodFwiPldlaWdodDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IG5nQ29udHJvbD1cIndlaWdodFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cIndlaWdodFwiICNpbnB1dCBbbmdNb2RlbF09XCJleGVyY2lzZT8ud2VpZ2h0XCI+XG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cIm9uQ3JlYXRlKGlucHV0LnZhbHVlKVwiPiB7eyFleGVyY2lzZSA/ICdMb2cgRXhlcmNpc2UnIDogJ1NhdmUgRXhlcmNpc2UnfX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvbkNhbmNlbCgpXCIgKm5nSWY9XCJleGVyY2lzZVwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9zZWN0aW9uPlxuYCxcblxuXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBFeGVyY2lzZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIGV4ZXJjaXNlOiBFeGVyY2lzZSA9IG51bGw7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXhlcmNpc2VTZXJ2aWNlOiBFeGVyY2lzZVNlcnZpY2UpIHtcblxuICAgIH1cbiAgICBvblN1Ym1pdChmb3JtOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhlcmNpc2Upe1xuICAgICAgICAgICAgLy9FZGl0XG4gICAgICAgICAgICB0aGlzLmV4ZXJjaXNlLmV4TmFtZSA9IGZvcm0uZXhOYW1lO1xuICAgICAgICAgICAgdGhpcy5leGVyY2lzZS5zZXRzID0gZm9ybS5zZXRzO1xuICAgICAgICAgICAgdGhpcy5leGVyY2lzZS53ZWlnaHQgPSBmb3JtLndlaWdodDtcbiAgICAgICAgICAgIHRoaXMuZXhlcmNpc2UucmVwcyA9IGZvcm0ucmVwcztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXhlcmNpc2UpO1xuICAgICAgICAgICAgdGhpcy5fZXhlcmNpc2VTZXJ2aWNlLnVwZGF0ZUV4ZXJjaXNlKHRoaXMuZXhlcmNpc2UpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5leGVyY2lzZSA9IG51bGw7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ZXJjaXNlOiBFeGVyY2lzZSA9IG5ldyBFeGVyY2lzZShmb3JtLmV4TmFtZSwgZm9ybS5zZXRzLCBmb3JtLnJlcHMsIGZvcm0ud2VpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2V4ZXJjaXNlU2VydmljZS5hZGRFeGVyY2lzZShleGVyY2lzZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhlcmNpc2VTZXJ2aWNlLmV4ZXJjaXNlcy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuXG4gICAgICAgICAgICAgICAgKTt9XG4gICAgfVxuICAgIG9uQ3JlYXRlKGNvbnRlbnQ6IHN0cmluZylcbiAgICB7XG5cbiAgICB9XG4gICAgb25DYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuZXhlcmNpc2UgPSBudWxsO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLl9leGVyY2lzZVNlcnZpY2UuZXhlcmNpc2VJc0VkaXQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZXhlcmNpc2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlcmNpc2UgPSBleGVyY2lzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0V4ZXJjaXNlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vZXhlcmNpc2UtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7RXhlcmNpc2VJbnB1dENvbXBvbmVudH0gZnJvbSBcIi4vZXhlcmNpc2UtaW5wdXQuY29tcG9uZW50XCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWV4ZXJjaXNlcycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICAgICAgICA8bXktZXhlcmNpc2UtaW5wdXQ+PC9teS1leGVyY2lzZS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxuICAgICAgICAgICAgPG15LWV4ZXJjaXNlLWxpc3Q+PC9teS1leGVyY2lzZS1saXN0PlxuICAgICAgICA8L2Rpdj5cbmAsXG4gICAgZGlyZWN0aXZlczogW0V4ZXJjaXNlTGlzdENvbXBvbmVudCwgRXhlcmNpc2VJbnB1dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRXhlcmNpc2VzQ29tcG9uZW50IHtcblxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SGVhZGVyQ29tcG9uZW50fSBmcm9tIFwiLi9oZWFkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge1JvdXRlQ29uZmlnfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge01lc3NhZ2VzQ29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnRcIjtcbmltcG9ydCB7QXV0aGVudGljYXRpb25Db21wb25lbnR9IGZyb20gXCIuL2F1dGgvYXV0aGVudGljYXRpb24uY29tcG9uZW50XCI7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge0V4ZXJjaXNlc0NvbXBvbmVudH0gZnJvbSBcIi4vZXhlcmNpc2VzL2V4ZXJjaXNlcy5jb21wb25lbnRcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAgdGVtcGxhdGU6IGAgIFxuICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICA8bXktaGVhZGVyPjwvbXktaGVhZGVyPlxuICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbjwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBIZWFkZXJDb21wb25lbnRdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDogJy8nLCBuYW1lOiAnRXhlcmNpc2VzJywgY29tcG9uZW50OiBFeGVyY2lzZXNDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG4gICAge3BhdGg6ICcvYXV0aC8uLi4nLCBuYW1lOiAnQXV0aCcsIGNvbXBvbmVudDogQXV0aGVudGljYXRpb25Db21wb25lbnR9XG5dKVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cblxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xuLy9pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7Uk9VVEVSX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVyc1wiO1xuaW1wb3J0IHtwcm92aWRlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge0hhc2hMb2NhdGlvblN0cmF0ZWd5fSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi9hdXRoL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtFeGVyY2lzZVNlcnZpY2V9IGZyb20gXCIuL0V4ZXJjaXNlcy9leGVyY2lzZS5zZXJ2aWNlXCI7XG5cbmJvb3RzdHJhcChBcHBDb21wb25lbnQsIFtIVFRQX1BST1ZJREVSUywgRXhlcmNpc2VTZXJ2aWNlLCBBdXRoU2VydmljZSwgUk9VVEVSX1BST1ZJREVSUywgcHJvdmlkZShMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IEhhc2hMb2NhdGlvblN0cmF0ZWd5fSldKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
