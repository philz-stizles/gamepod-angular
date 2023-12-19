import { ModalService } from './../../services/modal/modal.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  // Input properties.
  @Input() activeClip: IClip | null = null;

  // Output properties.
  @Output() onUpdate = new EventEmitter<IClip>();

  // Form properties
  clipId = new FormControl('', {
    nonNullable: true,
  });
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  editForm = new FormGroup({
    id: this.clipId,
    title: this.title,
  });
  isSubmitting = false;

  // Alert properties.
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip.';

  constructor(
    private modalService: ModalService,
    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.modalService.registerModal('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }

    this.clipId.setValue(this.activeClip.docID!);
    this.title.setValue(this.activeClip.title);

    this.showAlert = false;
  }

  ngOnDestroy(): void {
    this.modalService.unRegisterModal('editClip');
  }

  setAlert = ({
    showAlert,
    alertColor = 'blue',
    alertMsg = 'Please wait! Updating clip.',
  }: any) => {
    this.showAlert = showAlert;
    this.alertColor = alertColor;
    this.alertMsg = alertMsg;
  };

  submit = async () => {
    try {
      if (!this.activeClip) {
        return;
      }

      this.isSubmitting = true;
      this.showAlert = true;
      this.alertColor = 'blue';
      this.alertMsg = 'Please wait! Updating clip.';

      await this.clipService.updateClip(this.clipId.value, {
        title: this.title.value,
      });

      this.isSubmitting = false;
      this.alertColor = 'blue';
      this.alertMsg = 'Success!';

      this.activeClip.title = this.title.value;
      this.onUpdate.emit(this.activeClip);
    } catch (error) {
      console.log(error);
      this.isSubmitting = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later.';
      return;
    }
  };
}
