
//Defines what an exercise is and how to use it

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