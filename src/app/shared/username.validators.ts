import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UsersService } from "./users.service";


export function usernameUsedValidator(usersService: UsersService, oldUsername: string): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return usersService.checkUsernameAvailability(control.value)
            .pipe(
                map((response: boolean) => {
                    if(!response && control.value !== oldUsername)
                        return {usernameUsed: true};
                    return null;
                })
            );
    }
}