import logo from './logo.svg';
import './App.css';
import LeftNavigation from './left_navigation/left_navigation';
import TopNavigation from './top_navigation/top_navigation';

function App() {
  return (
    <section id='home'>
        <LeftNavigation/>
        <TopNavigation/>
    </section>
   
  );
}

export default App;
