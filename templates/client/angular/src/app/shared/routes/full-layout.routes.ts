import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const FULL_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  },
];
