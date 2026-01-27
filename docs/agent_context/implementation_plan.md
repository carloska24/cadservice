# Plan: Implement NPI / Industrialization Page

## Goal

Implement the `/services/npi` page based on the approved **High-Fidelity ASCII Wireframe**. This page represents the highest technical authority of the site, focusing on **Risk Reduction** and **Engineering Maturity**.

## User Review Required

> [!NOTE]
> This implementation follows `npi_wireframe.md` strictly.

## Proposed Changes

### Frontend (`frontend/src/app/services/npi/page.tsx`)

- **Theme**: Deep Dark/Industrial for Hero, clean White/Slate for content.
- **Structure**:
  1.  **Hero Technical**: Focus on "Zero Risk" and "Prototype to Scale".
  2.  **The Problem**: "Gap between Design & Production" (Myers' Rule of 10).
  3.  **Process Flow (The Core)**: Horizontal Gates (DFX -> Pilot -> Scale).
  4.  **BOM Engineering**: Table comparing component strategies.
  5.  **Case Study**: Visual proof of optimization (ROI).
  6.  **CTA**: "Validate before investing".

### Components

- **Icons**: Specialized set (Search, FlaskConical, Rocket, ShieldAlert, TrendingDown).
- **Layout**: `max-w-7xl` container matching Home and Services.

## Verification Plan

1.  **Route Check**: Verify access at `localhost:3000/services/npi`.
2.  **Visual Impact**: Confirm the "Process Flow" looks premium and authoritative.
3.  **Responsiveness**: Ensure the horizontal flow stacks correctly on mobile.
