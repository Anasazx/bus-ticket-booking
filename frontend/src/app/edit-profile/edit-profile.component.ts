import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]

})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  error: string | null = null;
  currentUser: User | null = null;
  profileImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private _UserService: UserService,
    private _AuthService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      gender: [''],
      dateOfBirth: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postalCode: [''],
        country: ['']
      })
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.isLoading = true;
    this._UserService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().substring(0, 10) : '',
          address: {
            street: user.address?.street || '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            postalCode: user.address?.postalCode || '',
            country: user.address?.country || ''
          }
        });
        this.profileImage = user.profileImageUrl || 'userIcon.jpg';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile data. Please try again later.';
        this.isLoading = false;
        console.error('Error loading user profile:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const formData = new FormData();
    
    // Add form values to FormData
    const formValues = this.profileForm.value;
    Object.keys(formValues).forEach(key => {
      if (key === 'address') {
        formData.append(key, JSON.stringify(formValues[key]));
      } else {
        formData.append(key, formValues[key]);
      }
    });

    // Add profile image if selected
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    if (!this.currentUser?.id) {
      this.isSubmitting = false;
      this.error = 'User ID is missing. Cannot update profile.';
      return;
    }

    this._UserService.updateUserProfile(this.currentUser.id, formData).subscribe({
      next: (updatedUser) => {
        this.isSubmitting = false;
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        // Optionally update the current user in your application state here if needed
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = err.error?.message || 'Failed to update profile. Please try again.';
        console.error('Error updating profile:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/profile']);
  }

  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get phoneNumber() { return this.profileForm.get('phoneNumber'); }
}