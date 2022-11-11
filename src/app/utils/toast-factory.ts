import { Toast } from "../interfaces/toast";
import { ToastType } from "../interfaces/toast-type";

export class ToastFactory {

  static getMessage(message: string): Toast {
    return {
      type: ToastType.MESSAGE,
      message
    }
  }

  static getSuccess(message: string): Toast {
    return {
      type: ToastType.SUCCESS,
      message
    }
  }

  static getError(message: string): Toast {
    return {
      type: ToastType.ERROR,
      message
    }
  }
}
