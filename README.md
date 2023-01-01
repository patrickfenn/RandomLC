# RandomLC
**Generate a random leetcode with constraints.**
* Choose difficulty: Easy/Medium/Hard.
* Specify minimum acceptance.
* Choose topics of problems.
* All parameters are <u>optional</u>.

**Frontend**: React

**Backend:** Node.js w/ Mysql

**Utilities:**
* Leetcode website scraper
  * Uses Selenium webdriver to scrape every LC problem.
  * Webdriver is automatically downloaded (chrome).
  * Saves all tags, unique problems, tagged problems as json.

**Setup for Scraper:**

1. Install Python 3.9+
2. Install with pip:
   1. selenium
   2. webdriver-manager
   3. requests
3. Ensure you have a chrome binary installed and accessible by path.
4. Run with: ```python3 Manager.py```

It takes roughly 10 minutes to scrape every problem. This is because selenium must wait for the problem table to load on each tag problem page. 

\
Example output:
```
Starting.
Obtaining tags...
Scraping problems for tag: array
Job completed. 1/71 -> Total problems scraped: 1262
Scraping problems for tag: string
Job completed. 2/71 -> Total problems scraped: 1708
Scraping problems for tag: hash-table
Job completed. 3/71 -> Total problems scraped: 1765
Scraping problems for tag: dynamic-programming
```

[DEMO](https://patrickfenn.github.io/RandomLC/)
* Due to a bug with express.js, https, and CORS. Mixed content must be enabled. To do so, click on the lock on the address bar and disable protection. 

https://stackoverflow.com/questions/74555948/https-server-cors-issue?newreg=59796574c4014da3a60621cb5cdfb05e
