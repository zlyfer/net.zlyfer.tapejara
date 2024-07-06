import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'console',
        loadChildren: () =>
          import('./console/console.module').then((m) => m.ConsoleModule),
      },
      {
        path: 'file-explorer',
        loadChildren: () =>
          import('./file-explorer/file-explorer.module').then(
            (m) => m.FileExplorerModule
          ),
      },
      {
        path: '',
        redirectTo: 'console',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
