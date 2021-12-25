import React from 'react'
import { GoPrimitiveDot as MobileIdx } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const PaginationDots = () => {

    const blocksIdx = useSelector((state: RootState) => state.appStateModule.blocksIdx)
    const isPaginationDots = useSelector((state: RootState) => state.appStateModule.isPaginationDots)

    return (
        <div className="pagination-dots" style={{opacity: isPaginationDots ? '1' : '0'}}>
            <MobileIdx className={`${blocksIdx ? 'fade-dot' : ''}`} />
            <MobileIdx className={`${!blocksIdx ? 'fade-dot' : ''}`} />
        </div>
    )
}
