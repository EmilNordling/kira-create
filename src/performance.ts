import { performance } from 'perf_hooks';

function perf(name: string, fn: Function) {
  mark(`before ${name}`);
  const start = performance.now();
  fn();
  console.log(name + ' took', performance.now() - start);
  mark(`after ${name}`);
}

const timeStampDictionary = new Map<string, number>();

function mark(tag: string) {
  timeStampDictionary.set(tag, Date.now());
}

function getEntries() {
  return timeStampDictionary.entries();
}

export {
  mark,
  perf,
};
