import { useEffect, useState, useContext } from 'react';
import { firestore, partiesListener } from '../config/firebase';
import { AuthenticatedUserContext } from '../providers';

export const useAtParty = () => {
  // password will not be initially visible
  const [currentParty, setCurrentParty] = useState(null);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    // function that toggles password visibility on a TextInput component on a confirm password field
    console.log("at party hook")
    if (user) {
        const unsubscribe = partiesListener(user.uid, (snapshot) => {
            const doc = []
            snapshot.forEach(snap => doc.push({...snap.data(), id: snap.id}))
            if (doc.length > 0) {
                setCurrentParty(doc[0])
                console.log("at party")
            } else {
                setCurrentParty(null)
            }
        })
        return unsubscribe
    }
    
  }, [user])

  

  return currentParty;
};
