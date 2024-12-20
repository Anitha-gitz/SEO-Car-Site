# SEO-Car-Site

Introduction:
  Implementing SEO for a car website in React involves enhancing search functionality and incorporating feature-based filters to improve user experience and search engine visibility. Start by creating a search bar that dynamically filters cars based on user queries like model, color, fuel type, airbags, made in, brand or price. Optimize the filters using components like dropdowns, selection list for attributes like price range or engine type, ensuring they are responsive and accessible. Create a new Atlas Search Index. Use the JSON editor to define the fields you want to index, such as { "mappings": { "dynamic": false, "fields": { "color": { "type": "string" }, "engine": { "type": "string" }, "price": { "type": "number" }, "seats": { "type": "number" } } } }, $search aggregation stage to match user queries against the indexed fields. The results are then filtered and displayed dynamically in the React frontend, ensuring a seamless, fast, and SEO-optimized user experience.. Enhance page load speed by lazy-loading images and using lightweight assets. Finally, implement meta tags and descriptive URLs for individual car pages to boost their ranking on search engines. This approach ensures a user-friendly experience while making the website more discoverable online.


Required Packages to install in powershell:

In front-end
npx create-react-app front-end
npm install web-vitals axios boostrap react-icons


In Express(backend)
npm init -y
npm install express mongoose dotenv nodemon cors axios compromise body-parser path 



SEO-Car-Site Structure:

|__Express(backend)
  |__uploads(folder)
  |__Server.js
  |__.env(connection to mongoDB Atlas)
|__front-end
  |__public
    |__index.html
  |__src
    |__images(folder)
    |__Car.js
    |__StyleCar.css
    |__Footer.js
    |__Footer.css
  |__package.json

MongoDB Atlas to Create DB and collection:

The attached JSON to be insert as document in mongoDB Collection

Database name : Demo_DB
Collection name : demos_tb



