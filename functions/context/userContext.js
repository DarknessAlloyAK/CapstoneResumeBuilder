import React, { createContext } from "react";
import { useContext, useState } from "react";

const userContext = createContext({
  accountInfo: {
    email: '',
    password: '',
    id: ''
  },
  personalInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    strAddress: '',
    city: '',
    state: ''
  },
  resumeItems: {
    workHistory: {},
    education: {},
    skills: {},
    awards: {},
    summaries: {}
  },
  resumes: {},
  jobListings: {}
})

export default function UserContextProvider({ children }) {

    const values = {
        accountInfo: {
            email: '',
            password: '',
            id: ''
        },
        personalInfo: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            strAddress: '',
            city: '',
            state: ''
        },
        resumeItems: {
            workHistory: {},
            education: {},
            skills: {},
            awards: {},
            summaries: {}
        },
        resumes: {},
        jobListings: {}       
    }

    return (<userContext.Provider value={values}>{children}</userContext.Provider>)
}