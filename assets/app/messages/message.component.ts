import {Component} from "angular2/core";
import {Message} from "./message";
@Component({
    selector: 'my-message',
    template: `
                <article class="panel panel-default">
                    <div class="panel-body">
                    {{ message.content }}
            
                    </div> 
                    <footer class="panel-footer">
                        <div class="author">
                            {{ message.username}}
                        </div>
                        <div class="config">
                            <a href="#">Edit</a>
                            <a href="#">Delete</a>
                        </div>
                    </footer>
                </article>
`,
    styles:[`
`]
})
export class MessageComponent {
    message: Message = new Message('The content', null, 'Blake');
}