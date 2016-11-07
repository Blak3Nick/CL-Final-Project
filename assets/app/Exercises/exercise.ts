
//Defines what an exercise is and allows the app to use it as a model

export class Exercise {
    exName: string;
    sets: number;
    date: string;
    reps: number;
    weight: number;
    id: string;


    constructor (exName?: string, sets?: number, date?: string, reps?: number, weight?: number, id?: string ) {
        this.exName = exName;
        this.sets = sets;
        this.date = date;
        this.reps = reps;
        this.weight = weight;
        this.id = id;


    }
}