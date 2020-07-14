import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

function Home() {

    console.log("rendering home");

    const { loginWithRedirect, isLoading } = useAuth0();

    return(
        isLoading ? (
            <h1>Loading Profile Please Wait...</h1>
        ) : (
            <div>
                <h1>Welcome to my Todo App!</h1>
                <button onClick={() => loginWithRedirect()}>Log In</button>
            </div>   
        )
    )
}

export default Home