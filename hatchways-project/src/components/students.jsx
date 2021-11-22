

import _ from 'lodash';
import React from 'react';
import axios from 'axios';
const POKEAPI_POKEMON_URL = `https://pokeapi.co/api/v2/pokemon`;

const POKEAPI_TYPE_TO_COLOR = {
  bug: 'green-400',
  dark: 'gray-800',
  dragon: 'purple-800',
  electric: 'yellow-400',
  fairy: 'pink-400',
  fighting: 'red-900',
  fire: 'red-400',
  flying: 'indigo-600',
  ghost: 'indigo-700',
  grass: 'green-600',
  ground: 'yellow-700',
  ice: 'blue-400',
  normal: 'gray-500',
  poison: 'purple-600',
  psychic: 'pink-700',
  rock: 'yellow-600',
  steel: 'gray-400',
  water: 'blue-500',
}

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pokemonSearch: '' ,
          pokemonName: '',
          pokemonSpriteUrl: '',
          pokemonTypes: [],
          pokemonMoves: [],
        };
      }
    
      handleSubmit = (event) => {
        event.preventDefault()
        let newPokemon = event.target[0].value
        newPokemon ?         
        fetch(`${POKEAPI_POKEMON_URL}/${newPokemon.toLowerCase()}`).then( res => res.json()).then(pokemon => 
        this.setState({
            pokemonSearch: newPokemon,
            pokemonName: pokemon.name,
            pokemonSpriteUrl: pokemon.sprites.front_default,
            pokemonTypes: pokemon.types.map(type => type.type.name),
        })
        )
            :    
            fetch(`${POKEAPI_POKEMON_URL}/${Math.floor(Math.random() * 898) + 1}`).then( res => res.json()).then(pokemon => 
            this.setState({
                pokemonName: pokemon.name,
                pokemonSpriteUrl: pokemon.sprites.front_default,
                pokemonTypes: pokemon.types.map(type => type.type.name),
            })
     
        )

      }

      loadPokemonCard = async () => {
    
        const randomPokemonId = Math.floor(Math.random() * 898) + 1;

        const pokemon = (await axios.get(`${POKEAPI_POKEMON_URL}/${randomPokemonId}`)).data
    
        this.setState({
          pokemonName: pokemon.name,
          pokemonSpriteUrl: pokemon.sprites.front_default,
          pokemonTypes: pokemon.types.map(types => types.type.name),

        });
      }
    
      async componentDidMount() {
        this.state.pokemonSearch === '' ? await this.loadPokemonCard() : await this.handleSubmit();;
      }


    
      render() {
        return (
          <div className="flex flex-col justify-center">
            
            
               <form onSubmit={this.handleSubmit}>
        <input
            type="text"
            id="header-search"
            placeholder="Gotta Catch Them All!"
            name="s" 
        />   
                  {/* Randomize Button */}
                  <button type="submit" className="justify-center bg-blue-500 hover:bg-red-700 text-white p-2 border-black border-4 rounded-full m-2">
                    Who's That Pokemon?
                  </button>
                  </form>
                  {/* Pokemon Card */}
                  <div className="w-96 p-4 text-black border-black border-4 rounded-xl bg-gray-200">
    
                    {/* Pokemon Name */}
                    <div className="text-6xl font-bold p-1">
                      {this.state.pokemonName}
                    </div>
    
                    {/* Pokemon Image */}
                    <div className={"border-black border-2 m-1 rounded-xl bg-gradient-to-r from-" + POKEAPI_TYPE_TO_COLOR[this.state.pokemonTypes[0]] + " to-white"}>
                      <img src={this.state.pokemonSpriteUrl} className="mx-auto" alt=""/>
                    </div>
    
                    {/* Pokemon Typing */}
                    {
                      <div className="flex flex-row justify-center">
                        {
                          this.state.pokemonTypes.map((type, index) => {
                            return (
                              <div key={index} className={"border-black border-2 m-1 p-1 rounded-xl bg-" + POKEAPI_TYPE_TO_COLOR[type]}>
                                {type}
                              </div>
                            );
                          })
                        }
                      </div>
                    }
                  </div>
            
          </div>
        );
      }
    }

export {Pokemon}