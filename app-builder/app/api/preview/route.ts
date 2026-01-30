import { promises as fs } from 'fs';
import path from 'path';

// Helper function to read the HTML template file
async function getTemplate(theme: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'templates', `${theme}.html`);
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading template ${theme}:`, error);
    // Return a default error template or a simple message
    return '<html><body><h1>Template not found</h1></body></html>';
  }
}

// The main API route handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { theme, ...data } = body;

    let template = await getTemplate(theme);

    // Replace placeholders in the template with data from the form
    template = template.replace(/{{ G.NICK }}/g, data.groom.nick);
    template = template.replace(/{{ B.NICK }}/g, data.bride.nick);
    template = template.replace(/{{ G.FULL }}/g, data.groom.full);
    template = template.replace(/{{ B.FULL }}/g, data.bride.full);
    template = template.replace(/{{ G.PARENTS }}/g, data.groom.parents);
    template = template.replace(/{{ B.PARENTS }}/g, data.bride.parents);
    template = template.replace(/{{ G.IMG }}/g, data.groom.img);
    template = template.replace(/{{ B.IMG }}/g, data.bride.img);
    template = template.replace(/{{ C.IMG }}/g, data.cover.img);
    template = template.replace(/{{ E.DATE }}/g, data.event.date);
    template = template.replace(/{{ E.TIME }}/g, data.event.time);
    template = template.replace(/{{ E.LOC }}/g, data.event.loc);
    template = template.replace(/{{ E.MAP }}/g, data.event.map);
    template = template.replace(/{{ GIFT.BANK }}/g, data.gift.bank);
    template = template.replace(/{{ GIFT.NUM }}/g, data.gift.num);
    template = template.replace(/{{ GIFT.NAME }}/g, data.gift.name);

    return new Response(template, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error in preview API:', error);
    return new Response('<h1>Error generating preview</h1>', {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
