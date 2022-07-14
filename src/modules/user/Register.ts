import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  //   FieldResolver,
  //   Root,
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  //   @FieldResolver(() => String)
  //   async name(@Root() parent: User) {
  //     return `${parent.firstName} ${parent.lastName}`;
  //   }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
    return user;
  }
}
