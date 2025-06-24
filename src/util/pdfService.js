const puppeteer = require('puppeteer');
const generatePDFHtml = require('../util/pdfTemplate');

async function exportUserFinancialReport(user, contas, cartoes) {
  const html = generatePDFHtml({ user, contas, cartoes });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return pdfBuffer;
}

module.exports = { exportUserFinancialReport };