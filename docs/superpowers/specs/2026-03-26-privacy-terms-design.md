# Design Specification: Keyly Privacy Policy and Terms of Service

## Overview
This document outlines the design, content structure, and technical facts for the Keyly website's Privacy Policy and Terms of Service documents. The chosen format is a **Modern & Friendly** style, which uses non-legal plain-language summaries preceding complex legal clauses to build user trust and clarify the iOS keyboard permissions.

## Key Technical Constraints to Address

1.  **AI Processing Types**: 
    *   **Offline AI** (Apple FoundationModels): Data never leaves the device.
    *   **Cloud AI** (Third-party LLMs): Text is transmitted securely and **deleted immediately after processing (ephemeral/no logs)**.
2.  **iOS "Full Access" Permission**: It is mandatory for Keyly to connect to Cloud AI APIs. The policy must explicitly state that this access is purely for API calls, not keylogging or monitoring general device usage.
3.  **Authentication & Quotas**: 
    *   **General Users**: 5 cloud AI requests per day + unlimited offline AI.
    *   **Pro Users**: Unlimited cloud AI + unlimited offline AI.
    *   **Backend Identity**: Uses an anonymous `accessToken` rather than a standard user account / RevenueCat subscription profile.
4.  **Third-Party SDKs**: Firebase is integrated exclusively for tracking purchase funnel conversion rates. No text input is logged or sent to Firebase Analytics.

## Privacy Policy Architecture

*   **Section 1: Our Core Privacy Promise**
    *   Summary: We don't want your data. We only process what you explicitly ask AI to enhance.
*   **Section 2: Information We Collect and How We Use It**
    *   **Text Input**: Explains Offline (On-Device) vs. Cloud processing (Ephemeral).
    *   **Full Access**: Clear explanation of iOS sandbox rules and why we need Full Access for Cloud AI.
    *   **Identifiers**: Explanation of the `accessToken` used for rate limiting.
*   **Section 3: Analytics and Third-Party Providers**
    *   Firebase (for purchase funnel/conversion).
    *   Cloud AI Providers (e.g., OpenAI / Anthropic) with strict ephemeral processing agreements.
*   **Section 4: User Rights**
    *   Standard GDPR/CCPA info tailored for zero-retention architecture.

## Terms of Service Architecture

*   **Section 1: Acceptance of Terms**
    *   Summary: Welcome to Keyly. By downloading, you agree to these terms.
*   **Section 2: The Service & Subscriptions**
    *   Outline of the free tier (5 daily cloud limit) vs. Pro tier (unlimited).
    *   Information about subscription renewals and reliance on Apple's App Store payment system.
*   **Section 3: Acceptable Use**
    *   Prohibition of API abuse, automation, or reverse engineering.
*   **Section 4: Disclaimers & Limitations of Liability**
    *   Standard "As-Is" clause.
    *   **AI Output Disclaimer**: Keyly holds no liability for inaccurate, offensive, or inappropriate AI-generated content.
*   **Section 5: Intellectual Property**
    *   Keyly owns the app; the user maintains ownership of the generated/enhanced text.
*   **Section 6: Governing Law**
    *   Taiwan (R.O.C.) law applies.

## Implementation Details

*   **File Paths**: 
    *   `/privacy/index.html`
    *   `/terms/index.html`
*   **Formatting**: The existing HTML boilerplate from the Keyly marketing website will be used to ensure uniform styling (using `/assets/css/style.css`, Google Analytics tag, standard navigation and footer layout).
