from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


#Get names from leetcode tag section.
class TagScraper: 
    def get(self,driver: webdriver) -> str:
        url = "https://leetcode.com/problemset/all/"
        try:
            driver.get(url)
        except:
            return []
        #Wait for JS to load.
        WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/div[1]/div[4]/div[1]")))
        #Click expand button for all topics.
        driver.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/div[1]/div[4]/div[2]/span[2]").click()
        topics = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/div[1]/div[4]/div[1]")
        links = topics.find_elements(By.TAG_NAME, 'a')
        results = []
        for link in links:
            results.append(link.text.split('\n')[0])
        return results