import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Reporter } from './Reporter';
import { CodeEditor } from './CodeEditor';
import { Tester } from './Tester';
import { SideBar } from './SideBar';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const invalidReport = { total: 0, failures: [] };

export function Tutorial({ steps, initialStep }: { steps: any[], initialStep: number }) {
  if (initialStep > steps.length) {
    throw Error(`activeStep: ${initialStep} cannot be more than the length of steps`);
  }
  const [activeStep, setActiveStep] = useState(initialStep);
  const [codes, setCodes] = useState(steps.map(s => s.code));
  const [report, setReport] = useState(invalidReport);
  const tester = new Tester({ report: setReport });

  function activeStepChanged(activeStep: number) {
    setReport(invalidReport);
    setActiveStep(activeStep);
  }

  function test(activeStep: number) {
    if (activeStep >= codes.length) return;
    tester.run(codes[activeStep]);
  }

  function updateCodes(code: string, activeStep: number) {
    if (activeStep >= codes.length) return;
    const newCodes = [...codes];
    newCodes[activeStep] = code;
    setCodes(newCodes);
  }

  function reset(activeStep: number) {
    if (activeStep >= codes.length) return;
    setReport(invalidReport);
    const code = steps[activeStep].code;
    updateCodes(code, activeStep)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <SideBar steps={steps} activeStep={activeStep} activeStepChanged={activeStepChanged} />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            {
              activeStep === steps.length
                ? <div>🎉</div>
                : <CodeEditor code={codes[activeStep]} onCodeChanged={code => updateCodes(code, activeStep)} />
            }
          </Item>
          <Item>
            {
              report !== invalidReport
                ? <Reporter report={report} steps={steps} />
                : <></>
            }
          </Item>
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={1} margin={1}>
          <Button
            variant="contained"
            onClick={() => reset(activeStep)}
            sx={{ mt: 1, mr: 1 }}
          >
            reset
          </Button>
        </Grid>
        <Grid item xs={1} margin={1}>
          <Button
            variant="contained"
            onClick={() => test(activeStep)}
            sx={{ mt: 1, mr: 1 }}
          >
            test
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
}