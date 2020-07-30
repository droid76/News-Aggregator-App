# Description
A RESTful responsive web application that uses the New York Times and Guardian APIs to display top headlines from domains like Business, Politics, Technology and Sports.

Allows users to search for any keyword to read articles of their choice, bookmark articles for future reading and share articles via Facebook, Twitter or email. 

Created using ReactJS for the frontend and NodeJS for the backend.

The application is divided into two folders: **Frontend** and **Backend** where each folder has to be deployed to separate domains. One way is to deploy each folder into cloud based domains like AWS, Azure and Google Cloud Platform. The steps to deploy onto each cloud platform are mentioned in the respective PDF files present in this folder.

# Steps to launch application
1. Once the **Backend** folder has been deployed into a domain, this domain has to be added to each of the following component JS files of the React application inside the **Frontend/src** folder.
   - Business.js 
   - GuardianDetailed.js
   - NytDetailed.js
   - Politics.js
   - Search.js
   - Sports.js
   - Technology.js
   - World.js 

   Inside each JS file exists two functions: **callGuardian** and **callNyt**. In each function you will see URLs in the fetch function replace **https://csci571-     node.azurewebsites.net** in the URL to the domain created for the backend

2. Once the backend URLs have been changed, the Bing Search API key has to be obtained in order to use the search functionality of the application. Follow the steps mentioned in the pdf file **HW6.pdf** under the  section to obtain the API key. Then inside the file **Frontend/src/SearchBar.js** , inside the **LoadOptions** function, replace **Ocp-Apim-Subscription-Key** value with your API key.

3. To launch web the application, just visit the domain used to deploy the frontend in your preferred web browser.

