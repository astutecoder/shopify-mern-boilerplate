# Welcome!

Thank you for choosing this boilerplate! Follow these simple steps to set up the app for your demo store.

### Prerequisites

Before starting, make sure you have the following:

- Node.js installed
- Shopify Partner account

### Installation

_Client & Server_

1. Clone this repository to your local machine.
2. Create a `.env` file and populate it with keys from the `.env.sample` file.
3. Set your backend server's domain as server env `HOST` value

### Getting Started

1. Run the client and server using the following command:

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
- Don't forget to re-run backend server after updating `HOST` server env value.
