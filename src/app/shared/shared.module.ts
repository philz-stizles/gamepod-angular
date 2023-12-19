import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import { EventBlockerDirective } from './directives/event-blocker/event-blocker.directive';

// import { ModalService } from '../services/modal/modal.service';

@NgModule({
  declarations: [
    ModalComponent,
    TabComponent,
    TabsContainerComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  exports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  providers: [
    provideNgxMask(),
    // ModalService
  ],
})
export class SharedModule {}
