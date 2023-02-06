import React from 'react';
import { useParams } from 'react-router-dom'

const UserResults = () => {

    const {id} = useParams()


  return (
        <div>Soy el resultado del id {id}</div>
  )
}

export default UserResults;