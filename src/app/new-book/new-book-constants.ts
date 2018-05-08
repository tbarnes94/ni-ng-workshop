import { Injectable } from "@angular/core";

@Injectable()
export class NewBookConstants {
    titleMinLength:number = 3;
    authorMinLength:number = 5;
    titleErrorRequired:string = 'The Title field is required.';
    titleErrorMinLength: string = 'The Title field must have at least ' + this.titleMinLength + ' characters.';
    authorErrorRequired:string = 'The Author field is required.';
    authorErrorMinLength:string = 'The Author field must have at least ' + this.authorMinLength + ' characters.';
    authorErrorFullName:string = 'The Author field must have a first and last name.';
    ratingErrorRequired:string = 'The Rating input is required.'
}