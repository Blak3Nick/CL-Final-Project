import {Component} from "angular2/core";
import {ExerciseListComponent} from "./exercise-list.component";
import {ExerciseInputComponent} from "./exercise-input.component";
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