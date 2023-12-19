import { Component, inject, OnDestroy } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import {
  Storage,
  UploadTask,
  getDownloadURL,
  percentage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClipService } from 'src/app/services/clip/clip.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnDestroy {
  private readonly storage: Storage = inject(Storage);
  isDragOver = false;
  file: File | null = null;
  clipUploadTask?: UploadTask;
  screenshotUploadTask?: UploadTask;
  nextStep = false;
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  uploadForm = new FormGroup({
    title: this.title,
  });

  // Alert values.
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your clip is being uploaded.';
  isSubmitting = false;

  // Upload values.
  percentage = 0;
  showPercentage = false;
  clipCreationTimeout: NodeJS.Timeout | null = null;

  constructor(
    private authService: AuthService,
    private clipService: ClipService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.clipUploadTask?.cancel();
    this.clipCreationTimeout && clearTimeout(this.clipCreationTimeout);
  }

  storeFile = ($event: Event) => {
    this.isDragOver = false;
    console.log($event);
    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;
    console.log(this.file);
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));

    this.nextStep = true;
  };

  uploadFile = async () => {
    this.uploadForm.disable();

    // Configure Alert.
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.isSubmitting = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const clipRef = ref(this.storage, clipPath);
    this.clipUploadTask = uploadBytesResumable(clipRef, this.file!);

    percentage(this.clipUploadTask).subscribe(
      async ({ progress, snapshot }) => {
        this.percentage = progress / 200;
        if (snapshot.state === 'success') {
          const clipUrl = await getDownloadURL(clipRef);
          const clip = {
            uid: this.authService.currentUser?.uid as string,
            displayName: this.authService.currentUser?.displayName as string,
            title: this.title.value,
            clipFileName: `${clipFileName}.mp4`,
            clipUrl,
            // screenshotURL,
            screenshotFileName: `${clipFileName}.png`,
            timestamp: serverTimestamp(),
          };

          console.log(clip);

          const clipDocRef = await this.clipService.createClip(clip);

          this.clipCreationTimeout = setTimeout(() => {
            this.router.navigate(['clip', clipDocRef.id]);
          }, 1000);
        }

        if (snapshot.state === 'error') {
          this.uploadForm.enable();
          console.error('Error uploading');
          this.alertColor = 'red';
          this.alertMsg = 'Upload failed! Please try again later.';
          this.isSubmitting = true;
          this.showPercentage = false;
        }
      }
    );
  };
}
