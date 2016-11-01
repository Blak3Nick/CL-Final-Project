import {Component, EventEmitter, Input, Output} from "angular2/core";
import {Exercise} from "./exercise";
import {ExerciseService} from "./exercise.service";

//Creates the main exercise component

@Component({
    selector: 'my-exercise',
    template: `
                <article class="panel panel-default" >
                    <div class="panel-body">
                    <p> EXERCISE            {{ exercise.exName}} </p>
                      
            
                 </div> 
                 <div class="author">
                      <p>TOTAL SETS      {{ exercise.sets}}</p> 
                 </div>
                 <div class="author">
                      <p> REPS {{ exercise.reps}}</p> 
                 </div>
                 <div class="author">
                       <p> WEIGHT USED{{ exercise.weight}} </p> 
                 </div>
                 <footer class="panel-footer">
                 
                        <div class="config" *ngIf="belongsToUser()">
                            <a (click)="onEdit()">Edit</a>
                            <a (click)="onDelete()">Delete</a>
                        </div>
                    </footer>
                </article>
`,
    styles: [`
    .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
        
    }
    .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
    }
`]
})
export class ExerciseComponent {
    @Input() exercise: Exercise;
    @Output() editClicked = new EventEmitter<string>();

    constructor( private _exerciseService: ExerciseService){

    }

    onEdit() {
        this._exerciseService.editExercise(this.exercise);
    }
    onDelete() {
        this._exerciseService.deleteExercise(this.exercise)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
    }
    belongsToUser() {
        return true;
    }
}