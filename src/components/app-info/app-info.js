
import './app-info.css';

const AppInfo = ({increased, players}) => {
    return (
        <div className="app-info">
            <h1>Состав команды "Эверест"</h1>
            <h2>Общее число игроков:{players}</h2>
            <h2>ЗП получат: {increased}</h2>
        </div>
    )
}

export default AppInfo;