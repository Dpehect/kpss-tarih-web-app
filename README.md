# KPSS Tarih Web Application - Advanced Architecture and Local Intelligent Search Engine

- GitHub Repository: https://github.com/Dpehect/kpss-tarih-web-app
- Live Demo: https://kpss-tarih-web-app.vercel.app

This project is a high-performance, enterprise-grade educational web application designed for the KPSS History exam preparation. Built with a focus on modern web standards, zero-latency user experience, and type safety, the application serves as a prime example of a premium front-end architecture integrated with a robust local data pipeline.

## Core Architectural Pillars

The application is structured to deliver an optimized learning experience by utilizing cutting-edge web technologies:

- Framework: Next.js 16 utilizing the App Router and Turbopack for lightning-fast compilation and optimized builds.
- Language: 100% strict TypeScript, ensuring comprehensive type safety across components, API routes, and data models.
- Database & Synchronization: Supabase with SSR support, backed by a robust local-first fallback mechanism that guarantees continuous functionality and zero-latency page loading even during database connection issues.
- State & Styling: Lightweight state management coupled with custom, professional utility classes ensuring pixel-perfect responsive layouts and unified design systems.

## Local Intelligent Search Engine (API-less Chatbot)

To provide an intelligent tutoring experience without relying on third-party LLM APIs, the system implements a custom, highly-optimized search and matching engine:

- Normalization and Tokenization: Incoming queries undergo Turkish-specific lowercase conversion and character neutralization. A custom stop-words filter strips conversational filler and common Turkish verbs to isolate core historical terms.
- Multi-Tier Scoring Algorithm:
  - Tier 1 (Exact Title Match): 100 points.
  - Tier 2 (Exact Alias Match): 90 points.
  - Tier 3 (Keyword/Token Overlap): 10 points per matched token.
  - Tier 4 (Full-Text Search Fallback): 1 point per match.
- Typo Tolerance: Leverages Levenshtein Distance algorithms to gracefully handle spelling errors while protecting generic historical nouns from incorrect fuzzy matching.
- Generic Term Penalization: Prevents false positives by penalizing matches that only overlap with generic vocabulary (e.g., battle, treaty, period), ensuring the chatbot returns a precise result or fails gracefully with a polite fallback message.

## Dynamic Knowledge Base and Content Pipeline

The application consolidates all study modules under a single source of truth:

- Unified Data Pipeline: All historical topics, questions, timelines, and glossary items are centralized.
- Statically Compiled Database: To prevent runtime disk I/O bottlenecks and avoid Next.js Edge runtime filesystem compilation errors, the database is fully structured as statically imported TypeScript modules.
- Runtime Dynamic Content Generation: The loader automatically maps knowledge entries to corresponding study topics. It dynamically generates comprehensive Flashcards (5x increase in study material) and enriches Topic Summaries with deep-dive encyclopedia blocks on the fly.
