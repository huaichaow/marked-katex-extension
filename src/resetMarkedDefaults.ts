import { marked } from 'marked';

const defaults = marked.defaults;

export function resetMarkedDefaults(): void {
  marked.setOptions(defaults);
}
