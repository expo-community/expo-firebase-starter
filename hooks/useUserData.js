import { useEffect, useState, useContext } from 'react';
import { firestore, partiesListener, userDataListener } from '../config/firebase';
import { AuthenticatedUserContext } from '../providers';

export const useUserData = () => {
  // password will not be initially visible
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    // function that toggles password visibility on a TextInput component on a confirm password field
    console.log("at party hook")
    if (user) {
        const unsubscribe = userDataListener((snapshot) => {
            const doc = {...snapshot.data(), id: snapshot.id}
            if (doc) {
                setCurrentUser(doc)
                setLoaded(true)
                console.log("at party")
            } else {
                if (currentUser) setLoaded(false)
                setCurrentUser(null)
            }
        })
        return unsubscribe
    }
    
  }, [user])

  

  return [loaded, currentUser];
};
