export function toBodyStyleHidden(onOff: boolean) {
  const body = document.querySelector('body') as HTMLElement;

  if (onOff) {
    body.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.height = '100%';
  } else {
    body.removeAttribute('style');
  }
}
