# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\



# Brief Explanation of the Approach:
## Component Development:

### GoogleReviews Component: 

`Developed a React component that fetches and displays Google Reviews for a given place. The component includes sorting functionality, handles loading states, and displays an error message when necessary. This component leverages a custom hook, useGoogleReviews, to manage the API calls and state.`

### Error Handling:

`Created a custom ErrorSVG component to visually indicate errors, which is displayed within the GoogleReviews component if an error occurs while fetching reviews.`

### Testing Setup:

 `Configured Jest and React Testing Library to write unit tests for the GoogleReviews component. Mocked the useGoogleReviews hook to isolate the component for testing different scenarios like successful data fetch, loading state, and error state.`

