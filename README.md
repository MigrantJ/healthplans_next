# healthplans_next
[healthplansnext.com](https://healthplansnext.com) is a single-page Next.js app that facilitates the visualization and selection of affordable health plans. It sources its data from the Marketplace API provided by HealthCare.gov.

## Features
- Responsive design allows for browsing on desktop, tablet, or mobile devices.
- Uses the Geolocation API to automatically identify user's location and retrieve locally available healthcare plans (can be manually overridden)
- Optionally enter income and household details for more accurate premium estimates and potential tax credits.
- Facet filter plans by premium, deductible, HMO/PPO, coverage level, company, and available management programs.
- Quickly compare premium and deductible amounts with bar graph visualizations rendered with D3.js
- "Infinite scroll" loads more plans as the user scrolls down the page.
- Clicking on a plan opens a Detail View popup, providing finer-grain information such as plan ID, star ratings, copay amounts, and links to find in-network doctors and covered medications.
- Bookmark and compare up to five plans side-by-side.

## Installation and Usage
- Install using [Yarn](https://yarnpkg.com): ```yarn install```
- Make an .env file in the base directory with the following: ```HEALTHCARE_API_KEY={your_api_key}``` You can apply for a free Marketplace API key [here](https://developer.cms.gov/marketplace-api/key-request.html).
- Use ```yarn run dev``` to start a local instance of the project.
- Navigate to ```http://localhost:3000```

## Technologies Used
- **Front-End**: React (TypeScript)
- **Routing / API**: Next.js
- **Deployment Platform**: Vercel
- **UI Components**: Chakra UI
- **Data Fetch / Caching**: Tanstack Query
- **State Management**: Zustand
- **Data Visualization**: D3.js
- **Icons**: React Icons

## Links
- [HealthCare.gov](https://www.healthcare.gov/)
- [Marketplace API Documentation](https://marketplaceapicms.docs.apiary.io/#)