export interface ChatResponse {
  message: string;
  error?: boolean;
}

export class ChatbotService {
  async sendMessage(message: string): Promise<ChatResponse> {
    const lowercaseMsg = message.toLowerCase();

    if (lowercaseMsg.includes('onboard')) {
      return { message: 'Provide your documents for verification.' };
    }

    if (lowercaseMsg.includes('kyc')) {
      return { message: 'To complete KYC, please provide a valid ID and address proof.' };
    }

    if (lowercaseMsg.includes('aml')) {
      return { message: 'AML monitoring is active for all high-value transactions.' };
    }

    return { message: 'I can help with KYC and AML queries. How can I assist you today?' };
  }

  async processDocument(filename: string): Promise<ChatResponse> {
    if (filename.toLowerCase().includes('expired')) {
      return {
        message: 'The provided document has expired. Please provide a valid document.',
        error: true
      };
    }

    return {
      message: 'Document processed successfully. Your verification is in progress.',
      error: false
    };
  }

  async checkTransaction(transaction: any): Promise<ChatResponse> {
    const amount = parseFloat(transaction.amount);
    if (amount > 100000 || transaction.description.toLowerCase().includes('suspicious')) {
      return {
        message: `Alert: High-value transaction (${amount}) detected for AML review.`,
        error: true
      };
    }

    return {
      message: 'Transaction verified.',
      error: false
    };
  }
}

export const chatbot = new ChatbotService();
