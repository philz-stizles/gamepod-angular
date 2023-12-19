import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // providers: [ModalService],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId = '';

  // ElementRef gives you access to a components wrapper component.
  constructor(public modalService: ModalService, private el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  closeModal = () => {
    this.modalService.toggleModal(this.modalId);
  };

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }
}
