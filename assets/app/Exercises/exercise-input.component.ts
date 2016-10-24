
import {Component} from "angular2/src/core/metadata";
import {Exercise} from "./exercise";
import {Http} from "angular2/http";
import {ExerciseService} from "./exercise.service";
import {OnInit} from "angular2/core";
@Component({
    selector: 'my-exercise-input',
    template: `
        <section class="col-md-8 col-md-offset-2">
        <form (ngSubmit)="onSubmit(f.value)" #f="ngForm">
            <div class="form-group">
                <label for="exName">Exercise Name</label>
                <input ngControl="exName" type="text" class="form-control" id="exName" #input [ngModel]="exercise?.exName">
            </div>
            <button type="submit" class="btn btn-primary" (click)="onCreate(input.value)"> {{!exercise ? 'Log Exercise' : 'Save Exercise'}}</button>
            <button type="button" (click)="onCancel()" *ngIf="exercise" class="btn btn-danger">Cancel</button>
            </form>
        </section>
`,


})


export class ExerciseInputComponent implements OnInit{
    exercise: Exercise = null;
    constructor(private _exerciseService: ExerciseService) {

    }
    onSubmit(form: any) {
        if (this.exercise){
            //Edit
            this.exercise.exName = form.exName;
            this._exerciseService.updateExercise(this.exercise)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            this.exercise = null;
        }else {
            const exercise: Exercise = new Exercise(form.exName, null, 'Dummy');
            this._exerciseService.addExercise(exercise)
                .subscribe(
                    data => {
                        console.log(data);
                        this._exerciseService.exercises.push(data);
                    },
                    error => console.error(error)

                );}
    }
    onCreate(content: string)
    {

    }
    onCancel() {
        this.exercise = null;
    }
    ngOnInit(){
        this._exerciseService.exerciseIsEdit.subscribe(
            exercise => {
                this.exercise = exercise;
            }
        );
    }
}