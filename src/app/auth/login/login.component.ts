import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Component({
  selector: "pms-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private initForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params["register"] === "success") {
        this.notifyMessage =
          "You have registered successfuly, you may login now!";
      }
    });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      token => {
        console.log("login success", token);
        this.router.navigate(["/properties", { login: "success" }]);
      },
      error => {
        console.log(error);
        this.errors = error.error.errors;
      }
    );
    console.log(this.loginForm.value);
  }

  isInvalidForm(fieldName: string): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }

  isFieldRequired(fieldName: string): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }
  // get passwordInvalid() {
  //   const control = this.loginForm.get("password");
  //   return control.hasError("required") && control.touched;
  // }

  // get emailFormat() {
  //   const control = this.loginForm.get("email");
  //   return (
  //     (control.hasError("email") || control.hasError("required")) &&
  //     control.touched
  //   );
  // }
}
