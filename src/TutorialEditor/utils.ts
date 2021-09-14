export function downloadSteps(obj: any) {
  const filename = 'steps.json';
  const jsonStr = JSON.stringify(obj, null, '  ');

  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}