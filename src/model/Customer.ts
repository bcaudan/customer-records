import Coordinates from "./Coordinates";

type Customer = {
  user_id: number;
  name: string;
} & Coordinates;

export default Customer;
