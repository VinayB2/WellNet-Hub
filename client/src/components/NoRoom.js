import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom"
const NoRoom = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/appointments")
    },[])
  return (
    <></>
  )
}

export default NoRoom