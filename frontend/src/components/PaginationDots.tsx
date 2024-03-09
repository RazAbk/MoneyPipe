import React, { useState } from 'react'
import { GoPrimitiveDot as MobileIdx } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const PaginationDots = () => {

    const blocksIdx = useSelector((state: RootState) => state.appStateModule.blocksIdx)
    const isPaginationDots = useSelector((state: RootState) => state.appStateModule.isPaginationDots)

    const [pages] = useState<number[]>([0, 1, 2])

    return (
        <div className="pagination-dots" style={{ opacity: isPaginationDots ? '1' : '0' }}>
            {pages.map((page: number, idx: number) => {
                return (
                    <MobileIdx className={`${(idx !== blocksIdx) ? 'fade-dot' : ''}`} />
                )
            })}
        </div>
    )
}
