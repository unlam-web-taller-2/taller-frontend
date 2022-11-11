import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserLocalstorage {
  private USER_KEy = 'user'

  saveUser(user: User) {
    const json = this.parseToJson(user)
    localStorage.setItem(this.USER_KEy, json)
  }

  getUser() {
    const json = localStorage.getItem(this.USER_KEy)
    return this.parseFromJson(json)
  }

  private parseToJson(user: User): string {
    return JSON.stringify(user)
  }

  private parseFromJson(json: string | null): User {
    return json === null ? [] : JSON.parse(json)
  }
}
