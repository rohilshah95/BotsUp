Week 1

| Deliverable   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
| Design       | Done(Some changes may come up)        | Update as per changes come up
| Problem Statement      |Complete          |  --
| Use Cases     | Complete   |  May need updates
| Design Sketches    | Complete            |  May need updates
| Story Board     | Complete      | --
| Architecture    | Complete        | May need updates
| Constraints and Guidelines| Complete    | --

Week 2

## Iteration 1

###### Use Case 1

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a file to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/Wj98wJAI)
| Subflow      | Interpret uploaded source file and send to external API            |  [Input Parser](https://trello.com/c/H8rhqRmx), [Request Creation](https://trello.com/c/eW4YRgTj)
| Subflow      | Bot returns suggestions provided by the API          |  [Output Parser](https://trello.com/c/UHEcMlRu)
| Subflow      | User requests details of suggestions          |  [Issue Details](https://trello.com/c/MDK8sbpS)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow (Happy Case)    | [Testing task](https://trello.com/c/SdpXvI11)

###### Use Case 2

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Submit a repository link to the chat bot for analysis and get results**           | [**Story**](https://trello.com/c/5m8WI2WU)
| Subflow      | Retrieve source files from repo URL and send to external API            |  [Input Parser](https://trello.com/c/H8rhqRmx), [Git Integration](https://trello.com/c/4ghjOzwg), [Request Creation](https://trello.com/c/eW4YRgTj)
| Subflow      | Bot returns suggestions provided by the API          |  [Output Parser](https://trello.com/c/UHEcMlRu)
| Subflow      | User requests details of suggestions          |  [Issue Details](https://trello.com/c/MDK8sbpS)
| Alternate Flow      | Unsupported Input File             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow (Happy Case)    | [Testing task](https://trello.com/c/SdpXvI11)

###### Use Case 3

| Deliverable   | Item   |  Issues/Tasks
| ------------- | ------------  |  ------------
| **Use Case**      | **Query a method or class definition from laguague documentation**           | [**Story**](https://trello.com/c/MB3iZTAW)
| Subflow      | Interpret method/class name and query the language documentation |  [Input Parser](https://trello.com/c/H8rhqRmx)
| Subflow      | Return Parsed Description         |  [Documentation Parser](https://trello.com/c/wYzh34Ib)
| Alternate Flow      | Method/Class definition not found             |  [Exception Handling](https://trello.com/c/LbG7Blsj)
| Selenium Tests| Test full flow (Happy Case)    | [Testing task](https://trello.com/c/SdpXvI11)
