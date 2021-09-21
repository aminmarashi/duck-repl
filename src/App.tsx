import { Tutorial } from './Tutorial';
import { TutorialEditor } from './TutorialEditor';
import steps from './steps.json';

function App({page, isEditMode}: {page?: number, isEditMode: boolean}) {
  const initialStep = page === undefined ? undefined : page > 0 && page <= steps.length ? page - 1 : 0;
  return (
    isEditMode
      ? <TutorialEditor />
      : <Tutorial steps={steps} initialStep={initialStep} />
  );
}

export default App;