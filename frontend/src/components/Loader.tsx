import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const Loader = () => {

    const isLoader = useSelector((state: RootState) => state.appStateModule.loaderState)

    return (
        <div className="loader-container" style={isLoader ? {opacity: '1', pointerEvents: 'visible'} : {}}>
            <div className="loader"></div>
        </div>
    )
}
