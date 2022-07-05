import React from 'react'
import { useParams } from 'react-router-dom';

const ViewReplies = () => {

  const params = useParams();
  const applicationId = params.applicationId;

  return (
    <div>ViewReplies +{applicationId}</div>
  )
}

export default ViewReplies