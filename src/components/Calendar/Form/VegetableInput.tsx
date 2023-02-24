import { useState } from "react";
import { api } from "../../../utils/api";
import { useAddEventFormContext } from "../hooks/addEventForm-context";
import { PickVegetableInput } from "../PickVegetableInput";

export const VegetableInput = () => {

  const query = api.vegetable.getAll.useQuery();
  // const [relatedVegetable, setRelatedVegetable] = useState(0)
  return (
    <>
      { query.data && <PickVegetableInput dataInput={query.data} /> }
    </>
  );
}