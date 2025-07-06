
import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetcPlaces('http://localhost:3000/places', 'Failed to fetch places')
  }

  loadUserPlaces() {
    return this.fetcPlaces('http://localhost:3000/user-places', 'Failed to fetch your favorite places').pipe(
      tap({
        next: (places) => this.userPlaces.set(places)
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlace = this.userPlaces();

    if (!prevPlace.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlace, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places/', { placeId: place.id }).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlace); // revert to previous state on error
        this.errorService.showError('Failed to add place to user places');
        return throwError(() => new Error('Failed to add place to user places'));
      })
    );
  }

  removeUserPlace(place: Place) {
    const prevPlace = this.userPlaces();

    if (prevPlace.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlace.filter((p) => p.id !== place.id));
    }

    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlace); // revert to previous state on error
        this.errorService.showError('Failed to delete place to user places');
        return throwError(() => new Error('Failed to delete place to user places'));
      })
    );
  }
  private fetcPlaces(url: string, errorMassage: string) {
    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(map((response) => response.places), catchError((error) => {
        console.error(error);
        return throwError(() => new Error(errorMassage));
      }));
  }
}
