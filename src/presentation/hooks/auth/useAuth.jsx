import React, { useMemo, useState } from 'react'
import { useUserActions } from '../store/useUserActionsStore'
import { selectorApp } from '../store/storeHook'

const useAuth = () => {
    const user = selectorApp((state) => state.user)
    const [userStatus, setUserStatus] = useState(user)

    useMemo(() => {
        setUserStatus(user)
    }, [user])

    const clearUser = () => {
      setUserStatus({
        email: ''
      })
    }

    return {
        userStatus,
        clearUser
    }
}

export default useAuth