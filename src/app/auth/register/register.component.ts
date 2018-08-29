import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Component({
  selector: "pms-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: any = {};
  errors: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {}

  register() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm).subscribe(
      () => {
        this.router.navigate(['/login', { register: 'success' }])
      },
      error => {
        this.errors = error.error.errors;
      }
    );
  }
}
