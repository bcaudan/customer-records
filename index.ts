import readCustomersFromFile from "./src/input/readCustomersFromFile";
import filterWithinDistanceOf from "./src/distance/filterWithinDistanceOf";

const customersFile = process.argv[2];
const maxDistance = 100;
const dublin = {
  latitude: 53.339428,
  longitude: -6.257664
};

readCustomersFromFile(customersFile)
  .then(customers => {
    const eligibleCustomers = filterWithinDistanceOf(
      customers,
      maxDistance,
      dublin
    );
    console.log(eligibleCustomers.length);
  })
  .catch(error => {
    console.error("Error:", error);
    process.exit(1);
  });
