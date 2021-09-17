import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Typography from '@mui/material/Typography';
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
      debugger;
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

  function reset() {
    if (activeStep >= codes.length) return;
    setReport(invalidReport);
    const code = steps[activeStep].code;
    updateCodes(code, activeStep)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {
          !isMinimal && <Grid item xs={4}>
            <Item>
              <SideBar steps={steps} activeStep={activeStep} activeStepChanged={activeStepChanged} />
            </Item>
          </Grid>
        }
        <Grid item xs={isMinimal ? 12 : 8}>
          <Item>
            {
              activeStep === steps.length
                ? <div>🎉</div>
                : <>
                  <CodeEditor code={codes[activeStep]} onCodeChanged={code => updateCodes(code, activeStep)} />
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
                    <Grid item xs={4} display="flex" justifyContent="flex-end">
                      <Button
                        startIcon={<BackspaceIcon color="primary" />}
                        onClick={reset}
                      >
                        reset changes
                      </Button>
                    </Grid>
                  </Grid>
                </>
            }
          </Item>
          <Item>
            {
              report !== invalidReport
                ? <Reporter report={report} hints={steps[activeStep].hints} />
                : <></>
            }
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}