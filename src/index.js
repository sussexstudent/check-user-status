const config = require('../config.json');
const chromeLauncher = require('chrome-launcher');
const { Chromeless } = require('chromeless')

async function run() {
  const chromeless = new Chromeless({
  
  });

  const host = config.host;

  const cardId = await chromeless
    .goto(`${host}/msl/Login.aspx`)
    .type(config.username, '#txtUserName')
    .type(config.password, '#txtPassword')
    .click('#btnLogin')
    .wait('#form1 > div.content-wrapper > div > div > div > h1')    
    .goto(`${host}/msl/people/personsearch.aspx`)
    .type(process.argv[2], '#ContentPlaceHolder1_ctlSearchSelectPerson_TextBox1')
    .click('#ContentPlaceHolder1_ctlSearchSelectPerson_Button1')    
    .wait('#form1 > div.content-wrapper > div > div > div > div.content > div.panel.panel-default > div > h1')
    .click('#ContentPlaceHolder1_ctlPersonNavigation_Menu1 > ul > li:nth-child(1) > a')
    .wait('#ContentPlaceHolder1_ctlPersonDetails_txtCardNumber')
    .evaluate(() => {
      return document.querySelector('#ContentPlaceHolder1_ctlPersonDetails_txtCardNumber').value
    });

  const dataStatus = await chromeless
    .goto(`${host}/msl/import/default.aspx`)
    .type(cardId, '#ContentPlaceHolder1_ccs1_TextBox1')
    .click('#ContentPlaceHolder1_ccs1_Button1')
    .wait('#ContentPlaceHolder1_ccs1_GridView1 > tbody > tr:nth-child(7) > td:nth-child(3) > img')
    .evaluate(() => {
      const getFor = (number) => {
        const node = document.querySelector(`#ContentPlaceHolder1_ccs1_GridView1 > tbody > tr:nth-child(${number}) > td:nth-child(3) > img`);
        console.log(node);
        return node.src.endsWith('inc/1.png');
      }
      
      return {
        cardInUniData: getFor(1),
        firstTime: getFor(2),
        lastTime: getFor(3),
        linkedToPerson: getFor(4),
        clearedImport: getFor(5),
        clearedDuplicates: getFor(6),
        clearedBlockedList: getFor(7),
      };
    });

  console.log({
    cardId: cardId,
    status: dataStatus,
  });

  await chromeless.end()
}

run().catch(console.error.bind(console))