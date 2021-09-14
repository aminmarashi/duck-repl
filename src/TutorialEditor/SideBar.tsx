import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export function SideBar({ steps, activeStep, activeStepChanged, createStep, removeStep, onTitleChange, onDescriptionChange }: { steps: any[], activeStep: number, activeStepChanged: (activeStep: number) => any, createStep: () => void, removeStep: () => void, onTitleChange: (label: string) => void, onDescriptionChange: (description: string) => void }) {
  const handleNext = () => {
    activeStepChanged(activeStep + 1);
  };

  const handleBack = () => {
    activeStepChanged(activeStep - 1);
  };

  const handleReset = () => {
    activeStepChanged(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={`step_${index}_editor`}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              <Input disabled={activeStep !== index} value={step.title} onChange={e => onTitleChange(e.target.value)}/>
            </StepLabel>
            <StepContent>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                value={step.description}
                style={{ width: '75%' }}
                onChange={e => onDescriptionChange(e.target.value)}
              />
              <Box sx={{ mb: 2 }}>
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
      <Box sx={{ mb: 2 }}>
        <ButtonGroup variant="outlined" sx={{ mt: 1, mr: 1 }}>
          <Button onClick={removeStep}> - </Button>
          <Button onClick={createStep}> + </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}