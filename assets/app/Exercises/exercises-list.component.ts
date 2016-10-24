import {Component, OnInit} from "angular2/core";
import {ExerciseComponent} from "./exercise.component";
import {Exercise} from "./exercise";
import {ExerciseService} from "./exercise.service";

@Component({
    selector: 'my-exercise-list',
    template: `
            <section class="col-md-8 col-md-offset-2">
            <my-message *ngFor="#exercise of exercises" [exercise]="exercise" (editClicked)="exercise.exName = $event" ></my-message>
            </section>
`,
    directives: [ExerciseComponent]

})

export class ExerciseListComponent implements OnInit{
    constructor(private _exerciseService: ExerciseService){

    }
    exercises: Exercise[] = [];
    ngOnInit() {
        this._exerciseService.getExercise()
            .subscribe(
                messages => {
                    this.exercises =  exercises;
                    this._exerciseService.exercises = exercises;
                }
            );
    }
}