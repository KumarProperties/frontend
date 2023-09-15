import { ModalService,ModalType } from "../modal-service.service";

export interface ModalData { }

export abstract class ModalAbstract {
    readonly MODAL_TYPE: ModalType;
    constructor(protected modalService: ModalService, type: ModalType) {
        this.MODAL_TYPE = type;
        this.modalService.register(type, this);
    }

    abstract open(arg?: Partial<ModalData>): void;

    openStatusHandler(el: HTMLElement) {
        el.addEventListener('shown.bs.modal', (e) => {
            // @ts-ignore
            this.modalService.MODAL_OPEN_STATUS[this.MODAL_TYPE] = true;
        });

        el.addEventListener('hidden.bs.modal', () => {
            // @ts-ignore
            this.modalService.MODAL_OPEN_STATUS[this.MODAL_TYPE] = false;
        });
    }
}