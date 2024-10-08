import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  onSubmitForm(formData: NgForm){

    if (formData.form.invalid) {
      return
    }

    const enteredEmail : string = formData.form.value.enteredEmail;
    const enteredPassword : string = formData.form.value.enteredPassword;

    console.log(enteredEmail, enteredPassword);
  }
}
