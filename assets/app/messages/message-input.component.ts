
import {Component} from "angular2/src/core/metadata";
import {Message} from "./message";
import {Http} from "angular2/src/http/http";
import {MessageService} from "./message.service";
@Component({
    selector: 'my-message-input',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <div class="form-group">
                <label for="content">Content</label>
                <input type="text" class="form-control" id="content" #input>
            </div>
            <button type="submit" class="btn btn-primary" (click)="onCreate(input.value)"> Send Message</button>
        </section>
`,


})


export class MessageInputComponent {
    constructor(private _messageService: MessageService) {

    }
    onCreate(content: string)
    {
        const message: Message = new Message(content, null, 'Dummy');
        this._messageService.addMessage(message);
    }
}