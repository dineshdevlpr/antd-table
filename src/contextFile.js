import React, { useState } from 'react';

const ContextFile = React.createContext();

export default ContextFile;

export const ContextProvider = ({children})=>{

    const [apiData, setApiData]= useState([])

    return (<ContextFile.Provider value = {{ apiData, setApiData }}>
        {children}
    </ContextFile.Provider>)
}