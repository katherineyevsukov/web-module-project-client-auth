import React, { useEffect } from 'react';


export default function FriendsList(props){
    useEffect(() => {
        props.getFriends()
    }, [])
   
    return(
        <div>
       { props.friends.map(fr => {
          return <p key={fr.id}>{fr.name}</p>
})}
        </div>
    )
}