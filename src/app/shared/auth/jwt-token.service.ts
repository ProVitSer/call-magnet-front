import { Injectable, AfterViewInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class JWTTokenService {
    decodedToken: { [key: string]: string };
    constructor(private router: Router, private authService: AuthService) { }


  decodeToken() {
    const token = this.authService.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        this.router.navigate(['/']);
        return true;
      }
    }
    this.decodedToken = jwtDecode(token);
  }

  getDecodeToken() {
    const token = this.authService.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        this.router.navigate(['/']);
        return true;
      }
    }
    return false;
  }


  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = +this.getExpiryTime();

    if (expiryTime) {

      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }

}