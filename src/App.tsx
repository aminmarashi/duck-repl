import { Tutorial } from './Tutorial';
import steps from './steps.json';

function App() {
  return (
    <Tutorial steps={steps} initialStep={1} />
  );
}

export default App;