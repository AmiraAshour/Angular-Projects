import { Component, computed, inject, input, OnInit, DestroyRef } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userName = input.required<string>();
  title = input.required<string>();
  // userId = input.required<string>();
  // usersService = inject(UsersService);
  // activatedRoute = inject(ActivatedRoute);
  // destroyRef = inject(DestroyRef);
  // // userName = computed(() => this.usersService.users.find(user => user.id === this.userId())?.name || 'Unknown User');
  // userName = '';
  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (params) => {
  //       const user = this.usersService.users.find(user => user.id === params.get('userId'));
  //       this.userName = user ? user.name : 'Unknown User';
  //     }
  //   }
  //   );
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

}
export const resolveUserName: ResolveFn<string> = (
  ActivatedRoute: ActivatedRouteSnapshot,
  routerStatics: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userId = ActivatedRoute.paramMap.get('userId');

  const user = usersService.users.find(user => user.id === userId);
  return user ? user.name : 'Unknown User';

}
export const resolveTitle: ResolveFn<string> = (
  ActivatedRoute: ActivatedRouteSnapshot,
  routerStatics: RouterStateSnapshot
) => {
  return resolveUserName(ActivatedRoute, routerStatics) + '\'s Tasks';
}
