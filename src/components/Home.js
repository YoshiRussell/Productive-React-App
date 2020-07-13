import React, { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
    return(
        <div>
            <h1>Welcome to my Todo App!</h1>
            <LoginButton />
        </div>
    )
}

export default Home