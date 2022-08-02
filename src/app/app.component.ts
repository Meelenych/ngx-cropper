import { Component } from '@angular/core';

import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-cropper';
  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: any = null;
  public messages: any[] = [];
  public facingMode: string = 'environment';
  public showWebcam = true;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  image: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  addMessage(message: any): void {
    console.log(message);
    this.messages.unshift(message);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.addMessage('Received webcam image');
    console.log(webcamImage);
    this.webcamImage = webcamImage;
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
}

