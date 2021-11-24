interface IScreenProps {
    isOpen: boolean;
    exitScreen: (action: boolean) => void;
}

export const Screen = ({ isOpen, exitScreen }: IScreenProps) => {

    const handleExit = () => {
        
    }

    return (
        <div onClick={() => {exitScreen(false)}} className={`screen ${isOpen ? 'screen-active' : ''}`}>
        </div>
    )
}
