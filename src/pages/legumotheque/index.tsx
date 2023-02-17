import { TableSort } from "../../components/Table";
import { api } from "../../utils/api";

const VegetablesEntries = () => {
    const query = api.vegetable.getAll.useQuery();
    
    return (
      <>
      {query.isLoading && <div> Chargement .. </div>}
      {query.data && <TableSort data={query.data}/>}
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