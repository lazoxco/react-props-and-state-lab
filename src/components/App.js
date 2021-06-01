import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (breed) => {
    this.setState({
      filters: {type: breed}
    })
  }

  onFindPetsClick = () => {
    let endpoint = "/api/pets"
    // Filtered endpoint: "/api/pets?type=cat"
    if (this.state.filters.type !== 'all'){
      endpoint += `?type=${this.state.filters.type}`
    }

    fetch(endpoint)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pets: data
      })
    })
  }

  onAdoptPet = (petId) => {
    // TO DO
    // This callback should take in an id for a pet, find the mathcing state.pets and set the isAdopted prop to true
    const updatedPets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })

    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
