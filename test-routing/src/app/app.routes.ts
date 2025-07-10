
import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, state) => {

  const router = inject(Router);
  const shouldGetAccess = Math.random() < 0.5;
  if (shouldGetAccess) {
    return true; // Allow access to the route
  }
  return new RedirectCommand(router.parseUrl('/unauthorized')); // Redirect to the home page if access is denied
}
export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task selected',
  },
  {
    path: 'users/:userId',//<your-domain>/users/:userId
    component: UserTasksComponent,
    loadChildren: () => import('./users/users.routes').then(m => m.userRoutes),
    // canMatch: [dummyCanMatch], // Example of a CanMatch guard
    data: {
      title: 'User Tasks'
    },
    resolve: {
      userName: resolveUserName
    },
    title: resolveTitle

  },
  {
    path: '**',
    component: NotFoundComponent // This will match any path that is not defined above
  }
];
