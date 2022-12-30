class LeetcodeProblem:
    def __init__(self, title: str, acceptance: str, difficulty: str, link: str):
        self.dict = {}
        self.dict["title"] = title
        self.dict["acceptance"] = acceptance
        self.dict["difficulty"] = difficulty
        self.dict["link"] = link

    def getTitle(self) -> str:
        return self.dict["title"]

    def getDict(self) -> str:
        return self.dict