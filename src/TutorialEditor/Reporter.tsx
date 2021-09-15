import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import { Report } from './types';

export function Reporter({ hints, report, onHintChanged, preview }: { preview: boolean, hints: string[], report: Report, onHintChanged: (hint: string, index: number) => void }) {
  const { total, failures } = report;
  const successfulCount = total - failures.length;
  return (
    <Stack sx={{ width: '100%', maxHeight: '300px', overflow: 'scroll' }} spacing={2}>
      <>
        {
          successfulCount > 0 ?
            <Alert severity="success">
              <AlertTitle>{`${successfulCount} test${successfulCount > 1 ? 's' : ''} passed`}</AlertTitle>
            </Alert> :
            <></>
        }
      </>
      {
        failures.map(({ error, isKnown, index }) => (
          isKnown ?
            <Alert key={index} severity="warning">
              < AlertTitle > {`Test ${index + 1} failed`}</AlertTitle>
              {error.message} — <strong>{preview ? hints[index] : <Input value={hints[index]} onChange={e => onHintChanged(e.target.value, index)}/>}</strong>
            </Alert > :
            <Alert key={index} severity="error">
              <AlertTitle>{`${index + 1} Unexpected error`}</AlertTitle>
              {error.message} — <strong>that wasn't part of the plan!</strong>
            </Alert>
        ))
      }
    </Stack >
  );
}
