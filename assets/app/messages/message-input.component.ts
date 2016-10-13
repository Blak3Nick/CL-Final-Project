
import {Component} from "angular2/src/core/metadata";
import {Message} from "./message";
import {Http} from "angular2/http";
import {MessageService} from "./message.service";
import {OnInit} from "angular2/core";
@Component({
    selector: 'my-message-input',
    template: `
        <section class="col-md-8 col-md-offset-2">
        <form (ngSubmit)="onSubmit(f.value)" #f="ngForm">
            <div class="form-group">
                <label for="content">Content</label>
                <input ngControl="content" type="text" class="form-control" id="content" #input [value]="message?.content">
            </div>
            <button type="submit" class="btn btn-primary" (click)="onCreate(input.value)"> {{!message ? 'Send Message' : 'Save Message'}}</button>
            <button type="button" (click)="onCancel()" *ngIf="message" class="btn btn-danger">Cancel</button>
            </form>
        </section>
`,


})


export class MessageInputComponent implements OnInit{
    message: Message = null;
    constructor(private _messageService: MessageService) {

    }
    onSubmit(form: any) {
        if (this.message){
            //Edit
            this.message.content = form.content;
            this._messageService.updateMessage(this.message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            this.message = null;
        }else {
        const message: Message = new Message(form.content, null, 'Dummy');
        this._messageService.addMessage(message)
            .subscribe(
                data => {
                    console.log(data);
                    this._messageService.messages.push(data);
                },
                        error => console.error(error)

            );}
    }
    onCreate(content: string)
    {

    }
    onCancel() {
        this.message = null;
    }
    ngOnInit(){
        this._messageService.messageIsEdit.subscribe(
            message => {
                this.message = message;
            }
        );
    }
}