import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer';
import fs from 'fs';

console.log("Hello World");

//lighthouseAudit("https://jax.tech");

async function lighthouseAudit(strURL)
{
	console.log("Starting Lighthouse audit");
	const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
	const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
	const runnerResult = await lighthouse(strURL, options);

	// `.report` is the HTML report as a string
	const reportHtml = runnerResult.report;
	fs.writeFileSync('lhreport.html', reportHtml);

	// `.lhr` is the Lighthouse Result as a JS object
	console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
	console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

	chrome.kill();
}

async function runAudit() {
  // 1. Launch Puppeteer in headless mode
  console.log("launching puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--remote-debugging-port=9222'] // Necessary for Lighthouse to connect
  });
  console.log("Browser obj:" + browser);

  // 2. Run Lighthouse targeting Puppeteer's browser port
  const options = {
    logLevel: 'info',
    output: 'html',
    port: 9222
  };

  const runnerResult = await lighthouse('https://example.com', options);

  // 3. Save the report and close the browser cleanly
  fs.writeFileSync('report.html', runnerResult.report);
  await browser.close();
  console.log('Audit complete! Report saved to report.html');
}

runAudit();