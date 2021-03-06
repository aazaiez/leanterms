const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');
const Contract = require('../models/contract');
const mongoose = require('mongoose');
const UsersController = require('../controllers/UsersController');

const users = [
  { username: 'demo', email: 'demo', password: 'password' },
  { username: 'areej', email: 'areej@gmail.com', password: 'password' },
  { username: 'akram', email: 'akram@gmail.com', password: 'password' },
  { username: 'ali', email: 'ali@gmail.com', password: 'password' },
  { username: 'markov', email: 'markov@gmail.com', password: 'password' },
  { username: 'sennacy', email: 'sennacy@gmail.com', password: 'password' }
];

const contracts = [
  {
    leaseType: 'Month-to-Month',
    cancelNotice: 10,
    propertyType: 'House',
    propertyStreetAddress: '7218 Battery St',
    propertyCity: 'San Francisco',
    propertyState: 'CA',
    propertyZipCode: '91234',
    furnished: false,
    parkingAvailable: true,
    firstMonthRequired: true,
    depositAmt: 1000,
    rentAmt: 1500,
    lateFee: true,
    lateFeeAmt: 500,
    paymentMethod: 'Credit Card',
    utilityBillsIncluded: false,
    petsAllowed: 0,
    petsTotal: 0,
    singlePetFee: 50,
    landlordId: '5a9358aa541334fc5c040ce4',
    tenantId: '5a935225af6aa5fa37d17ac8'
  }
];

const seedContracts = () => {
  for (let i = 0; i < contracts.length; i++) {
    let contractToAdd = contracts[i];
    Contract.findOne(
      {
        specialID: contractToAdd.specialID
      },
      (err, foundContract) => {
        if (err) throw err;
        if (!foundContract) {
          let contract = new Contract(contractToAdd);
          console.log('seeding contracts');
          contract.save();
        }
      }
    );
    let contract = new Contract(contractToAdd);
    contract.save();
  }
};

const seedUsers = () => {
  for (let i = 0; i < users.length; i++) {
    let username = users[i].username;
    let email = users[i].email;
    let password = users[i].password;
    User.findOne({ username: username, email: email }, (error, foundUser) => {
      if (error) throw error;
      if (!foundUser) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) throw err;
          let user = new User({
            username: username,
            email: email,
            password: hash
          });
          user.save();
        });
      }
    });
  }
};

module.exports = {
  seedUsers,
  seedContracts
};
