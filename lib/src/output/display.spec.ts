import display from "./display";
import MockInstance = jest.MockInstance;

describe("display", () => {
  let consoleMock: MockInstance<Function>;
  beforeEach(() => {
    consoleMock = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should output name and user id", () => {
    display([
      {
        user_id: 12,
        name: "foo",
        latitude: 0,
        longitude: 0
      }
    ]);

    expect(consoleMock).toHaveBeenCalledWith(`{"user_id":12,"name":"foo"}`);
  });

  it("should output customers sorted by user id asc", () => {
    display([
      {
        user_id: 2,
        name: "foo",
        latitude: 0,
        longitude: 0
      },
      {
        user_id: 3,
        name: "foo",
        latitude: 0,
        longitude: 0
      },
      {
        user_id: 1,
        name: "foo",
        latitude: 0,
        longitude: 0
      }
    ]);

    expect(consoleMock).toHaveBeenNthCalledWith(
      1,
      `{"user_id":1,"name":"foo"}`
    );
    expect(consoleMock).toHaveBeenNthCalledWith(
      2,
      `{"user_id":2,"name":"foo"}`
    );
    expect(consoleMock).toHaveBeenNthCalledWith(
      3,
      `{"user_id":3,"name":"foo"}`
    );
  });
});
