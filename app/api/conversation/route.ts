import { NextRequest, NextResponse } from 'next/server';
import { parseHtmlToConversation } from '@/lib/parsers';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('htmlDoc');

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: '`htmlDoc` must be a file field' }, { status: 400 });
    }

    const html = await file.text();
    const model = formData.get('model')?.toString() ?? 'ChatGPT';

    // Delegate the heavy lifting to YOUR parser
    const conversation = await parseHtmlToConversation(html, model);

    // TODO: Persist somewhere (DB / object store) and build a permalink
    const permalink = `https://your-url.com/c/${crypto.randomUUID()}`;

    return NextResponse.json({ url: permalink }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal error, see logs' }, { status: 500 });
  }
}
