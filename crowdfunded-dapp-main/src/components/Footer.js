import { Stack,Text } from "@chakra-ui/react"

const Footer=()=>{
    return(
        <>
        <footer >
            <Stack px={'16'} py={'22'} direction={'row'} color={'#fff'} justifyContent={'space-between'} backgroundColor={'#000000'}>
                <Text>Created by Manasa</Text>
                <Text>© Manasa</Text>

            </Stack>
        </footer>
        </>
    )
}

export default Footer