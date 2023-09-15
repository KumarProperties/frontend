import { Injectable } from '@angular/core';
import { ModalAbstract, ModalData } from './modals/modal-abstract';

export type ModalType = 'COMMON_FORM' | 'POPUP' | 'COOKIE';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  MODAL_MAP: Map<ModalType, ModalAbstract> = new Map();
  MODAL_OPEN_STATUS: Record<Extract<ModalType, 'NAME'>, boolean> = {
    NAME: false,
  };

  constructor() {}

  register(type: ModalType, modal: ModalAbstract) {
    this.MODAL_MAP.set(type, modal);
  }

  open(type: ModalType, arg?: Partial<ModalData>) {
    this.MODAL_MAP.get(type)?.open(arg);
  }
}
