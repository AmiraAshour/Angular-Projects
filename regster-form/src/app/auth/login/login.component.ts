import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (!control.value.includes('?')) {
    return { mustContainQuestionMark: true };
  }
  return null;
}
function emailIsUnique(control: AbstractControl) {
  if (control.value === 'test@example.com') {
    return of({ emailIsUnique: true });
  }
  return of(null);
}

let initialemail = '';
const savedData = window.localStorage.getItem('formData');
if (savedData) {
  const parsedData = JSON.parse(savedData);
  initialemail = parsedData.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {

  private destroyRef = inject(DestroyRef)

  form = new FormGroup({
    email: new FormControl(initialemail, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  ngOnInit(): void {
    // const savedData = window.localStorage.getItem('formData');
    // if (savedData) {
    //   const parsedData = JSON.parse(savedData);
    //
    //     this.form.patchValue({ email: parsedData.email });
    //  
    // }
    const subscription = this.form.valueChanges.pipe(debounceTime(1000)).subscribe({
      next: (value) => {
        window.localStorage.setItem('formData', JSON.stringify({ email: value.email }));
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  get emailInvalid() {
    return (this.form.get('email')?.touched && this.form.get('email')?.dirty && this.form.get('email')?.invalid);
  }
  get passwordInvalid() {
    return (this.form.get('password')?.touched && this.form.get('password')?.dirty && this.form.get('password')?.invalid);
  }
  onSubmit() {

  }
}
























// import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime, timeout } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {

//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);
//   constructor() {
//     afterNextRender(() => {
//       const savedData = window.localStorage.getItem('formData');
//       if (savedData) {
//         setTimeout(() => {
//           this.form().controls['email'].setValue(JSON.parse(savedData).email);
//         }, 1000);
//       }
//       const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
//         next: (value) => window.localStorage.setItem('formData', JSON.stringify({ email: value.email })),
//       });

//       this.destroyRef.onDestroy(() => {
//         subscription?.unsubscribe();
//       });
//     });
//   }
//   onSubmit(form: NgForm) {
//     console.log('Form Submitted!', form);
//     form.reset();
//   }
// }
