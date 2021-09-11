import { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Tester } from './Tester';
import { SideBar } from './SideBar';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function Tutorial({ steps, initialStep }: { steps: any[], initialStep: number }) {
  if (initialStep > steps.length) {
    throw Error(`activeStep: ${initialStep} cannot be more than the length of steps`);
  }
  const [activeStep, setActiveStep] = useState(initialStep);
  const [codes, setCodes] = useState(steps.map(s => s.code));
  const tester = new Tester();

  function test(activeStep: number) {
    tester.run(codes[activeStep]);
    tester.reset();
  }

  function updateCodes(code: string, activeStep: number) {
    const newCodes = [...codes];
    newCodes[activeStep] = code;
    setCodes(newCodes);
  }

  function reset(activeStep: number) {
    const code = steps[activeStep].code;
    updateCodes(code, activeStep)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <SideBar steps={steps} activeStep={activeStep} activeStepChanged={setActiveStep} />
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
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            onClick={() => reset(activeStep)}
            sx={{ mt: 1, mr: 1 }}
          >
            reset
          </Button>
        </Grid>
        <Grid item xs={1}>
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