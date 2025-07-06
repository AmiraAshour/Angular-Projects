import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal<boolean>(false);
  error = signal('');
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.isFetching.set(true);
    let subscribe = this.placesService.loadAvailablePlaces()
      .subscribe({
        next: (places) => {
          this.places.set(places);
          console.log(places);
        },
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
  onSelectPlace(place: Place) {
    const subscribe = this.placesService.addPlaceToUserPlaces(place).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }
}
