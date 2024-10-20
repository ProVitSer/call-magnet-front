import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class JWTTokenService {
    constructor(private router: Router, private authService: AuthService) { }


    public isTokenExpired(tokent: string): boolean {
    
        const token = this.authService.getToken();

        const decodeToken = jwtDecode(token);

        return 1000 * decodeToken.exp - new Date().getTime() < 5000;
    }
}