import {Component, EventEmitter, Input, Output} from "angular2/core";
import {Exercise} from "./exercise";
import {ExerciseService} from "./exercise.service";

//Creates the main exercise component

@Component({
    selector: 'my-exercise',
    template: `
                <article class="panel panel-default" >
                    <div class="panel-body">
                    
                      <div class="reverse"> {{ exercise.exName}}({{ exercise.date }})  </div>
                            
                 </div> 
                 <div class="author">
                      <p>Total Sets </p>  
                         <p class="col-sm-1 col-sm-offset-1 specColor"> {{ exercise.sets}}</p> 
                 </div>
                 <div class="author">
                      <p> Reps Per Set </p>
                      <p class="col-sm-1 col-sm-offset-1 specColor"> {{ exercise.reps}} </p>
                 </div>
                 <div class="author">
                       <p> Weight Used</p>
                       <p class="col-sm-1 col-sm-offset-1 specColor">{{ exercise.weight}} </p> 
                 </div>

                 <footer class="panel-footer">
                 
                        <div class="config" *ngIf="belongsToUser()">
                            <a class="col-sm-1" (click)="onEdit()">Edit</a>
                            <a class="col-sm-1 col-sm-offset-1" (click)="onDelete()">Delete</a>
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
    .reverse {
        background-color: grey;
        text-align: center;
    }
    .btn {
    background-color: purple;
    }
    .specColor {
    color: #721aad;
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