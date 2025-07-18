import { ResolveFn, Routes } from "@angular/router";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { Task } from "../tasks/task/task.model";
import { inject } from "@angular/core";
import { TasksService } from "../tasks/tasks.service";

const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',//<your-domain>/users/:userId/tasks
    pathMatch: 'prefix' // Redirect to tasks when no child path is specified
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    // component: TasksComponent,
    loadComponent: () => import('../tasks/tasks.component').then(m => m.TasksComponent),
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',//<your-domain>/users/:userId/tasks>
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage]
  }
]
