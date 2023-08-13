import Footer from "./Footer"
import Nav from "./Nav"
import { Stack } from "@chakra-ui/react"

const Layout=({children})=>{
    return(
       
        <main className="page-wrapper">
        <Nav/>
        <Stack className='content'>
        {children}
        </Stack>
        <Footer/>
        </main>
        
    )
}

export default Layout