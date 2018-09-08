import { createInterface } from "readline";
import { createReadStream } from "fs";
import { Validator } from "jsonschema";

import Customer from "../model/Customer";
import CustomerInput from "./CustomerInput";

const customerSchema = require("../../../resources/customerSchema.json");

export default function(filePath: string): Promise<Customer[]> {
  const jsonValidator = new Validator();
  const customers: Customer[] = [];

  return forEachLine(filePath, (line: string) => {
    const customer: CustomerInput = JSON.parse(line);
    jsonValidator.validate(customer, customerSchema, { throwError: true });
    customers.push({
      user_id: customer.user_id,
      name: customer.name,
      latitude: parseFloatOrThrow(customer.latitude),
      longitude: parseFloatOrThrow(customer.longitude)
    });
  }).then(() => customers);
}

function forEachLine(filePath: string, processLine: Function) {
  return new Promise((resolve: Function, reject: Function) => {
    if (!filePath) {
      reject("A file path must be provided");
    }

    const input = createReadStream(filePath);
    input.on("error", () => {
      reject(`Unable to open customers file: ${filePath}`);
    });

    const lineReader = createInterface({ input });
    lineReader.on("line", line => {
      try {
        processLine(line);
      } catch (error) {
        reject(`Unable to process line: ${line}\n${error}`);
      }
    });
    lineReader.on("close", () => resolve());
  });
}

function parseFloatOrThrow(candidate: string) {
  const result = parseFloat(candidate);
  if (Number.isNaN(result)) {
    throw new Error(`${candidate} is not a number`);
  }
  return result;
}
