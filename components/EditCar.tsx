import EditForm from "./form/EditForm";
import { useGetCar } from "@/libs/hooks";
import { LinearProgress } from "@mui/material";
import { useThemeContext } from "@/libs/contexts/context";

const EditCar = (props: {setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>, id: string}) => {

  const  { setOpenPopup, id } = props;

  const { setNotify } = useThemeContext();

  const { status, isFetching, error, data} = useGetCar(id);

  if (isFetching) return (
    <div>
      <h1>Loading...</h1>
      <LinearProgress />
    </div>
  )
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>
  if (!data) return <h1>Car not found</h1>

  return <EditForm setOpenPopup={setOpenPopup} setNotify={setNotify} car={data.car} />

}

export default EditCar