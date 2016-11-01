
//Defines what an exercise is and allows the app to use it as a model

export class Exercise {
    exName: string;
    sets: number;

    reps: number;
    weight: number;
    id: string;


    constructor (exName?: string, sets?: number, reps?: number, weight?: number, id?: string ) {
        this.exName = exName;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.id = id;


    }
}