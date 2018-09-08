import Customer from "../model/Customer";

export default function(customers: Customer[]) {
  return customers
    .sort(byUserIdAsc)
    .map(outputFormat)
    .map(customer => console.log(customer));
}

function byUserIdAsc(a: Customer, b: Customer) {
  if (a.user_id < b.user_id) {
    return -1;
  }
  if (a.user_id > b.user_id) {
    return 1;
  }
  return 0;
}

// I have choose to reuse the same format as the input
function outputFormat({ name, user_id }: Customer) {
  return JSON.stringify({
    user_id,
    name
  });
}
