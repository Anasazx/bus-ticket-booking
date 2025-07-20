import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    public _AuthService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false]
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get remember() {
    return this.loginForm.get('remember')!;
  }

  togglePasswordVisibility() {
    
    this.showPassword.update(value => !value);
  }



  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    this.isLoading.set(true);
    this.errorMessage.set(null);
  
    const credentials = this.loginForm.value;
  
    this._AuthService.login(credentials).subscribe({
      next: (res) => {
        const decodedToken: any = jwtDecode(res.token);
  
        const isAdmin = decodedToken.isAdmin;
        const name = decodedToken.name;
        const _id = decodedToken._id;
  
        localStorage.setItem('token', res.mytoken);
        localStorage.setItem('role', isAdmin ? 'admin' : 'user');
        localStorage.setItem('name', name);
        
        localStorage.setItem('id', _id);

  
        this._AuthService.updateLoginStatus(true);
        // this._AuthService.updateName(name);

        this.isLoading.set(false);
        this.loginForm.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const message = err.error?.message || 'Invalid credentials';
        this.errorMessage.set(message);
        console.error('Login failed:', err);
      }
    });
  }
  

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
