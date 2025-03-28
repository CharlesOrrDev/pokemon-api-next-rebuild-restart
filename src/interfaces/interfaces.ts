// data.location_area_encounters[0].location_area.name

export interface LocationData
{
    location_area_encounters: {
        location_area: {
            name: string
        }
    }[],
    location_area: {
        name: string
    }
}

// data.species.url

export interface SpeciesData
{
    species: {
        url: string
    },
    evolution_chain: {
        url: string
    }
}

// data.evolution_chain.url

export interface EvolutionData
{
    evolution_chain: {
        url: string
    }
}

// data.chain.species.name
// data.chain.evolves_to[0].species.name

export interface ChainData
{
    chain: {
        species: {
            name: string
        },
        evolves_to: {
            species: {
                name: string
            }
        }[]
    }
}

export interface Abilities
{
    abilities: {
        ability: {
            name: string
        }
    }[],
    ability: {
        name: string
    }
}

export interface getData
{
    location_area_encounters: string,

    species: {
        url: string
    },

    abilities: [],

    id: string,

    name: string,

    types: {
        type: {
            name: string
        }
    }[],

    sprites: {
        front_default: string
    },

    moves: moves[]
}

export interface moves
{
    move: {
        name: string
    }
}

export interface evoChain
{
    species: {
        name: string
    },

    evolves_to?: {
        species: {
            name: string
        }
    }[]
}