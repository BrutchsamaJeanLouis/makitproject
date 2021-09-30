// import { Database } from 'sqlite3';
// const db = new Database('./db/makit.db');
const Fund = require('../models/fund');
const User = require('../models/user');
const Like = require('../models/like');
const Location = require('../models/location');
const Media = require('../models/media');
const Project = require('../models/project');

function seedDB() {
  const user1 = User.build({ 
    username: 'user1',
    password: '$2b$10$cqpR.FhqULDRtHEA0NHmq.PDcKP2YpslHtDV9hEjp5/cc8dwTu1Fa',
    email: 'mail1@mail.com',
    company: 'corp',
    salt:10,
  }).save()
  const project1 = Project.build({
    name: 'project1',
    description: " this is the 1 created project"
  }).save()
  const project6 = Project.build({
    name: 'project6',
    description: " this is the 6 created project"
  }).save()
  const project7 = Project.build({
    name: 'project7',
    description: " this is the 7 created project"
  }).save()
  const project8 = Project.build({
    name: 'project8',
    description: " this is the 8 created project"
  }).save()
  const like = Like.build({
    userID: 2,
    projectID: 1
  }).save()
  const like2 = Like.build({
    userID: 3,
    projectID: 1
  }).save()
  const fund1 = Fund.build({
    userID: 1,
    projectID:1
  }).save()
  const fund2 = Fund.build({
    userID: 1,
    projectID: 6
  }).save()
  const fund3 = Fund.build({
    userID: 1,
    projectID: 7
  }).save()
  const fund4 = Fund.build({
    userID: 1,
    projectID: 8
  }).save()



  const user2 = User.build({ 
    username: 'user2',
    password: '$2b$10$cqpR.FhqULDRtHEA0NHmq.PDcKP2YpslHtDV9hEjp5/cc8dwTu1Fa',
    email: 'mail2@mail.com',
    company: 'corp',
    salt: 10
  }).save()
  const project2 = Project.build({
    name: 'project2',
    description: " this is the 2 created project"
  }).save()



  const user3 = User.build({ 
    username: 'user3',
    password: '$2b$10$cqpR.FhqULDRtHEA0NHmq.PDcKP2YpslHtDV9hEjp5/cc8dwTu1Fa',
    email: 'mail3@mail.com',
    company: 'corp',
    salt: 10
  }).save()
  const project3 = Project.build({
    name: 'project3',
    description: " this is the 3 created project"
  }).save()



  const user4 = User.build({ 
    username: 'user4',
    password: '$2b$10$cqpR.FhqULDRtHEA0NHmq.PDcKP2YpslHtDV9hEjp5/cc8dwTu1Fa',
    email: 'mail4@mail.com',
    company: 'corp',
    salt: 10,
  }).save()
  const project4 = Project.build({
    name: 'project4',
    description: " this is the 4 created project"
  }).save()


  const user5 = User.build({ 
    username: 'user5',
    password: '$2b$10$cqpR.FhqULDRtHEA0NHmq.PDcKP2YpslHtDV9hEjp5/cc8dwTu1Fa',
    email: 'mail5@mail.com',
    company: 'corp',
    salt: 10,
  }).save()
  const project5 = Project.build({
    name: 'project5',
    description: " this is the 5 created project"
  }).save()
  const project9 = Project.build({
    name: 'project9',
    description: " this is the 9 created project"
  }).save()
  const project10 = Project.build({
    name: 'project10',
    description: " this is the 10 created project"
  }).save()

}

// const music_data = [{artist : "Saxon", album: "Wheels of Steel", popularity: 20},
// {artist : "Iron Maiden", album: "Iron Maiden", popularity: 17},
// {artist : "Judas Priest", album: "Live In Concert", popularity: 20},
// {artist : "Saxon", album: "Into the Labyrinth", popularity: 23},
// {artist : "Runrig", album: "Once In A Lifetime", popularity: 14},
//  {artist : "Simple Minds", album: "Got Live If You Want It", popularity: 4}
//  ];
 
// try{
//    db.exec("create table music (key INTEGER PRIMARY KEY, artist TEXT, album TEXT, popularity INTEGER);");
//  }
//  catch(e){
//    print("Error message:" + e.name + " type:" + e.message);
//  }
 
//  for (var x = 0; x < music_data.length; x ++) {
//    db_str = "insert into music(artist, album, popularity) values('" + music_data[x].artist + "', '" + music_data[x].album + "', " + music_data[x].popularity + ");";
//    db.exec(db_str);
//  }
//  db.close();
module.exports = seedDB