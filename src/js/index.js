// import * as $ from 'jquery';
// import Post from './Post';
import './../css/style.css';
import './../scss/style.scss';
// import json from './../data/server-data';
// import someLogo from './../images/arrow_all.png';
// import xml from './../data/data.xml';
// import csv from './../data/data.csv';

// const post = new Post('Some title', someLogo);
// $('h1').html(post.toString());

async function start() {
  await Promise.resolve('async is working');
}

start().then(console.log());

// console.log(post.toString());
// console.log(json);
// console.log(xml);
// console.log(csv);
