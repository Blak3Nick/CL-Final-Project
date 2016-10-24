
//Defines what an exercise is and how to use it

export class Exercise {
    exName: string;
    username: string;
    sets: number;
    userId: string;
    reps: number;
    weight: number;


    constructor (exName?: string, sets?: number, username?: string, userId?: string, reps?: number, weight?: number ) {
        this.exName = exName;
        this.sets = sets;
        this.username = username;
        this.userId = userId;
        this.reps = reps;
        this.weight = weight;

    }
}