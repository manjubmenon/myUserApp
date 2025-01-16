import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as userData from '../common/user-data.json';
@Injectable({
    providedIn: 'root'
})
export class UserManagementService {

    constructor() { }
    userDetails = new BehaviorSubject(userData.users);
    updatedUserDetails = this.userDetails.asObservable();
    updateQuote(newQuote: any) {
        this.userDetails.next(newQuote);
    }
}