import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  isFetching = signal<boolean>(false);
  error = signal('');

  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  places = this.placesService.loadedUserPlaces;
  ngOnInit(): void {
    this.isFetching.set(true);
    let subscribe = this.placesService.loadUserPlaces()
      .subscribe({

        error: (error) => {
          this.error.set(error.message || 'An error occurred while fetching places.');
        },
        complete: () => {
          this.isFetching.set(false);
        }

      });

    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }
  onRemovePlace(place: Place) {
    const subscribe = this.placesService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }
}
