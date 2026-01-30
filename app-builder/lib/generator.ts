import { TEMPLATES_COLLECTION } from './templates-data';

export function generateHTML(formData: any, themeId: string): string | undefined {
  const template = TEMPLATES_COLLECTION[themeId];

  if (!template) {
    return undefined;
  }

  let generatedHtml = template;
  const placeholders = template.match(/\{\{(.*?)\}\}/g) || [];

  placeholders.forEach(placeholder => {
    const key = placeholder.replace(/\{\{|\}\}/g, '');
    const value = formData[key] || '';
    generatedHtml = generatedHtml.replaceAll(placeholder, value);
  });

  return generatedHtml;
}
