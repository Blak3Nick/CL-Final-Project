import {Component} from "angular2/src/core/metadata";
import {MessageComponent} from "./message.component";
import {Message} from "./message";
@Component({
    selector: 'my-message-list',
    template: `
            <section class="col-md-8 col-md-offset-2">
            <my-message *ngFor="#message of messages" [message]="message" (editClicked)="message.content = $event" ></my-message>
            </section>
`,
    directives: [MessageComponent]
})

export class MessageListComponent {
    messages: Message[] = [
        new Message('Squat', null, 'Blake'),
        new Message('Deadlift', null, 'Blake')
    ];
}