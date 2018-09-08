import readCustomersFromFile from "./src/input/readCustomersFromFile";
import Customer from "./src/model/Customer";

const customersFile = process.argv[2];

readCustomersFromFile(customersFile)
  .then((customers: Customer[]) => console.log(customers))
  .catch(error => {
    console.error("Error:", error);
    process.exit(1);
  });
