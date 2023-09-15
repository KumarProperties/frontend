import { Component } from '@angular/core';
import { ModalService } from 'src/app/modal-service.service';
import { ModalAbstract } from '../modal-abstract';

import * as bootstrap from 'bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.css'],
})
export class CommonFormComponent extends ModalAbstract {
  modal: any;
  selectedProject: string = 'Select a Project';
  projects: any = [];
  isProjectInclude: any = [];
  projName: string = '';
  storedString: string = '';
  title: string = '';
  utm: string = '';
  enquireForm: any = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z\\s]+$'),
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    Project: new FormControl('', [Validators.required]),
    Remarks: new FormControl(''),
    Utm_Source: new FormControl(''),
  });

  constructor(modalService: ModalService, private api: ApiService) {
    super(modalService, 'COMMON_FORM');
    this.api.title$.subscribe((newTitle) => {
      this.title = newTitle;
      newTitle ? (this.selectedProject = newTitle) : {};
    });
  }
  openProjects() {
    console.log(document.querySelector('#filter-switch-project'), 'sg');
    (document.querySelector('#filter-switch-project') as any)!.click();
  }

  ngOnInit() {
    const url: any = new URL(window.location.href);
    const params = new URLSearchParams(url);
    url.searchParams.forEach((val: string, key: string) => {
      console.log(key, val);
      if (key == 'utm_source') {
        this.enquireForm.patchValue({ Utm_Source: val });
      }
    });
    console.log('patched params', this.enquireForm.value);
    console.log('enquireForm', this.enquireForm);
    const retrievedString = localStorage.getItem('dropdownProject');
    console.log(localStorage.getItem('dropdownProject'), 'asdfghjkl');
    if (retrievedString !== null) {
      this.storedString = retrievedString;
    }
  }
  ngAfterViewInit() {
    this.api.getProjects().subscribe({
      next: ({ data }: any) => {
        this.projects = data;
      },
    });
    setTimeout(() => {
      const el = document.getElementById('exampleModal') as HTMLElement;
      this.modal = new bootstrap.Modal(el);
    }, 100);
  }
  selectProject(title: string) {
    this.selectedProject = title;
  }
  open() {
    setTimeout(() => {
      this.modal.show();
      console.log(this.modal);
    }, 200);
  }

  close() {
    this.modal.hide();
  }

  submitEnquireForm() {
    console.log(this.enquireForm, 'submitEnquireForm now');
    this.enquireForm.patchValue({ Project: this.selectedProject });
    if (this.enquireForm.valid) {
      console.log('isProjectInclude:', this.enquireForm.value);
      this.api.postQlead(this.enquireForm.value).subscribe({
        next: (val) => {
          console.log(val);

          Swal.fire({
            title: 'Success!',
            text: 'Thank you for sharing your contact details. Our representative will get back to you shortly!',
            icon: 'success',
            confirmButtonColor: '#f27f0c',
          }).then((result) => {
            if (result.isConfirmed) {
              this.api.setFormSubmitted(true);
              localStorage.setItem('isFormSubmitted', 'true');
              this.isProjectInclude.push(this.enquireForm.value.Project);
              console.log('isProjectInclude', this.isProjectInclude);
              localStorage.setItem(
                'isProjectInclude',
                JSON.stringify(this.isProjectInclude)
              );
              this.enquireForm.reset();
              this.api.pushEvent({ event: 'formSubmit', name: 'Thank_You' });
              this.modal.hide();
            }
          });
        },
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all the details',
        confirmButtonColor: '#f27f0c',
        icon: 'error',
      });
    }
  }
}
