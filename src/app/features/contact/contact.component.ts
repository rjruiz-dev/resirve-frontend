/**
 * Contact Component - ReSirve Frontend
 * 
 * Página de contacto general con información y opciones de contacto.
 */

import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  
  private formSubmittedSignal = signal(false);
  private formSuccessSignal = signal(false);

  readonly formSubmitted = this.formSubmittedSignal.asReadonly();
  readonly formSuccess = this.formSuccessSignal.asReadonly();
  
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
  
  contactMethods = [
    {
      icon: 'bi-whatsapp',
      title: 'WhatsApp',
      description: 'Chatea con nosotros',
      link: 'https://wa.me/5491112345678',
      color: 'success'
    },
    {
      icon: 'bi-envelope',
      title: 'Email',
      description: 'info@resirve.com',
      link: 'mailto:info@resirve.com',
      color: 'primary'
    },
    {
      icon: 'bi-instagram',
      title: 'Instagram',
      description: '@resirve',
      link: 'https://instagram.com',
      color: 'danger'
    }
  ];
  
  submitForm(): void {
    if (this.contactForm.invalid) return;
    
    this.formSubmittedSignal.set(true);

    // Simular envío (en producción iría a un endpoint)
    setTimeout(() => {
      this.formSuccessSignal.set(true);
      this.contactForm.reset();
      this.formSubmittedSignal.set(false);
    }, 1000);
  }
}
