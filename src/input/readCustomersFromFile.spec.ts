import { createTempFile } from "./readCustomersFromFile.specUtil";
import readCustomersFromFile from "./readCustomersFromFile";

describe("readCustomersFromFile", () => {
  it("should return customers", done => {
    createTempFile(` 
      {"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}
      {"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}
    `)
      .then(path => readCustomersFromFile(path))
      .then(customers => {
        expect(customers.length).toBe(2);
        expect(customers[0]).toEqual({
          latitude: 52.986375,
          user_id: 12,
          name: "Christina McArdle",
          longitude: -6.043701
        });
        expect(customers[1]).toEqual({
          latitude: 51.92893,
          user_id: 1,
          name: "Alice Cahill",
          longitude: -10.27699
        });
        done();
      });
  });

  it("should accept customer with extra property", done => {
    createTempFile(` 
      {"foo": "bar", "latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}
    `)
      .then(path => readCustomersFromFile(path))
      .then(customers => {
        expect(customers[0]).toEqual({
          latitude: 52.986375,
          user_id: 12,
          name: "Christina McArdle",
          longitude: -6.043701
        });
        done();
      });
  });

  it("should return error if no file is provided", done => {
    readCustomersFromFile("").catch(error => {
      expect(error).toContain("A file path must be provided");
      done();
    });
  });

  it("should return error if the file does not exist", done => {
    readCustomersFromFile("foo").catch(error => {
      expect(error).toContain("Unable to open customers file");
      done();
    });
  });

  it("should return error if a line can't be parsed to JSON", done => {
    createTempFile(` 
      foo
    `)
      .then(path => readCustomersFromFile(path))
      .catch(error => {
        expect(error).toContain("Unable to process line");
        done();
      });
  });

  it("should return error if a line is not a customer", done => {
    createTempFile(` 
      {"foo": "bar"}
    `)
      .then(path => readCustomersFromFile(path))
      .catch(error => {
        expect(error).toContain(`Unable to process line`);
        done();
      });
  });

  it("should return error if a coordinate can't be parsed", done => {
    createTempFile(` 
      {"latitude": "foo", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}
    `)
      .then(path => readCustomersFromFile(path))
      .catch(error => {
        expect(error).toContain("Unable to process line");
        done();
      });
  });
});
