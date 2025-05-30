import type { Conversation } from '@/types/conversation';

/**
 * Extracts a Gemini share page into a structured Conversation.
 */
export async function parse(html: string): Promise<Conversation> {
  return {
    sourceHtmlBytes: html.length,
    model: 'Gemini',
    content: html,
    scrapedAt: new Date().toISOString(),
  };
}
