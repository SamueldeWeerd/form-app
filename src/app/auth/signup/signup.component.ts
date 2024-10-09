import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function passwordsAreTheSame(controlParam1: string, controlParam2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlParam1)?.value;
    const val2 = control.get(controlParam2)?.value;
    if (val1 === val2) {
      return null
    } else {
      return { valuesNotTheSame: true};
    }
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup(
    {
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      passwords: new FormGroup({
        password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
        secondPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      }, {validators: [passwordsAreTheSame('password', 'secondPassword')]}),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      street: new FormControl('', {validators: [Validators.required]}),
      streetNumber: new FormControl('', {validators: [Validators.required]}),
      postalCode: new FormControl('', {validators: [Validators.required]}),
      city: new FormControl('', {validators: [Validators.required]}),
      role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {validators: [Validators.required]}),
      agree: new FormControl(false, {validators: [Validators.required]}),
      source: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ])

    }
  )

  onSubmit() {

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.passwords?.password;
    console.log(enteredEmail, enteredPassword);
  }

  onReset() {
    this.form.reset();
  }
}
