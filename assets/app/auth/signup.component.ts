import {Component} from "angular2/core";
@Component({
    selector: 'my-signup',
    template: `
    <section class="col-md-8 col-md-offset-2">
    <form action="">
        <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" class="form-control">
        </div>    
        <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" class="form-control">
        </div>
        <div class="form-group">
        <label for="email">Mail</label>
        <input type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control">
        </div>   
        <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
</section>`
})

export class SignupCOmponent {

}