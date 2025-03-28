"use client"

import { useAppContext } from '@/context/context'
import React from 'react'

const FavoritesPage = () =>
{
    const {hideFavorites, caughtPokemon, setHideFavorites, setHideMainPage} = useAppContext();

    const caughtExit = () =>
    {
        setHideFavorites( true );
        setHideMainPage( false );
    }

  return (
    <>
        <div className={`flex flex-col justify-center items-center h-[100vh] text-white text-[20px] ${hideFavorites ? "hidden" : ""}`}>
          
          <div className="mb-[5px]">
            <div>
              <button onClick={caughtExit} className="hover:bg-white/15 hover:cursor-pointer bg-black/60 backdrop-blur-[3px] outline rounded-[5px] w-[300px] text-center p-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
                <p>Exit</p>
              </button>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-[3px] outline rounded-[5px] w-[300px] text-center p-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0)]">
            <div>
              <p>Caught Pokemon</p>
            </div>
            <div className="overflow-y-auto h-[450px] flex flex-col justify-around">
              <div>{caughtPokemon}</div>
            </div>
          </div>

        </div>
    </>
  )
}

export default FavoritesPage