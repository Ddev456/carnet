import { Button, Image } from '@mantine/core'
import { useRouter } from 'next/router'
import { AccordionSheet } from '../../../components/AccordionSheet'
import { IoChevronBack } from 'react-icons/io5'
import { SheetPaper } from '../../../components/SheetPaper'
import { UseTRPCQueryOptions } from '../index'
import { api } from '../../../utils/api'
import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { requireAuthentication } from '../../../utils/requireAuthentication'


const Sheet = () => {
    const router = useRouter()
    const [id, setId] = useState<string>('')
    
    useEffect(()=>{
        if(!router.isReady) return;
        if(Array.isArray(router.query.id)) {
            return
        }else if(router.isReady){
            setId(router.query.id as string)
        }
    
    }, [router.isReady]);

    const queryById = api.vegetable.getById.useQuery<UseTRPCQueryOptions>({id: id}, {enabled: !!id, refetchOnWindowFocus: false})

    if(!router.isReady) return <p>Chargement ..</p>

    return <>
        <Button leftIcon={<IoChevronBack />} onClick={()=> void router.push('/legumotheque')} variant="white" color="lime">
            Retour
        </Button>
        <SheetPaper>
        {/* <Image
        radius="md"
        src={data.icon}
        alt="Random unsplash image"
      /> */}
            <AccordionSheet />
        </SheetPaper>
    </>
}

export default Sheet

Sheet.requireAuth = true

export function getServerSideProps(context: GetServerSidePropsContext){
    return requireAuthentication(context, ( session ) => {
        return {
          props: session
        }
      })
}