## Project Name: BotsUp

### User Acceptance Test Cases

#### Use Case 1
Test Case ID: 001

Test Priority: High

Module Name: BotsUp Use Case 1

Test Title: Perform code analysis on source file. 

Description: Check if the bot performs static code analysis on source file.

Test designed by: BotsUp Team

Test designed date: 11/26/2017

Pre-condition: User has access to slack, logs into slack as the admin (due to limitations of Slack API only the admin can upload files as a direct message and every other user has to upload the file to a channel) and accesses the chat bot window .

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Upload a source file for static code analysis. | Java, javascript or python source file | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

Post-condition: You will have received static code analysis of your source file.

#### Use Case 2
Test Case ID: 002

Test Priority: High

Module Name: BotsUp Use Case 2

Test Title: Perform code analysis on provided GitHub link. 

Description: Check if the bot performs static code analysis on provided GitHub link.

Test designed by: BotsUp Team

Test designed date: 11/26/2017

Pre-condition: User has access to slack, logs into slack and accesses the chat bot window.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Provide a GitHub link (in the format of raw.githubusercontent.com/..... ) for static code analysis. | Link to a file on GitHub  | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

Post-condition: You will have received static code analysis of your provided GitHub link.


#### Use Case 3
Test Case ID: 003

Test Priority: High

Module Name: BotsUp Use Case 3

Test Title: Look up the documentation for details of methods in the given languages (Java and Python). 

Description: Check if the bot can lookup any method in Java or Python.

Test designed by: BotsUp Team

Test designed date: 11/26/2017

Pre-condition: User has access to slack, logs into slack and accesses the chat bot window.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Ask the bot to define a method in Java or Python. | Method name/signature  | Receive a reply from the bot asking which language is the method from.
| 3 | Provide the language to the bot. | Java or Python |  Receive details about the povided method in the provided language.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

Post-condition: You will have received detailed information about a particular method from the documentation.

#### Use Case 4
Test Case ID: 004

Test Priority: High

Module Name: BotsUp Use Case 4

Test Title: Perform code analysis on provided zip file or GitHub link to zip file. 

Description: Check if the bot performs static code analysis on provided zip file or GitHub link to zip file.

Test designed by: BotsUp Team

Test designed date: 11/26/2017

Pre-condition: User has access to slack, logs into slack as the admin (due to limitations of Slack API only the admin can upload files as a direct message and every other user has to upload the file to a channel) and accesses the chat bot window.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Upload a zip file or a raw GitHub link (in the format of codeload.github.com/...) to zip file for static code analysis. | Zip file or GitHub link to zip file  | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

Post-condition: You will have received static code analysis of your provided zip file or GitHub link to zip file.

#### Use Case 5
Test Case ID: 005

Test Priority: High

Module Name: BotsUp Use Case 5

Test Title: Perform code analysis on provided code snippet. 

Description: Check if the bot performs static code analysis on provided code snippet.

Test designed by: BotsUp Team

Test designed date: 11/26/2017

Pre-condition: User has access to slack, logs into slack and accesses the chat bot window.

| Step  | Test Steps  | Test Data  | Expected Result 
| ------------- | ------------  |  ------------ | ----------
| 1 | Send a greeting to the bot. | "Hi" | Receive an appropriate greeting as response from the bot.
| 2 | Provide a code snippet for static code analysis. | Code Snippet  | Receive issues from the bot if they exist in the file.
| 3 | Provide a particular issue number to know more about it. | Issue number | Receive detailed information about a particular issue.
| 4 | Send a farewell message to the bot. | "Bye" |  Receive an appropriate farewell as response from the bot.

Post-condition: You will have received static code analysis of your provided code snippet.


