# Iteration 2 - Service Milestone

#### Use Case 1

| Deliverable   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a file to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/Wj98wJAI)
| Service      | Api.ai intents integration into input parser           |  [Input Parser](https://trello.com/c/H8rhqRmx), [AI Integration](https://trello.com/c/daTExnzq)
| Service      | Sonarqube service call integration in bot          |  [SQ Integration](https://trello.com/c/1ihoo0cW)
| Subflow      | Accpeting files from multiple users                |  [Accept files](https://trello.com/c/h8OmwRiO)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow with service call    | [Testing task](https://trello.com/c/SdpXvI11)

#### Use Case 2

| Deliverable   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a repository link to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/Wj98wJAI)
| Service      | Api.ai integration into input parser           |  [Input Parser](https://trello.com/c/H8rhqRmx), [AI Integration](https://trello.com/c/daTExnzq)
| Service      | Sonarqube service call integration in bot          |  [SQ Integration](https://trello.com/c/1ihoo0cW)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow with service call    | [Testing task](https://trello.com/c/SdpXvI11)

#### Use Case 3

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Query a method or class definition from laguague documentation**           | [**Story**](https://trello.com/c/MB3iZTAW)
| Service      | Api.ai integration into input parser           |  [Input Parser](https://trello.com/c/H8rhqRmx), [AI Integration](https://trello.com/c/daTExnzq)
| Service      | Add support for Python |  [Documentation Parser](https://trello.com/c/wYzh34Ib)
| Alternate Flow      | Method/Class definition not found             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow with service call    | [Testing task](https://trello.com/c/SdpXvI11)

#### Backlog

* Enhancements - Runner takes too much time to analyse - [#3](https://github.ncsu.edu/rcoutin/BOT/issues/3)
* Enhancements - Need new folders for each project for analysis - [#4](https://github.ncsu.edu/rcoutin/BOT/issues/4)
* ~~Issue - Improper responses from bot~~ - [#1](https://github.ncsu.edu/rcoutin/BOT/issues/1)
* ~~Issue - Bot crashes after tip merge~~ - [#2](https://github.ncsu.edu/rcoutin/BOT/issues/2)



# Iteration 1 - Bot Milestone - Week 2

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
| **Use Case**      | **Query a method or class definition from laguague documentation**           | [**Story**](https://trello.com/c/MB3iZTAW)
| Subflow      | Interpret method/class name and query the language documentation |  [Input Parser](https://trello.com/c/H8rhqRmx)
| Subflow      | Return Parsed Description         |  [Documentation Parser](https://trello.com/c/wYzh34Ib)
| Alternate Flow      | Method/Class definition not found             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow (Happy Case)    | [Testing task](https://trello.com/c/SdpXvI11)


# Iteration 1 - Bot Milestone - Week 1

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| Design       | Update to use cases required        | [Update](https://trello.com/c/1Y2mgxgs)
| Problem Statement      | Updated          |  --
| Use Cases     | Updated   |  --
| Design Sketches    | Updated            |  --
| Story Board     | Updated      | --
| Architecture    | Updated        | --
| Constraints and Guidelines| Updated    | --
