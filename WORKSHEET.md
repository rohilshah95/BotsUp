# Iteration 3 - Deploy Milestone

| Deliverable   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Task**      | **Deploy Bot using configuration management tools**           | [**Module**](https://trello.com/c/h5X2kfRp)
| Service      | Ansible Playbook to install the bot           |  [Deploy](https://trello.com/c/h5X2kfRp)
| Service      | Ansible Playbook to install Sonarqube API          |  [SQ Integration](https://trello.com/c/n47AyBE4)

#### Backlog

* Issue - Bot crashes when repo link contains token (private repository links) - [#10](https://github.ncsu.edu/rcoutin/BOT/issues/10)
* Issue - Analysis Rule information during multiple user access breaks - [#9](https://github.ncsu.edu/rcoutin/BOT/issues/9)
* Enhancement - Avoiding issues clutter - [#7](https://github.ncsu.edu/rcoutin/BOT/issues/7)



# Iteration 2 - Service Milestone

**Added more use cases as per expert's (professor/TA) suggestion**
1. Sending bot a snippet - The bot analyses a snippet sent to it as a code block like the following: ```code block```.
2. Sending bot a public github repo link/zip file - The bot analysis Github Repositories sent as link/zip file.

#### Use Case 1

| Deliverable   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a file to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/Wj98wJAI)
| Service      | Api.ai intents integration into input parser           |  [Input Parser](https://trello.com/c/H8rhqRmx), [AI Integration](https://trello.com/c/daTExnzq)
| Service      | Sonarqube service call integration in bot          |  [SQ Integration](https://trello.com/c/1ihoo0cW)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)

#### Use Case 2

| Deliverable   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a repository link to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/Wj98wJAI)
| Service      | Api.ai integration into input parser           |  [Input Parser](https://trello.com/c/H8rhqRmx), [AI Integration](https://trello.com/c/daTExnzq)
| Service      | Sonarqube service call integration in bot          |  [SQ Integration](https://trello.com/c/1ihoo0cW)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)

#### Use Case 3

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Query a method or class definition from language documentation**           | [**Story**](https://trello.com/c/MB3iZTAW)
| Service      | Api.ai integration into input parser           |  [Input Parser](https://trello.com/c/H8rhqRmx), [AI Integration](https://trello.com/c/daTExnzq)
| Service      | Add support for Python, Javascript |  [Documentation Parser](https://trello.com/c/wYzh34Ib)
| Alternate Flow      | Method/Class definition not found             |  [Exception Handling](https://trello.com/c/LbG7Blsj)

#### Use Case 4

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Snippet Analysis**           | [**Suggestion**](https://trello.com/c/UmgNZgyr)
| Service      | Support analysis of snippets pasted into the message           |  [Snippet Parser](https://github.ncsu.edu/rcoutin/BOT/issues/6)
| Alternate Flow      | Method/Class definition not found             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
#### Use Case 5

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Github Repository Analysis**           | [**Story**](https://trello.com/c/BWdIjQQM)
| Service      | Support for analysing Github Public Repository using either link or archive of repository          |  [Input Parser](https://trello.com/c/H8rhqRmx), [AI Integration](https://trello.com/c/daTExnzq), [Unzipping repositories](https://trello.com/c/BWdIjQQM) 
| Alternate Flow      | Method/Class definition not found             |  [Exception Handling](https://trello.com/c/LbG7Blsj)

#### Backlog

* Issue - Bot crashes when repo link contains token (private repository links) - [#10](https://github.ncsu.edu/rcoutin/BOT/issues/10)
* Issue - Analysis Rule information during multiple user access breaks - [#9](https://github.ncsu.edu/rcoutin/BOT/issues/9)
* ~~Issue - Polling request until analysis is done to get issues~~ - [#8](https://github.ncsu.edu/rcoutin/BOT/issues/8)
* Enhancement - Avoiding issues clutter - [#7](https://github.ncsu.edu/rcoutin/BOT/issues/7)
* ~~Enhancement - Parsing snippets~~ - [#6](https://github.ncsu.edu/rcoutin/BOT/issues/6)
* ~~Issue - Uploaded file not went to scanner~~ - [#5](https://github.ncsu.edu/rcoutin/BOT/issues/5)
* ~~Enhancements - Runner takes too much time to analyse~~ - [#3](https://github.ncsu.edu/rcoutin/BOT/issues/3)
* ~~Enhancements - Need new folders for each project for analysis~~ - [#4](https://github.ncsu.edu/rcoutin/BOT/issues/4)
* ~~Issue - Improper responses from bot~~ - [#1](https://github.ncsu.edu/rcoutin/BOT/issues/1)
* ~~Issue - Bot crashes after tip merge~~ - [#2](https://github.ncsu.edu/rcoutin/BOT/issues/2)


# Previous Iteration Worksheets
## Iteration 1 - Bot Milestone - Week 2

#### Use Case 1

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a file to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/Wj98wJAI)
| Subflow      | Interpret uploaded source file and send to external API            |  [Input Parser](https://trello.com/c/H8rhqRmx), [Request Creation](https://trello.com/c/eW4YRgTj)
| Subflow      | Bot returns suggestions provided by the API          |  [Output Parser](https://trello.com/c/UHEcMlRu)
| Subflow      | User requests details of suggestions          |  [Issue Details](https://trello.com/c/MDK8sbpS)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow (Happy Case)    | [Testing task](https://trello.com/c/SdpXvI11)

#### Use Case 2

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a repository link to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/5m8WI2WU)
| Subflow      | Retrieve source files from repo URL and send to external API            |  [Input Parser](https://trello.com/c/H8rhqRmx), [Git Integration](https://trello.com/c/4ghjOzwg), [Request Creation](https://trello.com/c/eW4YRgTj)
| Subflow      | Bot returns suggestions provided by the API          |  [Output Parser](https://trello.com/c/UHEcMlRu)
| Subflow      | User requests details of suggestions          |  [Issue Details](https://trello.com/c/MDK8sbpS)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow (Happy Case)    | [Testing task](https://trello.com/c/SdpXvI11)

#### Use Case 3

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Query a method or class definition from language documentation**           | [**Story**](https://trello.com/c/MB3iZTAW)
| Subflow      | Interpret method/class name and query the language documentation |  [Input Parser](https://trello.com/c/H8rhqRmx)
| Subflow      | Return Parsed Description         |  [Documentation Parser](https://trello.com/c/wYzh34Ib)
| Alternate Flow      | Method/Class definition not found             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow (Happy Case)    | [Testing task](https://trello.com/c/SdpXvI11)


## Iteration 1 - Bot Milestone - Week 1

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| Design       | Update to use cases required        | [Update](https://trello.com/c/1Y2mgxgs)
| Problem Statement      | Updated          |  --
| Use Cases     | Updated   |  --
| Design Sketches    | Updated            |  --
| Story Board     | Updated      | --
| Architecture    | Updated        | --
| Constraints and Guidelines| Updated    | --
