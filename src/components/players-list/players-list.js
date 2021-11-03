import  PlayersListItem from '../players-list-item/players-list-item';

import './players-list.css';

const PlayersList = ({data, onDelete, onToggleIncrease, onToggleRise}) =>{

    const elements = data.map(item => {
        const {id, ...itemProps} = item; 
        return (
            <PlayersListItem 
            key ={item.id} 
            name = {item.name} 
            salary ={item.salary} 
            increase = {item.increase}
            rise = {item.rise} 
            onDelete = {() => onDelete(id)}
            onToggleIncrease = {() => onToggleIncrease(id)}
            onToggleRise = {() => onToggleRise(id)}/>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PlayersList;