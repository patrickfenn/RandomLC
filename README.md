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
3. Ensure you have a chrome binary installed and accessible by path.

It takes roughly 10 minutes to scrape every problem. This is because selenium must wait for the problem table to load on each tag problem page. 