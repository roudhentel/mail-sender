# mail-sender

Its a Rest API built in NodeJS for sending email.
The application provide an abstraction between two different email service providers. If one of
the services goes down, your service can quickly failover to a different provider without affecting your
customers.

## Table of contents

- [Installation and Running of the App](#installation)
  - [Node.js](#nodejs)
  - [Usage](#usage)
- [TODO](#todo)

## Installation[⬆](#table-of-contents)
### Node.js[⬆](#table-of-contents)
1. Install typescript globally
  `npm install -g typescript`
2. Install modules
  `npm install`
3. Run typescript
  `tsc` or `tsc --watch`
4. Add Enviroment Variables
  - PORT
  - sendgridapikey (Visit [website](https://sendgrid.com/) to learn how to acquire API key)
  - sedinblueapikey (Visit [website](https://www.sendinblue.com/?utm_source=adwords_brand&utm_medium=lastclick&utm_content=SendinBlue&utm_extension&utm_term=sendinblue&utm_matchtype=e&utm_campaign=1153673712&utm_network=g&km_adid=355470527172&km_adposition&km_device=c&utm_adgroupid=53093595276&gclid=Cj0KCQjwwOz6BRCgARIsAKEG4FUtTvisLqo6XxygNbhWXkZCPsA9jkJRJVQO4OApB77a86fUaMUx2pYaAs0WEALw_wcB) to learn how to acquire API key)
5. Run the app
  `npm start`

## Usage[⬆](#table-of-contents)
 1. Endpoint: /api/email/send
    body: application/json
    {
      "subject": "Email Subject",
      "body": "Email body",
      "from": "from@email.com",
      "to": ["email1@gmail.com","email2@gmail.com"],
      "cc": ["email1@gmail.com","email2@gmail.com"],
      "bcc": ["email1@gmail.com","email2@gmail.com"]
    } 

## Todo[⬆](#table-of-contents)
1. Implement async API for sending email - This endpoint will accept all incoming request for sending mail and put them on queue. Once completed, a webhook that is provided on the request body will be use to notify the requestor for the completion of the task.
2. Validation of email - Add additional checking where in before sending the email, the application will check if the email is valid. Each of the mail server has it but need an upgraded account to use that endpoint.
3. Implement a load balancer. Instead of the application itself doing the manual checking of the status of each mail server. We can add a load balancer to handle this task.
4. Create a database that will record all unsent emails. 
5. Implement a job process that will run occasionally to check and try resending unsent emails.
6. Add sending of notification to the support team once a server fails X number of attempts in sending email.
7. Create a reference table for all possible Error Code for each Mail Server. Per mail server have their own error code for a specific error. We create our own Codes that is equivalent to the mail server Error Code
  e.g. Mail Server 1 - Error Code: 5000 for Subject is Required
       Mail Server 2 - Error Code: 3900 for Subject is Required
       Application Error Code: 10 for Subject is Required.
       Every time the app received error code 5000 on mail server 1, the app will display error code 10 accross all our clients.
       We need to make our Codes uniform for all the clients.
8. Add logger. This will record all request coming in and the response for each request.
