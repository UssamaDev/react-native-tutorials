import React, {createContext, useState, useContext} from "react"

const confirmContext = createContext()

const ConfirmProvider = ({children}) => {
    const [confirm, setConfirm] = useState(null)
    const [name, setName] = useState("")
    return<confirmContext.Provider value={{confirm, setConfirm, name, setName}}>
        {children}
    </confirmContext.Provider>
}

export const useConfirmContext = () => useContext(confirmContext)
export default ConfirmProvider
