import { EventEmitter, Injectable } from '@angular/core';
import { ContextMenuItem } from 'src/app/components/context-menu.component';
import { EnvironmentType } from 'src/app/types/environment.type';

export type ContextMenuEventType = {
  event: MouseEvent;
  items: ContextMenuItem[];
};

@Injectable()
export class EventsService {
  public contextMenuEvents: EventEmitter<ContextMenuEventType> = new EventEmitter();
  public settingsModalEvents: EventEmitter<any> = new EventEmitter();
  public changelogModalEvents: EventEmitter<any> = new EventEmitter();
  public environmentDeleted: EventEmitter<EnvironmentType> = new EventEmitter();

  constructor() { }
}
