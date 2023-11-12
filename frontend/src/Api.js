// Api.js
// This module provides a list of high-level backend operations for easy access

const BACKEND_ENDPOINT = "http://localhost:8000/api";

// Private method
// Fetches from endpoint and return a Promise of the result
const fetchDataAsync = async (endpoint) => {
    try {
        const response = await fetch(`${BACKEND_ENDPOINT}/${endpoint}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
    return null;
}

// Get all activities
const getActivitiesAsync = async () => {
    return fetchDataAsync("activities");
}

// Get an activity by its ObjectId
const getActivityAsync = async (activityId) => {
    return fetchDataAsync(`activities/details/${activityId}`);
}

export default {getActivityAsync, getActivitiesAsync};