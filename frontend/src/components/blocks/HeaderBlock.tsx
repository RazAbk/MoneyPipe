import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { BiSearchAlt } from 'react-icons/bi'
import { dateService } from '../../services/date.service'

interface IHeaderProps {
    setSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderBlock = ({setSearchModalOpen}: IHeaderProps) => {

    const currentViewMode = useSelector((state: RootState) => state.appStateModule.currentViewMode)
    const currentLabels: string[] = useSelector((state: RootState) => state.appStateModule.currentLabels)
    const filterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const startDateString = dateService.getDateAsString(filterBy.startDate)
    const endDateString = dateService.getDateAsString(filterBy.endDate)

    return (
        <div className="header-block">
            <div className="header-block-content">
                {!!currentLabels?.length && <h2><span className="labels">{currentLabels.map((label: string) => <span key={label} className="label">{label}</span>)}</span><p>-</p><span className="dates">{startDateString} - {endDateString}</span></h2>}
                {(!currentLabels?.length && currentViewMode) && <h2>{currentViewMode === 'Summery' ? 'Summary' : 'Graph'}<p>-</p><span>{startDateString} - {endDateString}</span></h2>}
                <p>{currentViewMode === 'Summery' ? 'Summary' : 'Graph'} of incomes and expenses</p>
            </div>
            <div className="filter-btn">
                <BiSearchAlt onClick={() => {setSearchModalOpen(true)}}/>
            </div>
        </div>
    )
}
