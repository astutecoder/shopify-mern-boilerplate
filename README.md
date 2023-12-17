# Welcome!

Thank you for choosing this boilerplate! Follow these simple steps to set up the app for your demo store.

### Prerequisites

This repo has a docker-compose.yml file. If you wish to use docker you should have installed `Docker` in your machine. Otherwise you can skip docker and make sure you have the following:

- Node.js installed
- Shopify Partner account

### Installation

- Clone this repository to your local machine.
- #### Using docker:

  - Server:

    - Create a tunnel for port `3434`
    - Rename `.env.sample` to `.env`. Remove _DB_URL_ and _PORT_. Provide the values for other keys.

  - Client:
    - Create a tunnel for port `5001`
    - Rename `.env.sample` to `.env`. Remove _VITE_SHOPIFY_ADMIN_URL_. Provide the values for other keys. For _VITE_SERVER_URL_ use server's tunnel url.

- #### Without docker:
  - Create a `.env` file and populate it with keys from the `.env.sample` file.
  - Set your backend server's domain as server env `HOST` value

### Getting Started

1. If you are using **Docker**, then run

   ```
   docker-compose up --build
   ```

   otherwise you can run the following code from root directory:

   ```
   yarn run dev
   ```

2. Open your Shopify Partner account and navigate to the App setup section.

3. Add the App URL, using your client project's link, as the main URL.

4. Set the redirection URLs

   - `{CLIENT_PROJECT_HOST}/authenticate`

5. Install the app in your demo store.

### Note:

- Kindly remove shop records after uninstalling the app because it is possible that your webhooks are not working when developing in local environment.
- If the tunnels are expired/off, re-open them. Update all references. For docker, re-run docker containers.
