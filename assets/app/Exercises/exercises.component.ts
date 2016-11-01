import {Component} from "angular2/core";
import {ExerciseListComponent} from "./exercise-list.component";
import {ExerciseInputComponent} from "./exercise-input.component";

//Baseline Component that all other pieces of the exercise components will be rendered into

@Component({
    selector: 'my-exercises',
    template: `
        <div class="row spacing">
            <my-exercise-input></my-exercise-input>
        </div>
        <div class="row spacing">
            <my-exercise-list></my-exercise-list>
        </div>
`,
    directives: [ExerciseListComponent, ExerciseInputComponent]
})
export class ExercisesComponent {

}