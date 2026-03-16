import { faker } from '@faker-js/faker';

export const generateKYCData = (count = 5) => {
  const customerData = [];
  for (let i = 0; i < count; i++) {
    customerData.push({
      id: i + 1,
      name: faker.person.fullName(),
      dateOfBirth: faker.date.between({ from: '1950-01-01', to: '2005-12-31' }).toISOString().split('T')[0],
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
      idType: faker.helpers.arrayElement(['Passport', 'ID Card', 'Driving License']),
      accountNumber: faker.finance.creditCardNumber()
    });
  }
  return customerData;
};

export const generateAMLData = (count = 5) => {
  const amlData = [];
  for (let i = 0; i < count; i++) {
    amlData.push({
      transactionId: 'AML-' + faker.string.alphanumeric(6).toUpperCase(),
      customerId: faker.number.int({ min: 10000, max: 99999 }),
      amount: faker.finance.amount({ min: 10000, max: 500000 }),
      transactionDate: faker.date.recent().toISOString(),
      description: faker.helpers.arrayElement([
        'High-value wire transfer to unknown beneficiary',
        'Multiple small transactions from different IP addresses',
        'International transfer to high-risk jurisdiction',
        'Normal monthly utility payment'
      ])
    });
  }
  return amlData;
};
