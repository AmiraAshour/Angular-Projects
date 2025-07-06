import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const description = interval(1000).pipe(
      map((val) => val * 2)
    ).subscribe({
      next: (value) => console.log('Value:', value),
    });

    this.destroyRef.onDestroy(() => {
      description.unsubscribe();
      console.log('Unsubscribed from interval');
    });

  }
  onClick() {
    this.clickCount.update((count) => count + 1);
    console.log('Button clicked', this.clickCount());
  }

}
