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

const meQuery = `
{
    me {
      id,
      firstName,
      lastName,
      name,
      email
    }
  }
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: "Test2",
      lastName: "Testy2",
      email: "test2@test.com",
      password: "test123test",
    }).save();
    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  });

  it("return null", async () => {
    const response = await gCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
