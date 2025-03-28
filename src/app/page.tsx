import FavoritesPage from "@/components/FavoritesPage";
import MainPage from "@/components/MainPage"

export default function Home()
{
  return (
    <>
      <div className="h-[100vh] bg-[url('/assets/snorlax.jpg')] bg-no-repeat bg-cover m-0 bg-center max-[1034px]:bg-[url('/assets/verticalBG.jpg')] max-[729px]:bg-auto">

        <MainPage />

        <FavoritesPage />

      </div>
    </>
  );
}
