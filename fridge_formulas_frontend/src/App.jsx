import "./App.css";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import Card from "./components/Card/Card";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <Card 
      cardTitle="Vegetarian"
      cardIcon="https://www.flaticon.com/free-icon/broccoli_5601254"
      />
    </>
  );
}

export default App;
