import { User } from "../../entity/User";
import { Resolver, Query, Ctx } from "type-graphql";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true})
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if(!ctx.req.session.userId) {
        return undefined;
    }
    console.log('ctx value:', ctx.req.session.userId)

    const user = await User.findOne({where: {id: ctx.req.session!.userId}})
    
    return user
  }
}
