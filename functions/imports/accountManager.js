import axios from "axios";
import React from "react";

const apiKey = "AIzaSyAy9WMucsrSr1U0b3s7yZNYUItVB3G1Lg4"

export async function signIn(password, email) {
    const result = axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + apiKey,
        {   password: password,
            email: email,
            returnSecureToken: true
        }
    )
    return result
}

export async function Register(password, email) {
    const result = axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey,
        {   password: password,
            email: email,
            returnSecureToken: true
        }
    )
    return result
}