/**
 * Category Component - ReSirve Frontend
 * 
 * Página de categoría que muestra productos filtrados por categoría específica.
 */

import { Component, OnInit, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tap, finalize } from 'rxjs';
import { CategoryService } from '@core/services';
import { Category } from '@core/models';
import { ProductCardComponent } from '@shared/components';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  private categorySignal = signal<Category | null>(null);
  private loadingSignal = signal(true);

  readonly category = this.categorySignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const slug = params['slug'];
        this.loadCategory(slug);
      });
  }

  private loadCategory(slug: string): void {
    this.loadingSignal.set(true);

    this.categoryService.getCategoryBySlug(slug).pipe(
      tap(category => this.categorySignal.set(category)),
      finalize(() => this.loadingSignal.set(false)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      error: (err) => console.error('Error al cargar la categoría:', err)
    });
  }
}
