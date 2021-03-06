import {Component} from "angular2/src/core/metadata";
import {MessageComponent} from "./message.component";
import {Message} from "./message";
import {MessageService} from "./message.service";
import {OnInit} from "angular2/core";
@Component({
    selector: 'my-message-list',
    template: `
            <section class="col-md-8 col-md-offset-2">
            <my-message *ngFor="#message of messages" [message]="message" (editClicked)="message.content = $event" ></my-message>
            </section>
`,
    directives: [MessageComponent]

})

export class MessageListComponent implements OnInit{
    constructor(private _messageService: MessageService){

    }
    messages: Message[] = [];
    ngOnInit() {
        this._messageService.getMessage()
            .subscribe(
                messages => {
                    this.messages =  messages;
                    this._messageService.messages = messages;
                }
            );
    }
}