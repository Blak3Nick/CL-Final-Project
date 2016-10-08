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
System.register("messages/message.service", ["messages/message"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var message_1;
    var MessageService;
    return {
        setters:[
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            MessageService = (function () {
                function MessageService() {
                    this.messages = [];
                }
                MessageService.prototype.addMessage = function (message) {
                    this.messages.push(message);
                    console.log(this.messages);
                };
                MessageService.prototype.getMessage = function () {
                    return this.messages;
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messages[this.messages.indexOf(message)] = new message_1.Message('Edited', null, 'Dummy');
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                };
                return MessageService;
            }());
            exports_2("MessageService", MessageService);
        }
    }
});
System.register("messages/message.component", ["angular2/core", "messages/message", "messages/message.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1, message_2, message_service_1;
    var MessageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    this.editClicked = new core_1.EventEmitter();
                }
                MessageComponent.prototype.onEdit = function () {
                    this._messageService.editMessage(this.message);
                };
                MessageComponent.prototype.onDelete = function () {
                    this._messageService.deleteMessage(this.message);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', message_2.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-message',
                        template: "\n                <article class=\"panel panel-default\" >\n                    <div class=\"panel-body\">\n                    {{ message.content }}\n            \n                    </div> \n                    <footer class=\"panel-footer\">\n                        <div class=\"author\">\n                            {{ message.username}}\n                        </div>\n                        <div class=\"config\">\n                            <a href=\"#\" (click)=\"onEdit()\">Edit</a>\n                            <a href=\"#\" (click)=\"onDelete()\">Delete</a>\n                        </div>\n                    </footer>\n                </article>\n",
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
                    this.messages = this._messageService.getMessage();
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
                }
                MessageInputComponent.prototype.onSubmit = function (form) {
                    var message = new message_3.Message(form.content, null, 'Dummy');
                    this._messageService.addMessage(message);
                };
                MessageInputComponent.prototype.onCreate = function (content) {
                };
                MessageInputComponent = __decorate([
                    metadata_2.Component({
                        selector: 'my-message-input',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n            <div class=\"form-group\">\n                <label for=\"content\">Content</label>\n                <input ngControl=\"content\" type=\"text\" class=\"form-control\" id=\"content\" #input>\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onCreate(input.value)\"> Send Message</button>\n            </form>\n        </section>\n",
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
    var core_2, router_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent = __decorate([
                    core_2.Component({
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
    var core_3, message_list_component_1, message_input_component_1;
    var MessagesComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
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
                    core_3.Component({
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
System.register("authentication.component", ["angular2/core"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_4;
    var AuthenticationComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            }],
        execute: function() {
            AuthenticationComponent = (function () {
                function AuthenticationComponent() {
                }
                AuthenticationComponent = __decorate([
                    core_4.Component({
                        selector: 'my-auth',
                        template: "\n        <h1>Auth</h1>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AuthenticationComponent);
                return AuthenticationComponent;
            }());
            exports_8("AuthenticationComponent", AuthenticationComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "header.component", "angular2/router", "messages/messages.component", "authentication.component"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_5, header_component_1, router_2, messages_component_1, authentication_component_1, router_3;
    var AppComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
                router_3 = router_2_1;
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
                    core_5.Component({
                        selector: 'my-app',
                        template: "  \n       <div class=\"container\">\n       <my-header></my-header>\n       <router-outlet></router-outlet>\n</div>\n    ",
                        directives: [router_3.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }),
                    router_2.RouteConfig([
                        { path: '/', name: 'Messages', component: messages_component_1.MessagesComponent, useAsDefault: true },
                        { path: '/auth', name: 'Auth', component: authentication_component_1.AuthenticationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_9("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "angular2/http", "messages/message.service", "angular2/src/router/router_providers", "angular2/core", "angular2/router"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var browser_1, app_component_1, http_1, message_service_4, router_providers_1, core_6, router_4, router_5;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (message_service_4_1) {
                message_service_4 = message_service_4_1;
            },
            function (router_providers_1_1) {
                router_providers_1 = router_providers_1_1;
            },
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
                router_5 = router_4_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, message_service_4.MessageService, router_providers_1.ROUTER_PROVIDERS, core_6.provide(router_4.LocationStrategy, { useClass: router_5.HashLocationStrategy })]);
        }
    }
});
System.register("auth/user", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
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
            exports_11("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudC50cyIsImhlYWRlci5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnQudHMiLCJhdXRoZW50aWNhdGlvbi5jb21wb25lbnQudHMiLCJhcHAuY29tcG9uZW50LnRzIiwiYm9vdC50cyIsImF1dGgvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBQUE7Z0JBTUksaUJBQWEsT0FBZSxFQUFFLFNBQWtCLEVBQUUsUUFBaUIsRUFBRSxNQUFlO29CQUNoRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDekIsQ0FBQztnQkFDTCxjQUFDO1lBQUQsQ0FaQSxBQVlDLElBQUE7WUFaRCw2QkFZQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7WUNYRDtnQkFBQTtvQkFDSSxhQUFRLEdBQWMsRUFBRSxDQUFDO2dCQWtCN0IsQ0FBQztnQkFoQkcsbUNBQVUsR0FBVixVQUFXLE9BQWdCO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQsbUNBQVUsR0FBVjtvQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDekIsQ0FBQztnQkFFRCxvQ0FBVyxH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QUFELENBSEEsQUFHQyxJQUFBO1lBSEQsdUNBR0MsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDakJELG1CQUFTLENBQUMsNEJBQVksRUFBRSxDQUFDLHFCQUFjLEVBQUUsZ0NBQWMsRUFBRSxtQ0FBZ0IsRUFBRSxjQUFPLENBQUMseUJBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNkJBQW9CLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7WUNWekk7Z0JBRUksY0FBb0IsS0FBYSxFQUFTLFFBQWdCLEVBQUUsU0FBa0IsRUFBUyxRQUFpQjtvQkFBcEYsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO29CQUE2QixhQUFRLEdBQVIsUUFBUSxDQUFTO2dCQUV4RyxDQUFDO2dCQUNMLFdBQUM7WUFBRCxDQUxBLEFBS0MsSUFBQTtZQUxELHdCQUtDLENBQUEiLCJmaWxlIjoiLi4vLi4vLi4vY2wtZmluYWwtcHJvamVjdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgICBjb250ZW50OiBzdHJpbmc7XHJcbiAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XHJcbiAgICB1c2VySWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoY29udGVudDogc3RyaW5nLCBtZXNzYWdlSWQ/OiBzdHJpbmcsIHVzZXJuYW1lPzogc3RyaW5nLCB1c2VySWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMubWVzc2FnZUlkID0gbWVzc2FnZUlkO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xyXG4gICAgbWVzc2FnZXMgOk1lc3NhZ2VbXSA9IFtdO1xyXG5cclxuICAgIGFkZE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNZXNzYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzW3RoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKV0gPSBuZXcgTWVzc2FnZSgnRWRpdGVkJywgbnVsbCwgJ0R1bW15Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5zcGxpY2UodGhpcy5tZXNzYWdlcy5pbmRleE9mKG1lc3NhZ2UpLCAxKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xyXG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbWVzc2FnZS51c2VybmFtZX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkVkaXQoKVwiPkVkaXQ8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkRlbGV0ZSgpXCI+RGVsZXRlPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgIC5hdXRob3Ige1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAuY29uZmlnIHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIHdpZHRoOiAxOSU7XHJcbiAgICB9XHJcbmBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIG1lc3NhZ2U6IE1lc3NhZ2U7XHJcbiAgICBAT3V0cHV0KCkgZWRpdENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25FZGl0KCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmVkaXRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBvbkRlbGV0ZSgpIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5kZWxldGVNZXNzYWdlKHRoaXMubWVzc2FnZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhXCI7XHJcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XHJcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQge09uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWxpc3QnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICAgICAgPG15LW1lc3NhZ2UgKm5nRm9yPVwiI21lc3NhZ2Ugb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtZXNzYWdlXCIgKGVkaXRDbGlja2VkKT1cIm1lc3NhZ2UuY29udGVudCA9ICRldmVudFwiID48L215LW1lc3NhZ2U+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuYCxcclxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSl7XHJcblxyXG4gICAgfVxyXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IFtdO1xyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2UoKTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhXCI7XHJcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xyXG5pbXBvcnQge0h0dHB9IGZyb20gXCJhbmd1bGFyMi9zcmMvaHR0cC9odHRwXCI7XHJcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktbWVzc2FnZS1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uU3VibWl0KGYudmFsdWUpXCIgI2Y9XCJuZ0Zvcm1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb250ZW50XCI+Q29udGVudDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgbmdDb250cm9sPVwiY29udGVudFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImNvbnRlbnRcIiAjaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJvbkNyZWF0ZShpbnB1dC52YWx1ZSlcIj4gU2VuZCBNZXNzYWdlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbmAsXHJcblxyXG5cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUlucHV0Q29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuICAgIG9uU3VibWl0KGZvcm06IGFueSkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShmb3JtLmNvbnRlbnQsIG51bGwsICdEdW1teScpO1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBvbkNyZWF0ZShjb250ZW50OiBzdHJpbmcpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LWhlYWRlcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG48aGVhZGVyIGNsYXNzPVwicm93XCI+XHJcbiAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiPlxyXG4gICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ01lc3NhZ2VzJ11cIj5NZXNzZW5nZXI8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydBdXRoJ11cIj5BdXRoZW50aWNhdGlvbjwvYT48L2xpPlxyXG4gICAgICAgPC91bD5cclxuICAgIDwvbmF2PlxyXG48L2hlYWRlcj5cclxuYCxcclxuICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU10sXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgaGVhZGVyIHtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWwge1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpIHtcclxuICAgICAgICAgICAgZmxvYXQ6IG5vbmU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLnJvdXRlci1saW5rLWFjdGl2ZSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMEI3RkY7XHJcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XHJcblxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7TWVzc2FnZUxpc3RDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UtbGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlcycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxyXG4gICAgICAgICAgICA8bXktbWVzc2FnZS1pbnB1dD48L215LW1lc3NhZ2UtaW5wdXQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XHJcbiAgICAgICAgICAgIDxteS1tZXNzYWdlLWxpc3Q+PC9teS1tZXNzYWdlLWxpc3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbmAsXHJcbiAgICBkaXJlY3RpdmVzOiBbTWVzc2FnZUxpc3RDb21wb25lbnQsIE1lc3NhZ2VJbnB1dENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzQ29tcG9uZW50IHtcclxuXHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LWF1dGgnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8aDE+QXV0aDwvaDE+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uQ29tcG9uZW50IHtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge0hlYWRlckNvbXBvbmVudH0gZnJvbSBcIi4vaGVhZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZ30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtNZXNzYWdlc0NvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoZW50aWNhdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAgdGVtcGxhdGU6IGAgIFxuICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICA8bXktaGVhZGVyPjwvbXktaGVhZGVyPlxuICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbjwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBIZWFkZXJDb21wb25lbnRdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDogJy8nLCBuYW1lOiAnTWVzc2FnZXMnLCBjb21wb25lbnQ6IE1lc3NhZ2VzQ29tcG9uZW50LCB1c2VBc0RlZmF1bHQ6IHRydWV9LFxuICAgIHtwYXRoOiAnL2F1dGgnLCBuYW1lOiAnQXV0aCcsIGNvbXBvbmVudDogQXV0aGVudGljYXRpb25Db21wb25lbnR9XG5dKVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cblxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1JPVVRFUl9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNcIjtcbmltcG9ydCB7cHJvdmlkZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtIYXNoTG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5ib290c3RyYXAoQXBwQ29tcG9uZW50LCBbSFRUUF9QUk9WSURFUlMsIE1lc3NhZ2VTZXJ2aWNlLCBST1VURVJfUFJPVklERVJTLCBwcm92aWRlKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogSGFzaExvY2F0aW9uU3RyYXRlZ3l9KV0pOyIsImV4cG9ydCBjbGFzcyBVc2VyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGVtYWlsOiBzdHJpbmcsIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nLCBmaXJzdE5hbWU/OiBzdHJpbmcsIHB1YmxpYyBsYXN0TmFtZT86IHN0cmluZykge1xyXG5cclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
