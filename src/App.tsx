import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Tester } from './Tester';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    code: `
var globalA;
var globalB;
function scope(a, b) {
  var globalA = a;
  globalB = b;
}
scope('a', 'b');
expect(globalA).eq(undefined);
expect(globalB).eq('c');
    `
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
    code: `
console.log('test 2');
expect(2).eq(3);
    `
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    code: `
console.log('test 3');
expect(3).eq(2);
expect(3).eq(3);
    `
  },
];


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const initialCodes = steps.map(s => s.code);
function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [codes, setCodes] = useState(initialCodes);
  const tester = new Tester();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
          <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>


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
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
          <button onClick={() => test(activeStep)}>test</button>
        </Grid>
        <Grid item xs={1}>
          <button onClick={() => reset(activeStep)}>reset</button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;