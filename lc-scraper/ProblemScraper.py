from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from LeetcodeProblem import LeetcodeProblem

#Get links from leetcode problem table, targeting the 
#tag page because all problems are stored in one page.
class ProblemScraper: 
    def get(self, driver: webdriver, MAX_WAIT_TIME: int, url: str) -> list[LeetcodeProblem]:
        #Try block in case tag is not valid or page doesn't load in time.
        try:
            driver.get(url)
            #Wait for JS to load.
            WebDriverWait(driver,MAX_WAIT_TIME).until(EC.visibility_of_element_located((By.XPATH, "/html/body/div[2]/div/div/div/div[2]/div/div/div/table/tbody")))
        except Exception as e:
            return []
        else:
            rows = driver.find_element(By.XPATH, "/html/body/div[2]/div/div/div/div[2]/div/div/div/table/tbody").find_elements(By.TAG_NAME,"tr")
            results = []
            for row in rows:
                lines = row.text.split('\n')
                title = lines[1]
                acceptance, difficulty = lines[2].split(' ')
                link = row.find_element(By.TAG_NAME,'a').get_attribute("href")
                results.append(LeetcodeProblem(title,acceptance,difficulty,link))
        return results