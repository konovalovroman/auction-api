# Auction API


<p>This is a test assignment for implementing auction API</p>

## Installation and running
Clone the repository and install dependencies

```
git clone https://github.com/konovalovroman/auction-api.git
cd auction-api
npm install
```

### Configuration
Create and fill a .env file with environment variables

```
PORT=

### DATABESE
DB_NAME=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
```

Then just run application

```
npm start
```
Now you can access to API with url:
[http://http://localhost:API_PORT](http://localhost:API_PORT)

## Using application
### Create user endpoint:
POST [http://http://localhost:API_PORT/users](http://localhost:API_PORT)
<br>
Body: {"username": "roman"}

### Get all users endpoint:
GET [http://http://localhost:API_PORT/users](http://localhost:API_PORT)

### Create item endpoint:
POST [http://http://localhost:API_PORT/items](http://localhost:API_PORT)
<br>
Body: {
    "name": "Item name",
    "price": 100,
    "auctionStartDate": "2024-03-22T07:00:00Z",
    "auctionEndDate": "2024-03-23T07:00:00Z"
}
<br>
Headers: {
	"X-User-ID": 1
}

### Get all items endpoint:
GET [http://http://localhost:API_PORT/items](http://localhost:API_PORT)


### Create bid endpoint:
POST [http://http://localhost:API_PORT/bids](http://localhost:API_PORT)
<br>
Body: {
    "itemId": 1,
    "amount": 150
}
<br>
Headers: {
	"X-User-ID": 1
}
