---
layout: page
title: ChatDKU
description: An agentic RAG assistant that answers questions about Duke Kunshan University from official sources, with citations.
importance: 1
category: work
---

[ChatDKU](https://chatdku.com) is an agentic AI assistant for Duke Kunshan University: it answers questions about policies, deadlines, courses, bulletins, and handbooks from official university sources, and links back to the material it used. It runs as a university-recognized platform built and maintained by student developers, with stakeholders across Advising, Career Services, Athletics, the Institute of Global Higher Education, and IT.

## Why it exists

University knowledge is scattered — a policy lives in a PDF handbook, a deadline lives in a bulletin, an office location lives on a map nobody bookmarks. A general-purpose chatbot answers these questions confidently and often wrong. ChatDKU's premise is that an assistant for institutional knowledge has to be grounded: every answer traceable to a document, and the system honest when the documents don't say enough.

## How it works

Rather than retrieving once and generating, the agent runs a loop:

1. **Retrieve** — hybrid search over the indexed corpus, combining vector search and keyword search with a reranking pass.
2. **Assess sufficiency** — decide whether the retrieved evidence actually supports an answer.
3. **Refine** — if not, reformulate the query and search again.
4. **Synthesize** — answer with citations back to the source documents.

Tools the agent can call (search, campus map lookup, and others) run on a **dedicated tool server** separate from the core agent. Decoupling execution from reasoning lets tools be scaled, versioned, and reused independently of the agent that calls them.

A **long-term memory** layer lets the agent persist and retrieve context across sessions, so multi-turn interactions stay coherent instead of restarting from scratch each time.

## Infrastructure

- Migrated the platform from Flask to **Django**, and containerized services with **Docker**
- **Shibboleth SSO** integration for Duke NetID authentication
- **Redis** and **Celery** for caching and background work; **Locust** for load testing
- Next.js frontend

## Evaluation

Shipping a RAG system without measurement is guessing. I built a RAG evaluation platform on top of existing evaluation frameworks to compare LLM choices and pipeline configurations on retrieval quality, sufficiency judgments, and answer accuracy — used both to pick models and to catch regressions as the pipeline changes.

## What's next

Mobile apps, deeper multi-step reasoning, visual document ingestion, and automated benchmarking.

<div class="mt-4">
  <a class="btn btn-sm z-depth-0" role="button" href="https://chatdku.com" target="_blank" rel="noopener">Visit chatdku.com</a>
</div>
