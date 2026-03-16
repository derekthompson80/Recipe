# KYC/AML Chatbot Test Platform

This project is a demonstration of a chatbot designed to handle customer queries related to **Know Your Customer (KYC)** and **Anti-Money Laundering (AML)** processes. It features synthetic data generation and a comprehensive testing suite including unit and end-to-end tests.

## Features

- **KYC/AML Chatbot**: Responds to queries about onboarding, KYC documents, and AML monitoring.
- **Synthetic Data Generation**: Uses `@faker-js/faker` to generate realistic customer profiles and transaction logs for testing.
- **Automated Testing**:
  - **Unit Tests**: Validates business logic using `Vitest`.
  - **End-to-End (E2E) Tests**: Validates user flows using `Cypress`.
- **Requirements Traceability**: Tracks requirements to test cases in `RTM.md`.

## Project Structure

```text
purdue_unittest/
├── src/
│   ├── services/
│   │   └── chatbotService.ts  # Chatbot logic and document processing
│   ├── utils/
│   │   └── generateData.ts    # Synthetic KYC/AML data generation
│   ├── test/
│   │   ├── chatbot.test.ts    # Unit tests (Vitest)
│   │   └── setup.ts           # Vitest environment setup
│   ├── App.tsx                # Main UI component
│   └── main.tsx               # Entry point
├── cypress/                   # Cypress E2E tests
│   └── e2e/
│       └── chatbot.cy.ts      # E2E test scenarios
├── RTM.md                     # Requirements Traceability Matrix
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository (or navigate to the project folder).
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Testing

### Unit Tests (Vitest)

Unit tests focus on the core logic of the `ChatbotService` and data generation utilities.

**To run unit tests:**
```bash
npm test
```
Or to run once and exit:
```bash
npm test -- --run
```

**What's tested:**
- Chatbot response logic for "onboard", "kyc", and "aml" keywords.
- Document validation (detecting expired documents).
- AML transaction risk detection (high-value transfers).
- Integrity of synthetic KYC and AML data.

### End-to-End Tests (Cypress)

E2E tests verify the integration of the UI with the backend services by simulating user interactions.

**To run Cypress in headless mode:**
```bash
npm run cypress:run
```

**To open the Cypress Test Runner (GUI):**
```bash
npm run cypress:open
```

*Note: Ensure the development server is running (`npm run dev`) before executing Cypress tests.*

## Requirements Traceability

For a detailed mapping of functional requirements to test cases, please refer to the [RTM.md](./RTM.md) file.
