import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modals: IModal[] = [];

  constructor() {}

  registerModal = (id: string) => {
    if (!this.modals.find(modal => modal.id === id)) {
      this.modals.push({
        id,
        isOpen: false,
      });
    }
  };

  unRegisterModal = (id: string) => {
    this.modals = this.modals.filter(modal => modal.id !== id);
  };

  isModalOpen = (id: string): boolean => {
    return Boolean(this.modals.find((modal) => modal.id === id)?.isOpen);
  };

  toggleModal = (id: string) => {
    let modal = this.modals.find((modal) => modal.id === id) as IModal;
    modal.isOpen = !modal.isOpen;
  };
}
