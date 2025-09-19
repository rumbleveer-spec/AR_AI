# iOS Shortcuts Integration Examples for AR_AI

This document provides examples of how to integrate AR_AI with iOS Shortcuts using webhook URLs.

## Webhook URLs

AR_AI provides the following webhook URLs for various actions:

* **Create Note:** `https://api.ar-ai.com/notes?apiKey={YOUR_API_KEY}`  (POST request with JSON payload: `{"content": "Note content"}`)
* **Send Email:** `https://api.ar-ai.com/email?apiKey={YOUR_API_KEY}` (POST request with JSON payload: `{"to": "recipient@example.com", "subject": "Email subject", "body": "Email body"}`)
* **Set Reminder:** `https://api.ar-ai.com/reminders?apiKey={YOUR_API_KEY}` (POST request with JSON payload: `{"title": "Reminder title", "date": "YYYY-MM-DD HH:mm", "description": "Reminder description"}`)
* **Get Weather:** `https://api.ar-ai.com/weather?apiKey={YOUR_API_KEY}&location={LOCATION}` (GET request, returns JSON weather data)


**Note:** Replace `{YOUR_API_KEY}` with your actual AR_AI API key.  Replace `{LOCATION}` with a city name or coordinates.  Ensure your API key has the necessary permissions for each action.


## Shortcut Configurations

Here are examples of iOS Shortcut configurations:

**1. Create a Note:**

* **Action:** "Get Contents of URL"
* **URL:** `https://api.ar-ai.com/notes?apiKey={YOUR_API_KEY}`
* **Method:** POST
* **Headers:**  `{"Content-Type": "application/json"}`
* **Body:**  `{"content": "This is a note created via iOS Shortcut"}`


**2. Send an Email:**

* **Action:** "Get Contents of URL"
* **URL:** `https://api.ar-ai.com/email?apiKey={YOUR_API_KEY}`
* **Method:** POST
* **Headers:**  `{"Content-Type": "application/json"}`
* **Body:** `{"to": "recipient@example.com", "subject": "Shortcut Email", "body": "This email was sent using an iOS Shortcut."}`


**3. Set a Reminder:**

* **Action:** "Get Contents of URL"
* **URL:** `https://api.ar-ai.com/reminders?apiKey={YOUR_API_KEY}`
* **Method:** POST
* **Headers:** `{"Content-Type": "application/json"}`
* **Body:** `{"title": "Meeting Reminder", "date": "2024-03-15 14:00", "description": "Important meeting with the team"}`


**4. Get Current Location Weather:**

* **Action:** "Get Contents of URL"
* **URL:** `https://api.ar-ai.com/weather?apiKey={YOUR_API_KEY}&location={YOUR_LOCATION}` (Replace with your location)
* **Method:** GET
* **Headers:** `{}` (Empty for GET requests)
* **Body:** `{}` (Empty for GET requests)
* **Follow-up Actions:**  Parse JSON response to extract relevant weather information (temperature, conditions, etc.)


## Automation Examples

* **Create a note when a new email arrives:** Use the "When email arrives" trigger in Shortcuts, followed by the "Create Note" shortcut configuration above.
* **Set a reminder when a calendar event is added:** Use the "When calendar event is added" trigger, followed by the "Set Reminder" shortcut configuration.
* **Send a weather report notification in the morning:** Use the "At a certain time" trigger, followed by the "Get Current Location Weather" shortcut configuration and a notification action to display the weather information.


Remember to replace placeholder values with your actual API key and data.  Test each shortcut thoroughly after creation.