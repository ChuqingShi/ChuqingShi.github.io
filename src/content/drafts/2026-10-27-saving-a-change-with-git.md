---
# Starter draft written by Claude. Rewrite it as you learn, then move this file to src/content/notes/ to publish it.
title: Saving a change with Git, step by step
date: 2026-10-27
type: study-note
topic: tech-stack
subtopic: git
tags: [git, workflow]
summary: The four commands behind every change to this site, and what each one actually does.
---

Every change to this site follows the same loop. Git can feel like magic, so here is what each step does.

## 1. See what changed

```bash
git status
```

Git compares your files with the last saved snapshot (the last *commit*) and lists what is different. Nothing is changed by running it, so run it often.

## 2. Choose what goes into the next snapshot

```bash
git add src/content/journey.ts
```

This puts the file in the *staging area*: a draft of the next commit. You can stage some changes and leave others out, which keeps each commit about one thing.

## 3. Save the snapshot

```bash
git commit -m "Add a milestone for the hackathons"
```

A commit is a permanent, named snapshot of the whole project, as it looks with your staged changes applied. The message is for future you: say what changed and, if it is not obvious, why.

## 4. Share it

```bash
git push
```

Commits live only on your computer until you push them to GitHub. On this site, pushing to the `main` branch is also what publishes the site, so work on a separate branch and merge when you are happy.

## Python analogy

If a commit were a Python object, it would be an immutable snapshot plus a pointer to its parent commit: usually a simple chain of versions of the project (a merge commit has two parents, so in general it is a graph). A *branch* is just a movable name that points at one commit in that list.
