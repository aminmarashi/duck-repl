import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import { Reporter } from './Reporter';
import { CodeEditor } from './CodeEditor';
import { Tester } from './Tester';
import { SideBar } from './SideBar';
import initialSteps from './steps.json';
import { downloadSteps } from './utils';
import { Database } from './Database';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const invalidReport = { total: 0, failures: [] };

const FixedHeightReporter = styled(Reporter)(({ theme }) => ({
  height: '25vh'
}));

export function TutorialEditor({ theme }: { theme: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(initialSteps);
  const [codes, setCodes] = useState(steps.map(s => s.code));
  const [report, setReport] = useState<{total: number, failures: any[]}>(invalidReport);
  const [preview, setPreview] = useState(false);
  const tester = new Tester({ report: setReport });

  useEffect(() => {
    Database.load('steps', setSteps);
    Database.load('codes', setCodes);
    document.addEventListener('keyup', (e) => {
      if (e.shiftKey && e.key === 'Enter') {
        test();
      }
    }, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Database.store('codes', codes);
  }, [codes])
  useEffect(() => {
    Database.store('steps', steps);
  }, [steps])

  function activeStepChanged(activeStep: number) {
    setReport(invalidReport);
    setActiveStep(activeStep);
  }

  function createStep() {
    setSteps(steps => [...steps, {
      ...initialSteps[0]
    }]);
    setCodes(codes => [...codes, initialSteps[0].code]);
    setActiveStep(steps.length);
  }

  function removeStep() {
    if (steps.length <= 1) return;
    setSteps(steps => steps.slice(0, -1));
    setCodes(codes => codes.slice(0, -1));
    setActiveStep(steps.length - 2);
  }

  function onTitleChange(title: string) {
    setSteps(steps => [
      ...steps.slice(0, activeStep),
      {
        ...steps[activeStep],
        title,
      },
      ...steps.slice(activeStep < steps.length - 1 ? activeStep + 1 : steps.length, steps.length),
    ]);
  }

  function onDescriptionChange(description: string) {
    setSteps(steps => [
      ...steps.slice(0, activeStep),
      {
        ...steps[activeStep],
        description,
      },
      ...steps.slice(activeStep < steps.length - 1 ? activeStep + 1 : steps.length, steps.length),
    ]);
  }

  function test(generateHints = false) : any {
    if (activeStep >= codes.length) return {};
    return tester.run(codes[activeStep], generateHints);
  }

  function updateCodes(code: string, activeStep: number) {
    if (activeStep >= codes.length) return;
    const newCodes = [...codes];
    newCodes[activeStep] = code;
    setCodes(newCodes);
  }

  function showHints() {
    const report = test(true);
    setSteps(steps => {
      const newSteps = [...steps];
      const hints = newSteps[activeStep].hints;
      newSteps[activeStep].hints = report.failures.map((_: any, index: number) => hints?.[index] || `hint #${index}`);
      return newSteps;
    });
    setReport(report);
  }

  function updateHints(hint: string, index: number) {
    setSteps(steps => {
      const newSteps = [...steps];
      newSteps[activeStep].hints = [...steps[activeStep].hints];
      newSteps[activeStep].hints[index] = hint;
      return newSteps;
    });
  }

  function exportSteps() {
    const stepsResult: any[] = [];
    steps.forEach((step, index) => {
      stepsResult.push({
        ...step,
        code: codes[index]
      });
    });
    downloadSteps(stepsResult);
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyItems: 'flex-start' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SideBar preview={preview} steps={steps} activeStep={activeStep} activeStepChanged={activeStepChanged} onTitleChange={onTitleChange} onDescriptionChange={onDescriptionChange} />
          <Box sx={{ mb: 2, display: 'flex' }}>
            <FormControlLabel sx={{ flexGrow: 2, m: 1 }} control={<Switch checked={preview} onChange={e => { setPreview(e.target.checked) }} />} label={preview ? 'preview' : 'edit'} />
            <ButtonGroup variant="outlined" sx={{ mt: 1, mr: 1, flexGrow: 1 }}>
              <Button onClick={removeStep}> - </Button>
              <Button onClick={createStep}> + </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {
            activeStep === steps.length
              ? <div>🎉</div>
              : <>
                <Box height={{ height: 'calc(75vh - 40px)' }}>
                  <CodeEditor theme={theme} code={codes[activeStep]} onCodeChanged={code => updateCodes(code, activeStep)} />
                </Box>
                <Grid container>
                  <Grid item xs={8} display="flex" justifyContent="flex-start">
                    <Button
                      startIcon={<PlayArrowIcon color="primary" />}
                      onClick={() => test(false)}
                    >
                      test
                    </Button>
                    <Typography sx={{ p: 1 }} display="block" variant="button">
                      or press <kbd>Shift</kbd> + <kbd>enter</kbd>
                    </Typography>
                    <Button
                      startIcon={<InfoIcon color="primary" />}
                      onClick={showHints}
                    >
                      show hints
                    </Button>
                  </Grid>
                  <Grid item xs={4} display="flex" justifyContent="flex-end">
                    <Button
                      startIcon={<SaveIcon color="primary" />}
                      onClick={exportSteps}
                    >
                      export
                    </Button>
                  </Grid>
                </Grid>
              </>
          }
          {
            report !== invalidReport
              ? <FixedHeightReporter preview={preview} report={report} hints={steps[activeStep].hints} onHintChanged={updateHints} />
              : <></>
          }
        </Grid>
      </Grid>
    </Box>
  );
}