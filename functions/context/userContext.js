import React, { createContext } from "react";
import { useContext, useState, useReducer } from "react";
import { UpdateAccountInfo, GetAccountInfo } from "../imports/dataManager";

export const userContext = createContext({
  accountInfo: {},
  personalInfo: {},
  resumeItems: {},
  resumes: {},
  jobListings: {},
  setPersonalInfo: (info) => {},
  updateDatabase: (info) => {},
  setAccountInfo: (info) => {},
  setDataInfo: (info) => {},
  setResumes: (info) => {},
  setJobListings: (info) => {},
  setUpContext: (info) => {}
})

function setValue(Value) {
    return Value
}


function UserContextProvider({ children }) {

    const [accountInfo, changeAInfo] = useState({
      email: '',
      id: '',
      idToken: ''
    })
    const [personalInfo, changePInfo] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      strAddress: '',
      city: '',
      state: ''
    })
    const [data, changeData] = useState({
      workHistory: [],
      education: [],
      skills: [],
      awards: [],
      references: []
    })
    const [resumes, setResumes] = useState({})
    const [jobListings, setJobListings] = useState({})

    // Functions

    async function updateDatabase(info) {
      if (!info?.path || info.data === undefined) {
        throw new Error("updateDatabase requires path and data")
      }

      return UpdateAccountInfo(accountInfo.id, info.path, info.data)
    }

    async function setUpContext(id, email) {
      if (!id || !email) {
        throw new Error("setUpContext requires id and email")
      }
      const dataResult = await GetAccountInfo(email)
      if (dataResult) {
        changeAInfo(dataResult.Account)
        changePInfo(dataResult.Personal)
        
        for (const key in dataResult.Data) {
          if (key == false) {
            changeData((prev) => ({...prev, [key]: {}}))
          } else {
            changeData((prev) => ({...prev, [key]: dataResult.Data[key]}))
          }
        }

        if (dataResult.Resumes == false) {
          setResumes({})
        } else {
          setResumes(dataResult.Resumes)
        }

        if (dataResult.JobListings == false) {
          setJobListings({})
        } else {
          setJobListings(dataResult.JobListings)
        }
      }
    }

    const values = {
        accountInfo: accountInfo,
        personalInfo: personalInfo,
        resumeItems: data,
        resumes: resumes,
        jobListings: jobListings,
        setPersonalInfo: changePInfo,
        setAccountInfo: changeAInfo,
        setDataInfo: changeData,
        setResumes: setResumes,
        setJobListings: setJobListings,
        updateDatabase: updateDatabase,
        setUpContext: setUpContext
    }

    

    

    return (<userContext.Provider value={values}>{children}</userContext.Provider>)
}

export default UserContextProvider;