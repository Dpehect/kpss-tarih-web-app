export function getAriaProgressLabel(label: string, value: number) {
  const normalized = Math.max(0, Math.min(100, Math.round(value)));
  return `${label}: yüzde ${normalized} tamamlandı`;
}

export function createKeyboardClickHandler(callback: () => void) {
  return (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };
}
