const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios')

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
const getBooks = async () => {
    await public_users.get('/', function (req, res) {
        res.send(JSON.stringify(books, null, 4));
    });
}
getBooks()


// Get book details based on ISBN
const getDetails = async () => {
    await public_users.get('/isbn/:isbn', function (req, res) {
        let isbn = req.params.isbn;
        res.send(books[isbn])
    });
}
getDetails()


// Get book details based on author
const getAuthor = async () => {
    await public_users.get('/author/:author', function (req, res) {
        let author = req.params.author;
        if (author === books[i].author) {
            res.send(books[i])
        }
    });
}
getAuthor()

// Get all books based on title
const getTitle = async () => {
    await public_users.get('/title/:title', function (req, res) {
        let title = req.params.title;
        if (title === books[i].title) {
            res.send(books[i])
        }
    });
}
getTitle()


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
