import { Tutorial } from './Tutorial';
import steps from './steps.json';

function App({page}: {page: number}) {
  const initialStep = page > 0 && page <= steps.length ? page - 1 : 0;
  return (
    <Tutorial steps={steps} initialStep={initialStep} />
  );
}

export default App;