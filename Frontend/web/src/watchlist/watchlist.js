import LeftNavigation from "../left_navigation/left_navigation";
import RightNavigation from "../right_navigation/right_navigation";
import TopNavigation from "../top_navigation/top_navigation";
import TopNavWatch from "./top_navbar";
import "./watchlist.css";
import WatchlistContent from "./watchlist_content";

function Watchlist(){
    return<section id='home'>
    <div id="left-navigation">
        <LeftNavigation id="left-nav"/>
    </div>
    <section id='main-sec'>
      <TopNavWatch/>
     <WatchlistContent/>
    </section>
    <RightNavigation/>
</section>
}

export default Watchlist;
