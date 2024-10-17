import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class JWTTokenService {
    decodedToken: { [key: string]: string };
    constructor(private router: Router, private authService: AuthService) { }


  private decodeToken() {
    const token = this.authService.getToken();
    if (token !== null) {
      try {
        this.decodedToken = jwtDecode(token);
      } catch (error) {
        this.router.navigate(['/']);
        return true;
      }
    }
  }


  private getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  public isTokenExpired(): boolean {
    const expiryTime: number = +this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }

}