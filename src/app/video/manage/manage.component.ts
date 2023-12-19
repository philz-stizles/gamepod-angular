import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip/clip.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  clips: IClip[] = [];
  videoOrder = '1';
  activeClip: IClip | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((qParams: Params) => {
      this.videoOrder = qParams['sort'] === '2' ? qParams['sort'] : '1';
    });

    this.clipService.getUserClips(this.videoOrder).subscribe((clips) => {
      this.clips = clips;
    });
  }

  sort = (event: Event) => {
    const { value } = event.target as HTMLSelectElement;
    // this.router.navigateByUrl(`/manage?sort=${value}`);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: value },
    });
  };

  openModal = ($event: Event, clip: IClip) => {
    $event.preventDefault();
    this.activeClip = clip;

    this.modalService.toggleModal('editClip');
  };

  deleteClip = async ($event: Event, clip: IClip) => {
    $event.preventDefault();

    await this.clipService.deleteClip(clip);

    this.clips.forEach((item, index) => {
      if (item.docID === clip.docID) {
        this.clips.slice(index, 1);
      }
    });
  };

  update = ($event: IClip) => {
    this.clips.forEach((clip, index) => {
      if (clip.docID === $event.docID) {
        this.clips[index].title = $event.title;
      }
    });
  };
}
