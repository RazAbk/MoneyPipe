import { useDispatch, useSelector } from 'react-redux'
import { IAction, IDataObject } from '../interfaces/dataInterfaces'
import { utilService } from '../services/util.service'
import { RootState } from '../store/store'
import { GetIcon } from './GetIcon'
import { FaRegEdit } from 'react-icons/fa'
import { VscTrash } from 'react-icons/vsc'
import { setSelectedAction } from '../store/actions/app-state.action'
import { deleteAction } from '../store/actions/user.action'


interface IActionProps {
    action: IAction;
    setActionAddEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ActionPreview = ({ action, setActionAddEditModalOpen }: IActionProps) => {

    const dispatch = useDispatch()
    const rawData: IDataObject = useSelector((state: RootState) => state.userModule.data)
    const selectedAction: IAction | null = useSelector((state: RootState) => state.appStateModule.selectedAction)

    const findCategoryData = (category: string) => {
        if (rawData) {
            const currCat = rawData.categories.find(currCat => currCat.title === category)
            return currCat
        }
    }

    const onDelete = () => {
        dispatch(deleteAction(action._id))
    }

    const onEdit = () => {
        setActionAddEditModalOpen(true)
    }

    const handleActionClick = (ev: any) => {
        if(!selectedAction){
            dispatch(setSelectedAction(action))
        } else {
            if(selectedAction._id !== action._id){
                dispatch(setSelectedAction(action))
            } else if(ev.target.classList.contains('exit-click') || ev.target.nodeName === 'path' || ev.target.nodeName === 'svg'){
                dispatch(setSelectedAction(null))
            }
        }
    }

    const categoryData = findCategoryData(action.category)

    if (!categoryData) return <h1>Loading</h1>
    return (
        <div className="action-preview exit-click" onClick={handleActionClick}>
            <div className="left-side exit-click">
                <div className="action-details-icon exit-click" style={{ backgroundColor: categoryData.bgColor }}>
                    <GetIcon iconName={categoryData.icon} />
                </div>
                <div className="action-data exit-click">
                    <p className="action-date exit-click">{utilService.getRelativeDate(action.createdAt)}</p>
                    <h3 className="exit-click">{action.description}</h3>
                    <p className="action-labels exit-click">{action.labels.map(label => <span key={`label-${action.createdAt}-${label}`} className="exit-click">{label}</span>)}</p>
                </div>
            </div>
            <div className="right-side exit-click">
                <h3>{action.amount.toLocaleString()}{rawData.currencySign}</h3>
            </div>
            <div className="action-preview-actions" style={{ transform: selectedAction?._id === action._id ? 'translateX(0%)' : 'translateX(100%)' }}>
                <button onClick={onEdit}><FaRegEdit /></button>
                <button onClick={onDelete}><VscTrash /></button>
            </div>
        </div>
    )
}
