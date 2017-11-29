## User Acceptance Test Cases
Team Name: BotsUp

### Test Case 1

**Title**: Perform code analysis on source file. 

**Description**: This test case verifies if the bot performs static code analysis on an uploaded source file and returns the list of issues if any.  
Note: This test case is also relevant when a user sends a snippet using Slack's snippet feature.

**Pre-conditions**: User has access to Slack, logs into Slack and accesses the bot via a channel or direct message.  
Note: Due to limitations in the Slack API, only the admin can upload files as a direct message; other users should upload the file to a channel by mentioning the bot using '@'.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Upload a source file for static code analysis. | Java, javascript or python source file | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

**Post-conditions**: Code analysis is performed and a list of issues is shown to the user with the option to get more details about any particular issue.

### Test Case 2

**Title**: Perform code analysis on provided GitHub link. 

**Description**: This test case verifies if the bot performs static code analysis on the provided GitHub link and displays issues

**Pre-conditions**: User has access to Slack, logs into Slack and accesses the chat bot window.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Provide a GitHub link for static code analysis. | Link to a file on GitHub  | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

\* The Github link needs to be the raw direct link to the source file (typically, raw.githubusercontent.com/.....)  

**Post-conditions**: Code analysis is performed and a list of issues is shown to the user with the option to get more details about any particular issue.

### Test Case 3

**Title**: Request method definitions 

**Description**: This test verifies if the bot can display definitions for a method in Java or Python.

**Pre-conditions**: User has access to Slack, logs into Slack and accesses the chat bot window.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Ask the bot to define a method in Java or Python. | Method name/signature  | Receive a reply from the bot asking which language is the method from.
| 3 | Provide the language to the bot. | Java or Python |  Receive details about the povided method in the provided language.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

**Post-conditions**: The bot provides detailed information about a particular method from the documentation.

### Test Case 4

**Title**: Perform code analysis on ZIP archives

**Description**: This test verifies if the bot performs static code analysis on an uploaded ZIP file or GitHub link to the ZIP file, and displays issues

**Pre-conditions**: 
User has access to Slack, logs into Slack and accesses the bot via a channel or direct message.  
Note: Due to limitations in the Slack API, only the admin can upload files as a direct message; other users should upload the file to a channel by mentioning the bot using '@'.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Upload a zip file or a GitHub link* for static code analysis. | Zip file or GitHub link to zip file  | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

\* The Github link needs to be the raw direct link to the repo's zip file (typically, codeload.github.com/...)  

**Post-conditions**: Code analysis is performed and a list of issues is shown to the user with the option to get more details about any particular issue.

### Test Case 5

**Title**: Perform code analysis on a code snippet. 

**Description**: This test is to verify if the bot performs static code analysis on a code snippet and displays issues.

**Pre-conditions**: User has access to Slack, logs into Slack and accesses the chat bot window.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Provide a code snippet (between \`\`\` tag) for static code analysis. | Code Snippet  | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

**Post-conditions**: Code analysis is performed and a list of issues is shown to the user with the option to get more details about any particular issue.

