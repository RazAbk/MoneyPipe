import React, { useEffect, useState } from 'react'
import { IoIosWarning } from 'react-icons/io'

export const GetIcon = ({iconName, iconColor}:{iconName: string, iconColor: string}) => {
    
    const [icon, setIcon] = useState<any>(null)

    useEffect(() => {
        const getIconsLib = async () => {
            const iconLib = iconName.substr(0,2).toLowerCase()
            const iconsLib = await import(`react-icons/${iconLib}`)
            const icon = iconsLib[iconName]
            setIcon(icon)
        }
        getIconsLib()
    }, [])

    if(icon) return <div className="action-details-icon" style={{ backgroundColor: iconColor }}>{icon}</div>
    else return <IoIosWarning className="action-details-icon"/>
}
