import { useDispatch, useSelector } from 'react-redux'
import { IAction, IDataObject, IFilterBy } from '../interfaces/dataInterfaces'
import { RootState } from '../store/store'
import { GetIcon } from './GetIcon'
import { FaRegEdit } from 'react-icons/fa'
import { VscTrash } from 'react-icons/vsc'
import { CgDuplicate } from 'react-icons/cg'
import { setLoader, setSelectedAction } from '../store/actions/app-state.action'
import { deleteAction, duplicateAction } from '../store/actions/user.action'
import { dateService } from '../services/date.service'
import { Loader } from './Loader'


interface IActionProps {
    action: IAction;
    setActionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ActionPreview = ({ action, setActionModalOpen }: IActionProps) => {

    const dispatch = useDispatch()
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const selectedAction: IAction | null = useSelector((state: RootState) => state.appStateModule.selectedAction)
    const filterBy: IFilterBy = useSelector((state: RootState) => state.appStateModule.filterBy)

    const findCategoryData = (category: string) => {
        if (rawData) {
            const currCat = rawData.categories.find(currCat => currCat.title === category)
            return currCat
        }
    }

    const onDelete = async (ev: React.MouseEvent<HTMLElement>) => {
        ev.stopPropagation()
        dispatch(setLoader(true))
        await dispatch(deleteAction(action._id, filterBy))
        dispatch(setLoader(false))
        dispatch(setSelectedAction(null))
    }
    
    const onEdit = (ev: React.MouseEvent<HTMLElement>) => {
        ev.stopPropagation()
        setActionModalOpen(true)
    }
    
    const onDuplicate = async (ev: React.MouseEvent<HTMLElement>) => {
        ev.stopPropagation()
        dispatch(setLoader(true))
        await dispatch(duplicateAction(action._id, filterBy))
        dispatch(setLoader(false))
        dispatch(setSelectedAction(null))
    }

    const handleActionClick = () => {
        if (!selectedAction) {
            dispatch(setSelectedAction(action))
        } else {
            if (selectedAction._id !== action._id) {
                dispatch(setSelectedAction(action))
            } else {
                dispatch(setSelectedAction(null))
            }
        }
    }

    const categoryData = findCategoryData(action.category)

    if (!categoryData) return <Loader />
    return (
        <div className={`action-preview ${selectedAction?._id === action._id ? 'selected-action' : ''}`} onClick={handleActionClick}>
            <div className="left-side ">
                <div className="action-details-icon" style={{ backgroundColor: categoryData.bgColor }}>
                    <GetIcon iconName={categoryData.icon} />
                </div>
                <div className="action-data ">
                    <p className="action-date ">{dateService.getRelativeDate(action?.createdAt)}</p>
                    <h3>{action.description}</h3>
                    <p className="action-labels ">{action?.labels?.length ? action?.labels.map(label => {
                        return <span key={`label-${action?.createdAt}-${label}`}>{label}</span>
                    }) : <span></span> }</p>
                </div>
            </div>
            <div className="right-side ">
                <h3>{(+(action?.amount?.toString()))?.toLocaleString()}{rawData?.currency.sign}</h3>
            </div>
            <div className="action-preview-actions " style={{ transform: selectedAction?._id === action._id ? 'translateX(0%)' : 'translateX(100%)' }}>
                <button onClick={onDuplicate}><CgDuplicate /></button>
                <button onClick={onEdit}><FaRegEdit /></button>
                <button onClick={onDelete}><VscTrash /></button>
            </div>
        </div>
    )
}
