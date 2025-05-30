import type { Conversation } from '@/types/conversation';
import { parse as parseChatGPT } from './chatgpt';
import { parse as parseGemini } from './gemini';
import { parse as parseClaude } from './claude';

/**
 * Main entry used by the API route.
 * @param html      Raw HTML from the extension
 * @param model     model name passed by the extension
 */
export async function parseHtmlToConversation(html: string, model: string): Promise<Conversation> {
  switch (model) {
    case 'chatgpt':
    case 'gpt':
      return parseChatGPT(html);

    case 'gemini':
    case 'bard':
      return parseGemini(html);

    case 'claude':
      return parseClaude(html);

    default:
      throw new Error(`Unsupported or unknown model: ${model}`);
  }
}
