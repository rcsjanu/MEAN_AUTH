import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;
  radioSelected=false;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      pd:['no'],
      address: [''],
      DOB: ['']
    })
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      alert("Check all form details")
      return;
    } else {
      const formdata = this.registrationForm.value

      this.authService.register(formdata).subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err)
        }
      });
    }
  }


  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
  }

}
