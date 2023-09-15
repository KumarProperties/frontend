import { Component } from '@angular/core';
import { ModalService } from 'src/app/modal-service.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.css'],
})
export class EnquireComponent {
  chatbotInstance: any;
  constructor(private modalService: ModalService) { }
  toggleChatbot: boolean = false;
  gsap_instance: any;
  ngAfterViewInit() {
    this.gsap_instance = gsap.from('.allButons', {
      y: '  100%',
      duration: 1.8,
      ease: 'power1.out',
    });

    console.log(this.gsap_instance);
    if (this.chatbotInstance) {
      this.chatbotInstance.style.display = 'none';
    }
  }

  triggerRestart() {
    this.gsap_instance.restart();
  }
  openCommonForm() {
    console.log('Open Common Form');
    console.log(this.modalService)
    this.modalService.open('COMMON_FORM');
    console.log("Tried")
  }

  chatbot() {
    if (this.toggleChatbot) {
      this.chatbotInstance.style.display = 'none';
    } else {
      this.chatbotInstance.style.display = 'block';
    }
    this.toggleChatbot = !this.toggleChatbot;
  }
}
