import { User } from "../../entity/User";
import { Resolver } from "type-graphql";
import { BaseResolver } from "../../utils/baseResolver";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class CreateUserResolver extends BaseResolver("User", User, RegisterInput, User) {

}