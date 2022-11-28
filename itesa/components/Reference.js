import React from 'react'
import  {Alert, Button}  from '@chakra-ui/react'
import { useSelector } from 'react-redux'


const Reference = () => {

    const userRedux = useSelector((state) => state.user);
    const { reference } = userRedux;
    
    const data = {url:`http://localhost:3000/register/${reference}`}

    const handleClick = () => {
        alert("El codigo para referir es: " + reference)
    }

    const handleReference = () => {
        if(window.navigator.share){
        window.navigator.share(data)
        .then(() => console.log("Compartido"))
        .catch((error) => console.log("Error", error))
        }else{
            alert(`Tu url para compartir es -->  ${data.url}`)
        }
    }
 
  

    
    
  return (
    <div>
        <Button onClick={handleClick} >Ver codigo para referir</Button>
        <Button onClick={handleReference}>Compartir mi codigo</Button>
    </div>
  )
}

export default Reference