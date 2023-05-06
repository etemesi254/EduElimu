import logo from './logo.svg';
import './App.css';
import LeftNavigation from './left_navigation/left_navigation';
import TopNavigation from './top_navigation/top_navigation';
import RightNavigation from './right_navigation/right_navigation';
import HomeContent from './home_content/home_content';
import CarouselImage from './carousell/carousell';

function App() {
  return (
    <section id='home'>
        <LeftNavigation/>
        <section id='main-sec'>
          <TopNavigation/>
          <HomeContent/>
        </section>
        <RightNavigation/>
    </section>

   
  );
}

export default App;
