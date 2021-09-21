import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Typography from '@mui/material/Typography';
import { Reporter } from './Reporter';
import { CodeEditor } from './CodeEditor';
import { Tester } from './Tester';
import { SideBar } from './SideBar';

const invalidReport = { total: 0, failures: [] };

const FixedHeightReporter = styled(Reporter)(({ theme }) => ({
  height: '25vh'
}));

export function Tutorial({ steps, initialStep }: { steps: any[], initialStep: number | undefined }) {
  const isMinimal = initialStep !== undefined;
  initialStep = initialStep || 0;
  if (initialStep > steps.length) {
    throw Error(`activeStep: ${initialStep} cannot be more than the length of steps`);
  }
  const [activeStep, setActiveStep] = useState(initialStep);
  const [codes, setCodes] = useState(steps.map(s => s.code));
  const [report, setReport] = useState(invalidReport);
  const tester = new Tester({ report: setReport });

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.shiftKey && e.key === 'Enter') {
        test();
      }
    }, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function activeStepChanged(activeStep: number) {
    setReport(invalidReport);
    setActiveStep(activeStep);
  }

  function test() {
    if (activeStep >= codes.length) return;
    tester.run(codes[activeStep]);
  }

  function updateCodes(code: string, activeStep: number) {
    if (activeStep >= codes.length) return;
    const newCodes = [...codes];
    newCodes[activeStep] = code;
    setCodes(newCodes);
  }

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'wrap-reverse' }}>
      {
        !isMinimal && <Grid item md={4}>
          <SideBar steps={steps} activeStep={activeStep} activeStepChanged={activeStepChanged} />
        </Grid>
      }
      <Grid item md={isMinimal ? 12 : 8}>
        {
          activeStep === steps.length
            ? <div>🎉</div>
            : <>
              <Box height={{ height: 'calc(75vh - 40px)' }}>
                <CodeEditor code={codes[activeStep]} onCodeChanged={code => updateCodes(code, activeStep)} />
              </Box>
              <Grid container>
                <Grid item xs={8} display="flex" justifyContent="flex-start">
                  <Button
                    startIcon={<PlayArrowIcon color="primary" />}
                    onClick={test}
                  >
                    test
                  </Button>
                  <Typography sx={{ p: 1 }} display="block" variant="button">
                    or press <kbd>Shift</kbd> + <kbd>enter</kbd>
                  </Typography>
                </Grid>
              </Grid>
            </>
        }
        {
          report !== invalidReport
            ? <FixedHeightReporter report={report} hints={steps[activeStep].hints} />
            : <></>
        }
      </Grid>
    </Grid>
  );
}