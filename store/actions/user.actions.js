import { userService } from "../../services/user.service";
import { SET_USER, store } from "../store";

// TODO keep doing the User Action

export function login(credentials){
return userService.login(credentials)
}