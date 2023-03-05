import { GetServerSidePropsContext } from "next"
import { Calendar } from "../../components/Calendar"
import { requireAuthentication } from "../../utils/requireAuthentication"

const Calendrier = () => {
    return(
        <Calendar/>
    )
}


export default Calendrier

Calendrier.requireAuth = true

export function getServerSideProps(context: GetServerSidePropsContext){
    return requireAuthentication(context, ( session ) => {
        return {
          props: session
        }
      })
}