import requests as req
import json
class PremiumScraper:
    def get(self) -> list[str]:
        url = "https://leetcode.com/api/problems/all/"
        json_dict = json.loads(req.get(url).text)
        stats = json_dict['stat_status_pairs']
        paid_problems = []
        for stat in stats:
            inner_stat = stat["stat"]
            paid = stat["paid_only"]
            if paid == True:
                paid_problems.append(inner_stat["question__title"])
        return paid_problems
