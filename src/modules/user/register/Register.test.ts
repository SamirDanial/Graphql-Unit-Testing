import { gCall } from "../../../test_utils/gCall";
import { Connection } from "typeorm";

import { testConn } from "../../../test_utils/testConn";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!){
    register(data: $data) {
      id,
      firstName,
      lastName,
      name,
      email
    }
  }
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: "Test",
      lastName: "Testy",
      email: "test@test.com",
      password: "test123test",
    };
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
      },
    });

    const dbUser = await User.findOne({where : {email: user.email}})

    expect(dbUser).toBeDefined();
  });
});
