import { Component } from '@angular/core';
import { ModalService } from './../services/modal/modal.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    private modalService: ModalService,
    public authService: AuthService
  ) {}

  openModal($event: Event) {
    $event.preventDefault();

    this.modalService.toggleModal('auth');
  }

  logout = async ($event: Event) => {
    $event.preventDefault();

    await this.authService.logout();
  };
}
