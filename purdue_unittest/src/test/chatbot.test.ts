import { describe, test, expect, beforeEach } from 'vitest';
import { chatbot } from '../services/chatbotService';
import { generateKYCData, generateAMLData } from '../utils/generateData';

describe('Chatbot Functionality', () => {
  test('Should handle KYC onboarding successfully', async () => {
    const response = await chatbot.sendMessage('How do I onboard as a new customer?');
    expect(response.message).toContain('Provide your documents for verification.');
  });

  test('Should detect invalid identity documents', async () => {
    const result = await chatbot.processDocument('expired_passport.pdf');
    expect(result.error).toBe(true);
    expect(result.message).toContain('document has expired');
  });

  test('Should process valid documents correctly', async () => {
    const result = await chatbot.processDocument('valid_id.jpg');
    expect(result.error).toBe(false);
    expect(result.message).toContain('Document processed successfully');
  });

  test('Should detect suspicious AML transactions', async () => {
    const suspiciousTransaction = {
      amount: '250000',
      description: 'High-value wire transfer'
    };
    const result = await chatbot.checkTransaction(suspiciousTransaction);
    expect(result.error).toBe(true);
    expect(result.message).toContain('Alert: High-value transaction');
  });

  test('Should pass normal AML transactions', async () => {
    const normalTransaction = {
      amount: '500',
      description: 'Grocery store'
    };
    const result = await chatbot.checkTransaction(normalTransaction);
    expect(result.error).toBe(false);
    expect(result.message).toContain('Transaction verified');
  });

  test('Should handle synthetic KYC data', () => {
    const kycData = generateKYCData(5);
    expect(kycData).toHaveLength(5);
    kycData.forEach(data => {
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('idType');
      expect(data).toHaveProperty('accountNumber');
    });
  });

  test('Should handle synthetic AML data', () => {
    const amlData = generateAMLData(5);
    expect(amlData).toHaveLength(5);
    amlData.forEach(data => {
      expect(data).toHaveProperty('transactionId');
      expect(data).toHaveProperty('amount');
    });
  });
});
