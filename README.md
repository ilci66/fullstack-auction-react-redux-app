* A small express, node.js, mongodb and react-redux app I'm making to practice redux with react and also authentication using jwt.
* The app is not complex enough to require redux but still large enough to practise using redux with react
* For styling I used css, bootstrap and react-bootstrap. I could just stick to one but I want to be comfortable using multiple methods.
* Items created by the users will be deleted in 7 days if nobody bids on them, bidding on the items resets countdown, 7 days after the last bid the payment option comes up for the user in their profile and in the same section the user can view the situation of the items they chose to bid on.
* The user will be able to edit the item if as long as no bidding has occured, to make it more appealing or maybe just to correct a typo.

# Auction App

## Project Description
A Website where people can auction off items. The items that do not receive bids get deleted, Owner of <br>
an item can view the current sitation with their item, highest bids, acution time etc. If a user wants<br>
to buy an item directly without having to wait the necessary week, they can directly pay the buyout price<br>
an acquire the item. The user will be able to edit the item if as long as no bidding has occured, to make<br>
it more appealing or maybe just to correct a typo.

In the backend I wrote a simple function that checks if an item is a wekk old. If the item is a week old<br>
then it's sent to the highest bidders profile page for payment. Payments are handled through stripe.js 

### Motivation
My main motivation was to get comfortable using React-Redux, authentication with json web tokens, and<br>
understand the payment process

### Technologies Used:
*   **HTML, CSS, Javascript**
*   **React-Redux** 
*   **MongoDB Atlas**, for saving user and item information 
*   **cookies, crypto, bcrypt and jwt**, for handling subscriptions
*   **Bootstrap, react-bootstrap**, for styling
*   **stripe.js**, for payments

### Challanges and Improvements
*   The app is not complex enough to require redux but still large enough to practise using redux with react
*   I had a harder time with jwt authentication project than I would like to admit but now I can say I <br>
am comfortable using it in my projects
*   The function I wrote in the backend runs every minute to keep the backend light but I'm aware that <br>it should be so much shorter than that to prevent abuse of the system


### How to Install and Run the Project
1.  Clone the git repository
2.  Creation of the public and private keys for signing and checking the keys will be necessary using jwt
3.  Run "npm install" both in the root and in the backend 
 
4.  Add your mongoDB Uri in .env.local file:
*   MONGODB_URI
*   MONGODB   


#### Feel free to use the code however you like 