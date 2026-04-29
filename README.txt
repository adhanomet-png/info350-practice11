Platform Used: Render

For Practice 12, I updated my Node.js/Express application to use an environment variable. I modified my server.js file by creating a GREETING variable using process.env.GREETING. I also added an /api/message route that returns the greeting as a JSON response.

In Render, I added an environment variable with the key GREETING and the value Hello from Render! After saving the environment variable, I redeployed the application so the updated setting would be used by the live app.

To verify the update, I opened my deployed application and went to /api/message. The page returned a JSON response showing the greeting from the environment variable. I included a screenshot of this live JSON response as proof of deployment.

I did not run into any major issues. I just had to make sure the environment variable name in Render matched the variable name used in my server.js file.
