interface IScreenProps {
    isOpen: boolean;
    exitScreen: (action: boolean) => void;
    zIndex?: string;
}

export const Screen = ({ isOpen, exitScreen, zIndex }: IScreenProps) => {
    return (
        <div onClick={() => {exitScreen(false)}} style={{zIndex: zIndex, backdropFilter: isOpen ? 'blur(1.5px) saturate(85%)' : ''}} className={`screen ${isOpen ? 'screen-active' : ''}`}>
        </div>
    )
}
