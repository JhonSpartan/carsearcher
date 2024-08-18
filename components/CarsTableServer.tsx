import { CarShape } from "@/types";
import CarsTableClient from "./CarsTableClient";

const URL = '';

async function getCars() {
  const res = await fetch(`/api/cars`, {
    cache: "no-cache",
    next: {
      tags: ["cars"]
    }
  });

  const carsList = await res.json();
  const cars: CarShape[] = carsList.cars;
  return cars;
}

const CarsTableServer = async () => {

  const cars = await getCars();

  return (
    <CarsTableClient cars={cars}/>
  )
}

export default CarsTableServer;