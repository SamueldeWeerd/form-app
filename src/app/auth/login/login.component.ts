import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  } else {
    return { doesNotContainQuestionMark: true};
  }
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com'){
    return of(null)
  } else {
    return of({notUniqueEmail: true})
  }

}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailIsUnique]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
      })
     }
  );

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(500)
    )
    .subscribe({
      next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))
    });
  }

  get emailIsInvalid(): boolean {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get passwordIsInvalid(): boolean {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }


}