import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ModalAbstract } from '../modal-abstract';
import { ModalService } from 'src/app/modal-service.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent extends ModalAbstract {
  modal: any = '';
  leadData: any = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$'),
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$'),
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
  });
  constructor(modalService: ModalService, private api: ApiService) {
    super(modalService, 'POPUP');
  }

  ngAfterViewInit() {
    const el = document.getElementById('pop-up') as HTMLElement;

    this.modal = new bootstrap.Modal(el);
  }
  open() {
    this.modal.show();
    console.log('showing the modal');
  }
  close() {
    this.modal.hide();
    const backDrop = document.querySelector('.modal-backdrop');

    backDrop?.remove();
  }
  submitForm() {
    console.log('Submit form');
    console.log(this.leadData.value);

    if (this.leadData.valid) {
      this.api.postQlead(this.leadData.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Success!',
            text: 'Thank you for sharing your contact details. Our representative will get back to you shortly!',
            icon: 'success',
            confirmButtonColor: '#f27f0c',
          }).then(() => this.modal.hide());
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'Server is not responding!',
            confirmButtonColor: '#f27f0c',
            icon: 'error',
          });
        },
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all the details correctly',
        confirmButtonColor: '#f27f0c',
        icon: 'error',
      });
    }
  }
}
