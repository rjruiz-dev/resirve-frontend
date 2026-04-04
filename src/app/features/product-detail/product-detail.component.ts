/**
 * Product Detail Component - ReSirve Frontend
 * 
 * Página de detalle de un producto individual con galería de imágenes,
 * información completa y formulario de contacto.
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService, ContactService } from '@core/services';
import { Product, ContactRequestCreateDTO } from '@core/models';
import { BadgeComponent, ProductCardComponent } from '@shared/components';
import { ImageFallbackDirective } from '@shared/directives';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    BadgeComponent,
    ProductCardComponent,
    ImageFallbackDirective,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private contactService = inject(ContactService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  
  private productSignal = signal<Product | null>(null);
  private relatedProductsSignal = signal<Product[]>([]);
  private selectedImageIndexSignal = signal(0);
  private loadingSignal = signal(true);
  private formSubmittedSignal = signal(false);
  private formSuccessSignal = signal(false);
  private whatsappLinkSignal = signal('');

  readonly product = this.productSignal.asReadonly();
  readonly relatedProducts = this.relatedProductsSignal.asReadonly();
  readonly selectedImageIndex = this.selectedImageIndexSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly formSubmitted = this.formSubmittedSignal.asReadonly();
  readonly formSuccess = this.formSuccessSignal.asReadonly();
  readonly whatsappLink = this.whatsappLinkSignal.asReadonly();
  
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['']
  });
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.loadProduct(slug);
    });
  }
  
  private loadProduct(slug: string): void {
    this.loadingSignal.set(true);
    
    this.productService.getProductBySlug(slug).subscribe({
      next: (product) => {
        this.productSignal.set(product);
        this.loadingSignal.set(false);
        this.loadRelatedProducts(slug);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loadingSignal.set(false);
      }
    });
  }
  
  private loadRelatedProducts(slug: string): void {
    this.productService.getRelatedProducts(slug).subscribe({
      next: (products) => this.relatedProductsSignal.set(products)
    });
  }
  
  selectImage(index: number): void {
    this.selectedImageIndexSignal.set(index);
  }
  
  submitContactForm(): void {
    if (this.contactForm.invalid || !this.product()) return;
    
    this.formSubmittedSignal.set(true);
    
    const formData: ContactRequestCreateDTO = {
      product_id: this.product()!.id,
      name: this.contactForm.value.name!,
      email: this.contactForm.value.email!,
      phone: this.contactForm.value.phone || undefined,
      message: this.contactForm.value.message || undefined
    };
    
    this.contactService.sendContactRequest(formData).subscribe({
      next: (response) => {
        this.formSuccessSignal.set(true);
        this.whatsappLinkSignal.set(response.whatsapp_link);
        this.contactForm.reset();
      },
      error: (err) => {
        console.error('Error:', err);
        this.formSubmittedSignal.set(false);
      }
    });
  }
}
