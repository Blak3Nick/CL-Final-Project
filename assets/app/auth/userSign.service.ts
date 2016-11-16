export class userSignService {
    signedIn = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):" ";
}