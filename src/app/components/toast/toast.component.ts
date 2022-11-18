import { Component } from '@angular/core';
import { ToastUseCase } from "../../use-cases/toast-use-case";
import { Toast } from "../../interfaces/toast";
import { ToastType } from "../../interfaces/toast-type";
import { Subscription, timer } from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent {

  private TIMER_MS = 3000

  toast: Toast | undefined
  show: Boolean = false
  timer = timer(this.TIMER_MS)
  timerSubscription: Subscription | undefined

  constructor(private toastUseCase: ToastUseCase) { this.observeEmitter() }

  getToastColor() {
    switch (this.toast?.type) {
      case ToastType.MESSAGE:
        return 'alert-primary'
      case ToastType.SUCCESS:
        return 'alert-success'
      case ToastType.ERROR:
        return 'alert-danger'
      default:
        return 'alert-primary'
    }
  }

  private observeEmitter() {
    this.toastUseCase.toastEmitter
      .asObservable()
      .subscribe({
        next: toast => {
          this.showToast(toast)
        }
      })
  }

  private showToast(toast: Toast) {
    this.toast = toast
    this.show = true
    this.timerSubscription?.unsubscribe()
    this.timerSubscription = this.timer
      .subscribe({
        next: () => {
            this.show = false
          }
        }
      )
  }
}
