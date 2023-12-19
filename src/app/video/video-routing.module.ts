import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToHome,
    },
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToHome,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
