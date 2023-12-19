import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss'],
})
export class TabsContainerComponent implements OnInit, AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList();

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter((tab) => tab.isActive);

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach((tab) => {
      tab.isActive = false;
    });

    tab.isActive = true;

    return false;
  }
}
