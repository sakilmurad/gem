import { useRouter } from "next/router";
import { authorization } from '../firebase/config'
import { onAuthStateChanged } from '@firebase/auth'

const withAuth = (WrappedComponent) => {
    return (props) => {
      // checks whether we are on client / browser or server.
      if (typeof window !== "undefined") {
        const Router = useRouter();
  
        onAuthStateChanged(authorization, (user) => {
            if (!user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              Router.push("/signin")
              return null;
              // ...
            }
          });
  
        return <WrappedComponent {...props} />;
      }
  
      // If we are on server, return null
      return null;
    };
  };
export default withAuth
