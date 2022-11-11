import { EventEmitter, Injectable } from "@angular/core";
import { Toast } from "../interfaces/toast";

@Injectable({
  providedIn: 'root'
})
export class ToastUseCase {
  toastEmitter: EventEmitter<Toast> = new EventEmitter<Toast>()

  show(toast: Toast) {
    this.toastEmitter.emit(toast)
  }
}
