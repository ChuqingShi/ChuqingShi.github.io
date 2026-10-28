---
# Starter draft written by Claude from the LyricLens README. Add your own findings and voice, then move this file to src/content/notes/ to publish it.
title: Why LyricLens splits lyrics by section, not by length
date: 2026-10-27
type: deep-dive
topic: llms-ai-agents
tags: [rag, embeddings, chunking, retrieval]
summary: In retrieval, a chunk is the unit of meaning the search can find. For song lyrics, the natural unit is a verse or a chorus.
projects: [lyriclens]
---

[LyricLens](/) recommends songs by comparing what you describe (a mood, a situation, a vibe) with what song lyrics actually say. Before any of that works, every song's lyrics have to be cut into pieces, or *chunks*, that get embedded and searched. How you cut them matters more than it first seems.

## What a chunk is for

An embedding model turns a piece of text into one vector that summarizes its meaning. Search then finds the chunks whose vectors are closest to the vector of your query.

So each chunk gets exactly one "meaning". If a chunk mixes two unrelated ideas, its vector lands somewhere in between, and it matches neither idea well.

## Why fixed-length chunks hurt here

The common default is to cut text every *N* tokens, maybe with some overlap. For lyrics, that cut lands wherever it lands: half a verse glued to half a chorus, or a bridge split down the middle.

Songs carry meaning section by section. A verse often sets a scene and the chorus states the feeling. Mixing them blurs both.

## What LyricLens does instead

- **Keep natural sections.** The lyrics from LRCLIB already come split into sections, so LyricLens keeps those whenever it can.
- **Split oversized sections carefully.** The embedding model (all-MiniLM-L6-v2) only reads a limited amount of text per input, so a very long section is split with a controlled fallback, which also avoids leaving a tiny leftover chunk at the end.
- **Skip what cannot be chunked meaningfully.** A song with only a few lines is logged and left out of chunking rather than forced into a bad chunk.

## From chunks back to songs

Search returns chunks, but people want songs. LyricLens groups the matching chunks by song, then reranks songs by a weighted mix of vector similarity and popularity before the language model explains each match.

## Questions to explore next

- How much does section-based chunking actually improve results over fixed windows? A small labeled set of queries would answer this.
- Should a chorus that repeats several times count once or several times?
