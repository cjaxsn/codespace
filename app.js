import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer';
import fs from 'fs';

console.log("Node script");

var arrURLs = ['https://fightden.ca',
'https://fightden.ca/about'
]

//lighthouseAudit("https://jax.tech");

function discoverFonts(arrURLs)
{
	console.log("Discover Fonts");
	//fightden.ca
	//"Font Awesome 6 Brands": "U+F16D"
	//"Font Awesome 6 Pro": "U+F060,U+F061,U+F073,U+F095,U+F10D,U+F10E,U+F3C5,U+F438,U+F675"
	//U+F060
	/*fa-solid*/
// .fa-boxing-glove { --fa: "\f438"; }
// .fa-calendar-days { --fa: "\f073"; }
// .fa-location-dot { --fa: "\f3c5"; }
// .fa-megaphone { --fa: "\f675"; }
// .fa-phone { --fa: "\f095"; }
// .fa-quote-left { --fa: "\f10d"; }
// .fa-quote-right { --fa: "\f10e"; }

	for (const url of arrURLs)
	{
		const command = `npx glyphhanger ${url} --json`;
		//const command = `npx glyphhanger ${url} --family='Font Awesome 7 Pro'`;
		console.log(command);

		try
		{
			console.log('Crawling for used glyphs');
			execSync(command, { stdio: 'inherit' });
			console.log('Font identification completed successfully!');
		} catch (error)
		{
			console.error('An error occured during font identifaction:', error.message);
			process.exit(1);
		}
	}
}