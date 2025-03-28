"use client"

import { Abilities, ChainData, LocationData, SpeciesData } from "@/interfaces/interfaces";
import { createContext, useContext, useState } from "react";

interface Context
{
    locationData: LocationData[];
    setLocationData: (locationData: LocationData[]) => void;

    speciesData: SpeciesData;
    setSpeciesData: (speciesData: SpeciesData) => void;
    
    evolutionData: ChainData;
    setEvolutionData: (evolutionData: ChainData) => void;

    pokemonAbilityList: string;
    setPokemonAbilityList: (pokemonAbilityList: string) => void;

    abilities: Abilities[];
    setAbilities: (abilities: Abilities[]) => void;

    dexNumber: string;
    setDexNumber: (dexNumber: string) => void;

    pokemonName: string;
    setPokemonName: (pokemonName: string) => void;

    pokemonType: string;
    setPokemonType: (pokemonType: string) => void;

    pokemonImage: string;
    setPokemonImage: (pokemonImage: string) => void;

    pokemonLocation: string;
    setPokemonLocation: (pokemonLocation: string) => void;

    evolutionLine: string;
    setEvolutionLine: (evolutionLine: string) => void;

    nextEvolution: string;
    setNextEvolution: (nextEvolution: string) => void;

    moveList: string;
    setMoveList: (moveList: string) => void;

    catchPokemonText: string;
    setCatchPokemonText: (catchPokemonText: string) => void;

    userInput: string;
    setUserInput: (userInput: string) => void;

    searchPlaceholder: string;
    setSearchPlaceholder: (searchPlaceholder: string) => void;

    hideFavorites: boolean;
    setHideFavorites: (hideFavorites: boolean) => void;

    hideMainPage: boolean;
    setHideMainPage: (hideMainPage: boolean) => void;

    caughtPokemon: string;
    setCaughtPokemon: (caughtPokemon: string) => void;
}

// Creating the context
const AppContext = createContext<Context>(
{
    locationData: [],
    setLocationData: () => [],

    speciesData: {species: { url: "" }, evolution_chain: { url: "" }},
    setSpeciesData: () => {},
    
    evolutionData: {chain: {species: {name: ""}, evolves_to: [{species: {name: ""}}]}},
    setEvolutionData: () => {},

    pokemonAbilityList: "",
    setPokemonAbilityList: () => "",

    abilities: [],
    setAbilities: () => [],

    dexNumber: "",
    setDexNumber: () => "",

    pokemonName: "",
    setPokemonName: () => "",

    pokemonType: "",
    setPokemonType: () => "",

    pokemonImage: "",
    setPokemonImage: () => "",

    pokemonLocation: "",
    setPokemonLocation: () => "",

    evolutionLine: "",
    setEvolutionLine: () => "",

    nextEvolution: "",
    setNextEvolution: () => "",

    moveList: "",
    setMoveList: () => "",

    catchPokemonText: "",
    setCatchPokemonText: () => "",

    userInput: "",
    setUserInput: () => "",

    searchPlaceholder: "",
    setSearchPlaceholder: () => "",

    hideFavorites: true,
    setHideFavorites: () => true,

    hideMainPage: false,
    setHideMainPage: () => false,

    caughtPokemon: "",
    setCaughtPokemon: () => "",
});


// Creating the wrapper
export function AppWrapper({children}: {children: React.ReactNode})
{
    const [locationData, setLocationData] = useState<LocationData[]>([]);
    const [speciesData, setSpeciesData] = useState<SpeciesData>({species: { url: "" }, evolution_chain: { url: "" }});
    const [evolutionData, setEvolutionData] = useState<ChainData>({chain: {species: {name: ""}, evolves_to: [{species: {name: ""}}]}});
    const [pokemonAbilityList, setPokemonAbilityList] = useState<string>("");
    const [abilities, setAbilities] = useState<Abilities[]>([]);
    const [dexNumber, setDexNumber] = useState<string>("Dex Number");
    const [pokemonName, setPokemonName] = useState<string>("Pokemon Name");
    const [pokemonType, setPokemonType] = useState<string>("Type");
    const [pokemonImage, setPokemonImage] = useState<string>("/assets/pokemonFavicon.png");
    const [pokemonLocation, setPokemonLocation] = useState<string>("Pokemon Location");
    const [evolutionLine, setEvolutionLine] = useState<string>("");
    const [nextEvolution, setNextEvolution] = useState<string>("N/A");
    const [moveList, setMoveList] = useState<string>("");
    const [catchPokemonText, setCatchPokemonText] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");
    const [searchPlaceholder, setSearchPlaceholder] = useState<string>("Locate a Pokemon");
    const [hideFavorites, setHideFavorites] = useState<boolean>(true);
    const [hideMainPage, setHideMainPage] = useState<boolean>(false);
    const [caughtPokemon, setCaughtPokemon] = useState<string>("");

    return (
        <AppContext.Provider value={ { locationData, setLocationData, speciesData, setSpeciesData, evolutionData, setEvolutionData, pokemonAbilityList, setPokemonAbilityList, abilities, setAbilities, dexNumber, setDexNumber, pokemonName, setPokemonName, pokemonType, setPokemonType, pokemonImage, setPokemonImage, pokemonLocation, setPokemonLocation, evolutionLine, setEvolutionLine, nextEvolution, setNextEvolution, moveList, setMoveList, catchPokemonText, setCatchPokemonText, userInput, setUserInput, searchPlaceholder, setSearchPlaceholder, hideFavorites, setHideFavorites, hideMainPage, setHideMainPage, caughtPokemon, setCaughtPokemon } }>{children}</AppContext.Provider>
    )
}


// Function to allow access to data
export function useAppContext()
{
    return useContext(AppContext);
}