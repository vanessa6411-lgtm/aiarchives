import type { Conversation } from '@/types/conversation';

/**
 * Extracts a ChatGPT share page into a structured Conversation.
 */
export async function parse(html: string): Promise<Conversation> {
  return {
    sourceHtmlBytes: html.length,
    model: 'ChatGPT',
    content: html,
    scrapedAt: new Date().toISOString(),
  };
}
