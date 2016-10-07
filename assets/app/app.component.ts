import {Component} from 'angular2/core';
import {MessageListComponent} from "./messages/message-list.component";

@Component({
    selector: 'my-app',
    template: `  
        <div class="row">

        </div>
        <div class="row">
            <my-message-list></my-message-list>
        </div>
    `,
    directives: [MessageListComponent]
})
export class AppComponent {


}