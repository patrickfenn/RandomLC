from json import dumps
from TagScraper import TagScraper
from ProblemScraper import ProblemScraper
from PremiumScraper import PremiumScraper
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options as ChromeOptions

#Wait time in sec for headless browser to wait for page to load.
#Increasing too low will result in more failures.
MAX_WAIT_TIME = 25

class Manager:
    def __init__(self):
        self.leetcodeProblems = []
        self.tagScraper = TagScraper()
        self.problemScraper = ProblemScraper()
        self.premiumScraper = PremiumScraper()

    def parseTags(self,tags: list[str]) -> list[str]:
        for i in range(len(tags)):
            if tags[i] == "Heap (Priority Queue)":
                tags[i] = "heap-priority-queue"
                continue
            tags[i] = tags[i].lower()
            tags[i] = tags[i].replace(' ', '-')
        return tags

    def scrape(self) -> None:
        print('-'*75, "\nStarting.")
        output_all_uniques = []
        output_tags = {}
        seen = set()
        options = ChromeOptions()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
        print("Obtaining tags...")
        tags = self.tagScraper.get(driver)
        if tags == []:
            print("TagScraper failed.")
            return
        tags = self.parseTags(tags)
        for i in range(len(tags)):
            url = "https://leetcode.com/tag/" + tags[i] + '/'
            print("Scraping problems for tag: {}".format(tags[i]))
            problems = self.problemScraper.get(driver, MAX_WAIT_TIME, url)
            if problems == []:
                print("Scraping for tag failed: {}, {}/{}".format(tags[i], i+1, len(tags)),'\n')
            else:
                for problem in problems:
                    output_tags[tags[i]] = output_tags.get(tags[i],[]) + [problem.getDict()]
                    problemHash = hash(problem.getTitle())
                    if problemHash not in seen:
                        output_all_uniques.append(problem.getDict())
                        seen.add(problemHash)
                print("Job completed. {}/{} -> Total problems scraped: {}".format(i+1, len(tags),len(seen)))
        driver.quit()
        print("Scraping premium problems...")
        premiumProblems = self.premiumScraper.get()
        print("Finished scraping premium problems.")
        print("Writing all unique problems to file: ../backend/problems_unique.json ...")
        file = open("../backend/problems_unique.json", 'w+')
        file.write(dumps({"problems": output_all_uniques}))
        file.close()
        print("Writing all problems categorized by tags to file: ../backend/problems_tags.json ...")
        file = open("../backend/problems_tags.json", 'w+')
        file.write(dumps({"problems": output_tags}))
        file.close()
        print("Writing tags to file: ../backend/tags.txt")
        file = open("../backend/tags.txt", 'w+')
        for tag in tags:
            file.write("{}\n".format(tag))
        file.close()
        print("Writing premium problems to file ../backend/problems_premium.txt")
        file = open("../backend/problems_premium.txt", 'w+')
        for problem in premiumProblems:
            file.write("{}\n".format(problem))
        file.close()
        print("Finished.\n",'-'*75)

def main():
    man = Manager()
    man.scrape()

if __name__ == '__main__':
    main()