import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserLocalstorage {
  private USER_KEY = 'user'

  saveUser(user: User) {
    const json = this.parseToJson(user)
    localStorage.setItem(this.USER_KEY, json)
  }

  getUser() {
    const json = localStorage.getItem(this.USER_KEY)
    return this.parseFromJson(json)
  }

  clear() {
    localStorage.removeItem(this.USER_KEY)
  }

  private parseToJson(user: User): string {
    return JSON.stringify(user)
  }

  private parseFromJson(json: string | null): User | null {
    return json === null ? null : JSON.parse(json)
  }
}
