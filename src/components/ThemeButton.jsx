import { ThemeConsumer } from "../contexts/ThemeContext";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Container from "../styles/navigation.module.scss";


function ThemeButton(){
    return(
        <ThemeConsumer>
            {({ theme, toggleTheme }) => {
                return <li className={Container.list-theme}><button onClick={toggleTheme} className={Container.btnDarkMode}>
                {
                    theme === 'light' 
                        ? <><DarkModeOutlinedIcon /><span>Dark Mode</span></>
                        : <><LightModeOutlinedIcon /><span>Light Mode</span></>
                }</button> 
                </li>;
            }}
        </ThemeConsumer>
    )
}

export default ThemeButton;

