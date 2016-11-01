import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {User} from "./user";
import {AuthService} from "./auth.service";
import {Router} from "angular2/router";

//Create the sign in component

@Component({
    selector: 'my-sign-in',
    template: `
        <section class="col-md-8 col-md-offset-2">
    <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
        <label for="email">Mail</label>
        <input [ngFormControl]="myForm.find('email')" type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
        <label for="password">Password</label>
        <input [ngFormControl]="myForm.find('password')" type="password" id="password" class="form-control">
        </div>   
        <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Sign In</button>
    </form>
</section>
`
})

export class SigninComponent implements OnInit{
    myForm: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {

    }

    onSubmit(){
       const user = new User(this.myForm.value.email, this.myForm.value.password );
        this._authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this._router.navigateByUrl('/');
                },
                error => console.error(error)
            );

    }

    ngOnInit() {
        this.myForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]

        });
    }

    private isEmail(control: Control): { [s: string]: boolean } {
        if (!control.value.match()) {
            return {invalidMail: true}
        }
    }
}