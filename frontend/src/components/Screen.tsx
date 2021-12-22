interface IScreenProps {
    isOpen: boolean;
    exitScreen: (action: boolean) => void;
    zIndex?: string;
}

export const Screen = ({ isOpen, exitScreen, zIndex }: IScreenProps) => {
    return (
        <div onClick={() => {exitScreen(false)}} style={{zIndex: zIndex}} className={`screen ${isOpen ? 'screen-active' : ''}`}>
        </div>
    )
}
