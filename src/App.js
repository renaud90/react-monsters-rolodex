import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="searchBox"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ""
//     }
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((res) => res.json())
//       .then((users) => this.setState(() => {
//         return {
//           monsters: users
//         }
//       }));
//   }

//   onSearchChange = (e) => {
//     const filter = e.target.value.toLowerCase();
//     this.setState(() => {
//       return { searchField: filter }
//     })
//   }

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;


//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder="search monsters" className="searchBox" />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
