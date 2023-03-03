import { UseQueryOptions } from "@tanstack/react-query";
import { api } from "../../utils/api";

export interface UseTRPCQueryOptions extends UseQueryOptions{
  trpc: {
    refetchOnWindowFocus: boolean;
  }
}

const VegetablesEntries = () => {
    const query = api.vegetable.getAll.useQuery<UseTRPCQueryOptions>(undefined, {refetchOnWindowFocus: false});
    
    return (
      <>
      {query.isLoading && <div> Chargement .. </div>}
      {/* {query.data && <TableSort data={query.data}/>} */}
      {query.data && <></>}
      </>
    )
  };

  const Legumotheque = () => {
    return <>
        <VegetablesEntries/>
    </>
  }

  export default Legumotheque

  Legumotheque.requireAuth = true