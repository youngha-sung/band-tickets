import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";
import BandForm from "./BandForm";

function App() {
  const bands = [skaBand, kpopBand, punkBand];
  const randomBand = bands[Math.floor(Math.random() * 3)]
 
  return (
    <div className="App">
      <BandForm band={randomBand} />
    </div>
  );
}

export default App;
