export const getFromLocalStorage = () =>
{
    const localStorageData = localStorage.getItem("CaughtPokemon");

    if ( localStorageData == null )
    {
        return [];
    }

    return JSON.parse(localStorageData);
}

export const removeFromLocalStorage = ( name: string ) =>
{
    const localStorageData = getFromLocalStorage();

    const nameIndex = localStorageData.indexOf(name);

    localStorageData.splice(nameIndex, 1);

    localStorage.setItem("CaughtPokemon", JSON.stringify(localStorageData));
}