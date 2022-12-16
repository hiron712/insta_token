var request = require("request");
require("dotenv").config();

let access_token1 = process.env.access_token1;
let access_token2;
let access_token3;

let client_id = process.env.client_id;
let client_secret = process.env.client_secret;

let facebook_page_ID = process.env.facebook_page_ID;

let url1 = "";
let url2 = "";
let url3 = "";
let url4 = "";

let ID = "";

function init() {
  url1 += "https://graph.facebook.com/v6.0/oauth/access_token";
  url1 += "?grant_type=fb_exchange_token";
  url1 += "&client_id=" + client_id;
  url1 += "&client_secret=" + client_secret;
  url1 += `&fb_exchange_token=${access_token1}`;

  request.get(url1, function (err, res, body) {
    if (err) {
      console.log("Error: " + err.message);
      return;
    }

    let json = JSON.parse(body);

    if (json.error) {
      console.log(json);
    } else {
      access_token2 = JSON.parse(body).access_token;
      secondToken();
    }
  });
}

function secondToken() {
  url2 += "https://graph.facebook.com/v6.0/me";
  url2 += "?access_token=" + access_token2;

  request.get(url2, function (err, res, body) {
    if (err) {
      console.log("Error: " + err.message);
      return;
    }
    ID = JSON.parse(body).id;
    thirdToken();
  });
}
function thirdToken() {
  url3 += "https://graph.facebook.com/v6.0/" + ID;
  url3 += "/accounts?access_token=" + access_token2;

  request.get(url3, function (err, res, body) {
    if (err) {
      console.log("Error: " + err.message);
      return;
    }
    let datas = JSON.parse(body).data;

    const list = datas.find((item) => {
      return item.id === facebook_page_ID;
    });

    access_token3 = list.access_token;

    fourthToken();
  });
}

function fourthToken() {
  url4 += "https://graph.facebook.com/v6.0/me";
  url4 += "?access_token=" + access_token3;
  url4 +=
    "&debug=all&fields=instagram_business_account&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors";

  request.get(url4, function (err, res, body) {
    if (err) {
      console.log("Error: " + err.message);
      return;
    }
    let datas = JSON.parse(body);

    console.log(datas.instagram_business_account.id);
    console.log(access_token3);
  });
}

///////////////////////
init();
