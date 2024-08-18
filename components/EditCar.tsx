"use client"

import { useGetCar } from "@/libs/hooks";
import EditForm from "./form/EditForm";
import { LinearProgress } from "@mui/material";

const EditCar = (props: {setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>, id: string}) => {

  const { setOpenPopup, id } = props;

  const { status, isFetching, error, data} = useGetCar(id);

  if (isFetching) return (
    <div>
      <h1>Loading...</h1>
      <LinearProgress />
    </div>
  )
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>
  if (!data) return <h1>Car not found</h1>

  return <EditForm setOpenPopup={setOpenPopup} car={data.car} id={id} />

}

export default EditCar