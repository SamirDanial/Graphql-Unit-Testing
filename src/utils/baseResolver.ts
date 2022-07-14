import { Mutation, Resolver, Arg, ClassType, UseMiddleware } from "type-graphql";
import { Middleware } from "type-graphql/interfaces/Middleware";

export function BaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[],
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...( middleware || [] ))
    async create(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}
