const puppeteer = require("puppeteer");
const { URL, account, 当前电脑Chrome的地址 } = require("d:/privateConfigs.js");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
 
async function proxyLocalFile(req, matchFilePath) {
	let isContinue = true;
	let body = "";
	console.log(req._resourceType);

	const handler = (type => {
		const type_map = {
			document: {
				contentType: "text/html",
				reader() {
					this.targetFilePath = path.resolve(
						__dirname,
						`dist/${matchFilePath}`
					);
					return fs.readFileSync(this.targetFilePath, "utf-8");
				}
			},
			script: {
				contentType: "application/javascript",
				reader() {
					this.targetFilePath = path.resolve(
						__dirname,
						`dist/${matchFilePath}`
					);

					return fs.readFileSync(this.targetFilePath, "utf-8");
				}
			},
			stylesheet: {
				contentType: "text/css",
				reader() {
					this.targetFilePath = path.resolve(
						__dirname,
						`dist/${matchFilePath}`
					);
					return fs.readFileSync(this.targetFilePath, "utf-8");
				}
			},
			image: {
				contentType: "text/plain",
				reader() {
					this.targetFilePath = path.resolve(
						__dirname,
						`dist/${matchFilePath}`
					);
					return Buffer.from(fs.readFileSync(this.targetFilePath));
				}
			},
			other: {
				contentType: "text/plain",
				reader() {
					this.targetFilePath = path.resolve(
						__dirname,
						`dist/${matchFilePath}`
					);
					return Buffer.from(fs.readFileSync(this.targetFilePath));
				}
			}
		};
		return (
			type_map[type] || {
				reader() {
					debugger;
					this.targetFilePath = matchFilePath;
					return false;
				}
			}
		);
	})(req._resourceType);

	const log = [];
	try {
		body = handler.reader();
		if (body) {
			await req.respond({
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": "*"
				},
				contentType: handler.contentType,
				body
			});
			isContinue = false;
		} else {
			console.log("🚀:", "miss", handler.targetFilePath);
		}
	} catch (error) {
		console.log("🚀:", "error", error);
	}
	return isContinue;
}

async function main(currentSiteName) {
	const browser = await puppeteer.launch({
		headless: false,
		ignoreHTTPSErrors: true,
		executablePath: path.resolve(当前电脑Chrome的地址),
		args: [`--window-size=1920,1080`],
		devtools: true,
		defaultViewport: {
			width: 1366,
			height: 768
		}
	});
	const page = (await browser.pages())[0];
	await page.setRequestInterception(true);

	page.on("request", async req => {
		console.log(req._url, req);
		const matchedArray = String(req._url).match(/(.*)/);
		/* document，stylesheet，image，media，font，script，texttrack，xhr，fetch，eventsource，websocket，manifest，other */
		const isContinue = await (async targetFilePath => {
			if (targetFilePath) {
				return await proxyLocalFile(req, targetFilePath);
			} else {
				return true;
			}
		})(matchedArray && matchedArray[1]);

		if (isContinue) {
			await req.continue();
		}
	});

	global.CurrentSiteName = currentSiteName;
	await page.goto(URL[currentSiteName]);
	await page.waitForSelector(`#username`);
	page.type("#username", account[currentSiteName].username);
	await page.waitForTimeout(500);
	page.type("#password", account[currentSiteName].userpwd);
	await page.waitForTimeout(500);
	page.click(`#submitButton`);
}

main("demo");
