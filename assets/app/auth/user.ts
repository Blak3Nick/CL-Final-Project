//Creates the User object for the app to use

export class User {

    constructor (public email: string, public password: string, public firstName?: string, public lastName?: string) {

    }
}