import {Exercise} from "./exercise";
import {Http, Headers} from "angular2/http";
import {Injectable, EventEmitter} from "angular2/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";


@Injectable()

//Exercise Service that gets, puts, updates and deletes the exercises in the backend and gives them to Angular to render

export class ExerciseService {
    exercises :Exercise[] = [];
    exerciseIsEdit = new EventEmitter<Exercise>();
    constructor(private _http: Http) {}
    addExercise(exercise: Exercise) {
        const body = JSON.stringify(exercise);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):" ";
        return this._http.post('http://localhost:3000/exercise' + token , body, {headers: headers})
            .map(response => {
                const data = response.json().obj;
                let exercise = new Exercise(data.exName, data.sets, data.reps, data.weight);
                return exercise;
            })
            .catch(error => Observable.throw(error.json()));
    }

    getExercise() {
        return this._http.get('http://localhost:3000/exercise')
            .map(response => {
                const data = response.json().obj;
                let objs: any[] = [];
                for (let i=0; i<data.length; i++) {
                    let exercise = new Exercise(data[i].exName, data[i].sets, data[i].reps, data[i].weight, data[i]._id);
                    objs.push(exercise);
                    console.log(data[i]);
                };
                return objs;
            })
            .catch(error => Observable.throw(error));
    }
    updateExercise(exercise: Exercise) {
        const body = JSON.stringify(exercise);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):" ";
        return this._http.patch('http://localhost:3000/exercise/' + exercise.id + token, body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
    editExercise(exercise: Exercise) {
        this.exerciseIsEdit.emit(exercise);


    }

    deleteExercise(exercise: Exercise) {
        this.exercises.splice(this.exercises.indexOf(exercise), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):" ";
        return this._http.delete('http://localhost:3000/exercise/' + exercise.id + token)
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
}