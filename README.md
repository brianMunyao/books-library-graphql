# Book Library With Apollo GraphQL

A simple book library

## Getting Started

1. Clone the backend repository from GitHub:

   ```bash
   git clone https://github.com/brianMunyao/books-library-graphql.git
   ```

2. Navigate to the project directory:

    ```bash
    cd books-library-graphql
    ```

### Setting up the Backend

1. Move to backend folder using `cd backend`

2. Install dependencies using `npm install`.

3. Copy contents `.env.example` to `.env`, and change `DATABASE_URL` to your postgres db instance.

4. Run db migrations using `npm run migrations`.

5. Start the backend server using `npm run dev`.

### Setting up the Frontend

1. Move to frontend folder using `cd client`

2. Install dependencies using `npm install`.

3. Copy contents `.env.example` to `.env`, and change `VITE_API_URL` to the url where your backend is running on.

4. Start the backend server using `npm run dev`.

### Deployment

Currently the project is deployed on multiple environments:

- Frontend on [Vercel](https://books-library-graphql.vercel.app/)

- Backend on [Cyclic](https://gorgeous-erin-stockings.cyclic.cloud/graphql)

- Database on ElephantSQL

### Contributing

Contributions are welcome🙂
