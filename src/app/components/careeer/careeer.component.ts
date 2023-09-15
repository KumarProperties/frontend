import { ApiService } from 'src/app/services/api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-careeer',
  templateUrl: './careeer.component.html',
  styleUrls: ['./careeer.component.css'],
})
export class CareeerComponent {
  constructor(private api: ApiService) {}
  @ViewChild('resumeFile') resumeFile!: ElementRef;
  fileName: string = '';

  selectedFile: File = new File([], '');
  careerForm: FormGroup = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
  });

  onDrop(ev: any) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
          this.selectedFile = file;
          console.log(file);
          this.fileName = file.name;
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
        console.log('filesss', file);
      });
    }
  }
  changeFile(ev: any) {
    console.log(ev?.target.files[0]!);
    this.selectedFile = ev?.target.files[0]!;

    this.fileName = this.selectedFile.name;
  }
  onDragOver(ev: any) {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  openFiles() {
    this.resumeFile.nativeElement.click();
  }
  submitForm() {
    console.log('submitting form', this.careerForm);
    let formData = new FormData();
    formData.append('Name', this.careerForm.value.Name);
    formData.append('email', this.careerForm.value.email);
    formData.append('phone_number', this.careerForm.value.phone_number);
    formData.append('files', this.selectedFile);
    if (this.careerForm.valid) {
      this.api.submitCareerForm(formData).subscribe({
        next: (val) => {
          console.log(val);
          Swal.fire({
            title: 'Success!',
            text: 'Thanks for showing interest in Kumar Properties!',
            icon: 'success',
            confirmButtonColor: '#f27f0c',
          });
        },
        // error: (val) => {
        //   console.log(val);
        //   Swal.fire({
        //     title: 'Success!',
        //     text: 'Thanks for showing interest in Kumar Properties!',
        //     icon: 'success',
        //     confirmButtonColor: '#f27f0c',
        //   });
        // },
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill the form correctly',
        confirmButtonColor: '#f27f0c',
        icon: 'error',
      });
    }
  }
}
