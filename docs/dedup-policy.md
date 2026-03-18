# Dedup Policy

## Principle

Do not let memory become a junk drawer.

## Current rule

Block insertion when semantic similarity >= 0.95 within the same project.

## Why

This prevents:
- accidental re-insert
- memory inflation
- noisy retrieval

## Important

Dedup is not lifecycle management.

A record can be unique and still obsolete.
