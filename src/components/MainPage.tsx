"use client"

import { useAppContext } from '@/context/context'
import { evoChain, getData, moves } from '@/interfaces/interfaces'
import { getFromLocalStorage, removeFromLocalStorage } from '@/services/services'
import Image from 'next/image'
import React, { useEffect } from 'react'

const MainPage = () =>
{
    const {pokemonName, setPokemonName, evolutionLine, pokemonAbilityList, dexNumber, pokemonType, pokemonImage, pokemonLocation, nextEvolution, moveList, hideMainPage, setLocationData, setSpeciesData, speciesData, setEvolutionData, setAbilities, abilities, setPokemonAbilityList, setDexNumber, setPokemonType, setPokemonImage, locationData, setPokemonLocation, evolutionData, setEvolutionLine, setNextEvolution, setMoveList, setCatchPokemonText, setUserInput, setSearchPlaceholder, setHideFavorites, setHideMainPage, setCaughtPokemon} = useAppContext();

    const pokeData = async (data: getData) =>
    {
        const location = await fetch( data.location_area_encounters );
        setLocationData( await location.json() );
    
        const species = await fetch( data.species.url );
        setSpeciesData( await species.json() );
    
        const evolutionChain = await fetch( speciesData!.evolution_chain.url );
        setEvolutionData( await evolutionChain.json() );
    
        const pokemonAbilityListArr: string[] = [];
        setAbilities( data.abilities );
        abilities!.forEach( ability =>
        {
            const abilityDash = ability.ability.name.indexOf("-") + 1;
    
            if ( ability.ability.name.includes("-") )
            {
                pokemonAbilityListArr.push( ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1, abilityDash) + ability.ability.name[abilityDash].toUpperCase() + ability.ability.name.slice(abilityDash + 1) );
            }else
            {
                pokemonAbilityListArr.push( pokemonAbilityList + ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1) );
            }
        });
        setPokemonAbilityList("");
        setPokemonAbilityList( pokemonAbilityListArr.join(", ") );
    
        setDexNumber( `#${data.id}` );
        setPokemonName( data.name[0].toUpperCase() + data.name.slice(1) );
        setPokemonType( data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1) );
        setPokemonImage( data.sprites.front_default );
        if ( locationData!.length !== 0 )
        {
            setPokemonLocation( locationData![0].location_area.name[0].toUpperCase() + locationData![0].location_area.name.slice(1) );
        }else
        {
            setPokemonLocation( "Unknown" );
        }
    
        const evoDataBase = evolutionData.chain.species.name;
        console.log(evoDataBase);
        const evoDataChain: evoChain[] = evolutionData.chain.evolves_to;
    
        const evoList: string[] = [];
        if ( evoDataChain.length > 0 )
        {
            const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${evoDataBase}` );
            const data = await response.json();
    
            if ( data.id <= 649 )
            {
                evoList.push( evoDataBase[0].toUpperCase() + evoDataBase.slice(1) );
                for ( let i = 0; i < evoDataChain.length; i++ )
                {
                    const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${evoDataChain[i].species.name}` );
                    const data = await response.json();
                    if ( data.id <= 649 )
                    {
                        evoList.push( evoDataChain[i].species.name[0].toUpperCase() + evoDataChain[i].species.name.slice(1) );
    
                        if ( evoDataChain[i].evolves_to!.length > 0 )
                        {
                            for ( let j = 0; j < evoDataChain[i].evolves_to!.length; j++ )
                            {
                                const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${evoDataChain[i].evolves_to![j].species.name}` );
                                const data = await response.json();
                                if ( data.id <= 649 )
                                {
                                    evoList.push( evoDataChain[i].evolves_to![j].species.name[0].toUpperCase() + evoDataChain[i].evolves_to![j].species.name.slice(1) );
                                }
                            }
                        }
                    }
                }
            }
            setEvolutionLine("");
            setEvolutionLine( evoList.join(", ") );
        }else
        {
            setEvolutionLine("N/A");
            setNextEvolution("N/A");
        }
    
        if ( evoDataBase === "eevee" )
        {
            const rng = Math.floor( Math.random() * (evoList.length - 1) ) + 1;
            setNextEvolution( evoList[evoList.indexOf( pokemonName ) + rng ] );
        }else if ( evoList.includes( pokemonName ) )
        {
            console.log(evoList);
            setNextEvolution( evoList[evoList.indexOf( pokemonName ) + 1] );
        }
    
        if ( nextEvolution === "undefined" )
        {
            setNextEvolution("N/A");
        }else if ( evoList[0] === "Eevee" && pokemonName !== "Eevee" )
        {
            setNextEvolution("N/A");
        }
    
        const pokemonMoveList: string[] = [];
        const moves: moves[] = data.moves;
        moves.forEach( move =>
        {
            const moveDash = move.move.name.indexOf("-") + 1;
    
            if ( move.move.name.includes("-") )
            {
                pokemonMoveList.push( move.move.name[0].toUpperCase() + move.move.name.slice(1, moveDash) + move.move.name[moveDash].toUpperCase() + move.move.name.slice(moveDash + 1) );
            }else
            {
                pokemonMoveList.push( move.move.name[0].toUpperCase() + move.move.name.slice(1) );
            }
        });
        setMoveList( pokemonMoveList.join(", ") );
    
        const name = pokemonName![0].toUpperCase() + pokemonName!.slice(1);
        const pokemonStored = getFromLocalStorage();
        if ( pokemonStored.includes( name ) )
        {
            setCatchPokemonText("Caught!");
        }else
        {
            setCatchPokemonText("Catch!");
        }
    }

    const getPokemon = async () =>
    {
        const response = await fetch( "https://pokeapi.co/api/v2/pokemon/Bulbasaur" );
        const data = await response.json();
        pokeData( data );
    }

    const pokemonRandom = async () =>
    {
        const rng = Math.floor( Math.random() * 649 ) + 1;
        const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${rng}` );
        const data = await response.json();
        pokeData( data );
    }

    const pokemonSearch = async ( pokemonName: string ) =>
    {
        try
        {
            const userInput = pokemonName;
            const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${userInput}` );
            const data = await response.json();
            if ( data.id <= 649 )
            {
                pokeData( data );
                setUserInput("");
                setSearchPlaceholder("Locate a Pokemon");
            }else
            {
                setUserInput("");
                setSearchPlaceholder("Pokemon Unavailable");
            }
        }catch (error)
        {
            setUserInput("");
            setSearchPlaceholder("Pokemon Unavailable");
            console.log(error);
        }
    }

    const pokemonEvolution = async ( nextEvolution: string ) =>
    {
        const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${nextEvolution}` );
        const data = await response.json();
        pokeData( data );
    }

    const pokemonShiny = async () =>
    {
        const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${pokemonName}` );
        const data = await response.json();
        setPokemonImage( data.sprites.front_shiny );
    }

    const pokemonNormal = async () =>
    {
        const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${pokemonName}` );
        const data = await response.json();
        setPokemonImage( data.sprites.front_default );
    }

    const catchPokemon = () =>
    {
        const name = pokemonName![0].toUpperCase() + pokemonName!.slice(1);
        const pokemonStored = getFromLocalStorage();
        if ( !pokemonStored.includes( name ) )
        {
            pokemonStored.push( name );
        }
        localStorage.setItem( "CaughtPokemon", JSON.stringify(pokemonStored) );
        
        setCatchPokemonText("Caught!");
    }

    const pokemonCaught = () =>
    {
        setHideMainPage(true);
        setHideFavorites(false);
        setCaughtPokemon("");
        const pokemonStored: [] = getFromLocalStorage();
        
        pokemonStored.map( pokemon =>
        {
            const favDiv = document.createElement("div");
                
            const searchPokemonButton = document.createElement("button");
            searchPokemonButton.className = "hover:bg-white/15 hover:cursor-pointer bg-black/60 outline rounded-[5px] w-[200px] text-center p-[10px] m-[5px]";
            searchPokemonButton.innerText = pokemon;
        
            const releaseButton = document.createElement("button");
            releaseButton.className = "hover:bg-white/15 hover:cursor-pointer bg-red-400/60 outline rounded-[5px] h-[35px] w-[200px] text-center mb-[10px]";
            releaseButton.innerText = "Release";
        
            searchPokemonButton.addEventListener( "click", async () =>
            {
                setHideFavorites(true);
                setHideMainPage(false);
                const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${pokemon}` );
                const data = await response.json();
                pokeData( data );
            });
        
            releaseButton.addEventListener( "click", () =>
            {
                removeFromLocalStorage( pokemon );
                favDiv.remove();
        
                if ( pokemonName === pokemon )
                {
                    setCatchPokemonText("Catch!");
                }
        
                favDiv.appendChild(searchPokemonButton);
                favDiv.appendChild(releaseButton);
                document.getElementById("caughtPokemon")!.appendChild(favDiv);
            });
        });
    }

    useEffect(() =>
    {
        getPokemon();
    },[])

  return (
    <>
        <div className={`flex flex-col justify-around h-[100vh] ${hideMainPage ? "hidden" : ""}`}>
          
          <div>
            <div className="text-white flex justify-center gap-[20px] pt-[20px] max-[1034px]:pb-[3%] max-[729px]:grid max-[729px]:gap-[10px] max-[729px]:pb-0">

              <div className="bg-black/60 backdrop-blur-[3px] outline w-[200px] text-[20px] text-center rounded-[5px] hover:bg-white/15 max-[729px]:w-[300px] shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
                <button onClick={pokemonRandom} className="hover:cursor-pointer">
                  <p>Random Encounter</p>
                </button>
              </div>

              <div className="bg-black/60 backdrop-blur-[3px] outline w-[250px] text-[20px] text-center rounded-[5px] max-[729px]:w-[300px] shadow-[0px_0px_20px_0px_rgba(0,0,0)] flex">
                <button onClick={async () => await pokemonSearch(pokemonName)} className="pl-[3px] w-[100%] h-[100%] flex items-center cursor-pointer">
                  <Image width={26} height={26} src="/assets/search.png" alt="search button" />
                </button>
                <input onChange={(event) => setPokemonName(event.target.value)} type="text" placeholder="Locate a Pokemon" className="w-[220px] rounded-[5px] pl-[10px]"/>
              </div>

              <div className="bg-black/60 backdrop-blur-[3px] outline w-[200px] text-[20px] text-center rounded-[5px] hover:bg-white/15 max-[729px]:mb-[5%] max-[729px]:w-[300px] shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
                <button onClick={pokemonCaught} className="hover:cursor-pointer">
                  <p>Caught Pokemon</p>
                </button>
              </div>

            </div>
          </div>

          <div>
            <div className="text-white flex justify-center gap-[50px] text-[20px] h-auto max-[1034px]:grid max-[1034px]:gap-[15px]">
              
              <div className="text-[20px] text-center w-[300px] max-[1034px]:w-auto max-[1034px]:col-span-2 max-[729px]:col-span-1">
                <div className="max-[1034px]:grid max-[1034px]:gap-[15px]">
                  <div className="outline rounded-[5px] bg-black/60 backdrop-blur-[3px] h-[150px] flex flex-col justify-center mb-[5%] max-[1034px]:w-[300px] max-[729px]:mb-0 shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
                    <p className="pb-[20px]">Evolition Line</p>
                    <div>
                      <p>{evolutionLine}</p>
                    </div>
                  </div>
                  <div className="outline rounded-[5px] bg-black/60 backdrop-blur-[3px] h-[150px] flex flex-col justify-center max-[1034px]:col-start-2 max-[1034px]:w-[300px] max-[729px]:col-start-1 max-[729px]:mb-[5%] shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
                    <p className="pb-[20px]">Possible Abilities</p>
                    <div className="flex justify-center">
                      <p>{pokemonAbilityList}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-[3px] outline text-[20px] text-center rounded-[5px] w-[300px] pt-[20px] max-[1034px]:col-start-1 max-[1034px]:row-start-1 shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
                <div>
                  <p>{dexNumber}</p>
                </div>
                <div className="flex justify-around pb-[10px]">
                  <div>
                    <p>{pokemonName}</p>
                  </div>
                  <div>
                    <p>{pokemonType}</p>
                  </div>
                </div>
                <div className="bg-black/60 flex justify-center outline rounded-[100%] m-[10px]">
                  <Image width={300} height={280} src={pokemonImage} alt="image of pokemon"/>
                </div>
                <div className="flex justify-around pt-[10px] pb-[10px]">
                  <div>
                    <button onClick={pokemonNormal} className="bg-black/60 outline w-[100px] text-center rounded-[5px] hover:bg-white/15 hover:cursor-pointer">
                      <p>Normal</p>
                    </button>
                  </div>
                  <div>
                    <button onClick={pokemonShiny} className="bg-black/60 outline w-[100px] text-center rounded-[5px] hover:bg-white/15 hover:cursor-pointer">
                      <p>Shiny</p>
                    </button>
                  </div>
                </div>
                <div>
                  <p>{pokemonLocation}</p>
                </div>
                <div className="pb-[20px]">
                  <p>Evolves Into <button onClick={async () => await pokemonEvolution(nextEvolution)} className="hover:cursor-pointer text-yellow-300 hover:text-blue-300 ">{nextEvolution}</button></p>
                </div>
                <div className="pb-[20px]">
                  <button onClick={catchPokemon} className="bg-black/60 outline w-[140px] text-center rounded-[5px] hover:bg-white/15 hover:cursor-pointer">
                    <p>Catch!</p>
                  </button>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-[3px] outline text-[20px] text-center rounded-[5px] w-[300px] max-[1034px]:col-start-2 max-[1034px]:row-start-1 max-[729px]:col-start-1 max-[729px]:row-start-2 shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
                <div>
                  <p className="pb-[20px] pt-[10px]">Possible Moves</p>
                  <div className="overflow-y-auto h-[490px] max-[729px]:h-[245px]">
                    <p className="ml-[20px] mr-[20px] pb-[20px]">{moveList}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
    </>
  )
}

export default MainPage