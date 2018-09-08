import readCustomersFromFile from "./src/input/readCustomersFromFile";
import filterWithinDistanceOf from "./src/distance/filterWithinDistanceOf";
import display from "./src/output/display";
import Customer from "./src/model/Customer";

const customersFile = process.argv[2];
const maxDistance = 100;
const dublin = {
  latitude: 53.339428,
  longitude: -6.257664
};

readCustomersFromFile(customersFile)
  .then(
    customers =>
      <Customer[]>filterWithinDistanceOf(customers, maxDistance, dublin)
  )
  .then(eligibleCustomers => display(eligibleCustomers))
  .catch(error => {
    console.error("Error:", error);
    process.exit(1);
  });
