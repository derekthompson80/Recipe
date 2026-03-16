# Requirements Traceability Matrix (RTM)

| Requirement ID | Description | Test Case ID | Status | Notes |
|----------------|-------------|--------------|--------|-------|
| Req-001 | Chatbot supports KYC onboarding queries | TC-001 | Pass | Verified with prompt "How do I onboard" |
| Req-002 | Chatbot detects expired identity documents | TC-002 | Pass | Verified with filename containing "expired" |
| Req-003 | Chatbot processes valid documents | TC-003 | Pass | Verified with "valid_id.jpg" |
| Req-004 | AML detection for high-value transactions (> 100k) | TC-004 | Pass | Verified with 250k transaction |
| Req-005 | Synthetic KYC data generation | TC-005 | Pass | Verified with Faker.js implementation |
| Req-006 | Synthetic AML data generation | TC-006 | Pass | Verified with Faker.js implementation |
| Req-007 | E2E: Chatbot handles onboarding query | TC-007 | Pass | Cypress: should handle KYC onboarding query |
| Req-008 | E2E: Chatbot handles AML query | TC-008 | Pass | Cypress: should handle AML query |
| Req-009 | E2E: UI displays synthetic KYC data | TC-009 | Pass | Cypress: should generate synthetic KYC data |
