Name: Charles Orr

Date Revised: 03/29/25

Challenge: Pokemon API Next Rebuild

Description: Create a single page pokemon application using the Pokemonapi and Next.JS / TypeScript

Reviewers Name: David Monterrosa

Peer Review: Overall the project looks good. I love the design of it. With minor tweaks it will be a great app to share on your portfolio! As you are aware there are a few responsiveness and fuctionality issues, which I will go over. One thing I noticed is that your text overflows and your background image ends abruptly on mobile and tablet views. The good news is that these are easy fixes :D. I recommend trying overflow-y-scroll for the text overflow issue. Most other projects I've looked at are using it, so it might be the ideal solution for you too! Next for the background, I tried messing with the background classes, but for whatever reason it didn't help. There might be an issue with the way you are using max-[1034px] as a breakpoint. I suggest using the default tailwind breakpoint values and a mix of background classes such as bg-cover, bg-fixed, bg-no-repeat, etc. Also be sure that you are setting your minimum height to min-h-screen. don't use h-[100vh] because it won't cover the screen properly when your content increases beyond the original viewport height. Finally it seems like you need a useEffect that changes your encounter area, eveolution chain, and other data whenever you get back new data. It seems like you are using some other variable change to determine when to change the evo chain and other information, which causes it to use info from the previous search to fill in that area.

Tl;dr
### Changes to make
- use **overflow-y-scroll** on divs that hold your text
- use the default tailwind breakpoints on your page.tsx file (i.e **sm:, md:, lg:**).
    - also try using **min-h-screen** instead of h-[100vh]
    - try using a combination of the background classes like **bg-cover, bg-center, and bg-fixed**
- use **useEffect** to have your content change whenever new pokedata comes back

### Compliments
- looks great! I really like the design!

Vercel: https://pokemon-api-next-rebuild.vercel.app
