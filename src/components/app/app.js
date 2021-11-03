import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import PlayersList from '../players-list/players-list';
import PlayersAddForm from '../players-add-form/players-add-forms';

import './app.css';


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [
                {name: "Zaripov Ruslan", salary: 800, increase: false, id: 1, rise: false},
                {name: "Fomin Evgeniy", salary: 2000, increase: true, id: 2, rise: true},
                {name: "Safin Ruslan", salary: 40000, increase: true, id: 3, rise: true},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4
    }


    deleteItem = (id) => {
        this.setState(({data}) => {
            //const index = data.findIndex(elem => elem.id === id)

            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = [...before, ...after];

            return { 
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }


    onToggleIncrease = (id) => {
        // this.setState (({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
            
        //     const old = data [index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0,index), newItem, ...data.slice(index + 1)];

        //     return {
        //         data: newArr
        //     }
        // })

        this.setState (({data}) => ({
            data: data.map (item => {
                if (item.id === id){
                    return {...item, increase: !item.increase}
                }
                return item;
            })

        }))

    }

    onToggleRise = (id) => {
        this.setState (({data}) => ({
            data: data.map (item => {
                if (item.id === id){
                    return {...item, rise: !item.rise}
                }
                return item;
            })

        }))
    }


    // onToggleProp = (id, prop) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, [prop]: !item[prop]}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    searchPl = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        
        return items.filter(item => {
            return item.name.indexOf(term)> -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default: 
                return items

    }
}


    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const players = this.state.data.length;
        const increased = this.state.data.filter (item => item.increase).length;
        const visibleData = this.filterPost(this.searchPl(data, term), filter);
        
        return (
            <div className="app">
                <AppInfo players = {players} increased = {increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter filter = {filter}
                    onFilterSelect = {this.onFilterSelect}/>
                </div>
                
                <PlayersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease = {this.onToggleIncrease}
                    onToggleRise = {this.onToggleRise}/>
                <PlayersAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;