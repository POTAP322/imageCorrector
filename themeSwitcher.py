class themeSwitcher:
    def __init__(self):
        self.themes = {'light':'css/light', 'dark':'css/dark'}
        self.curTheme = 'light'

    def changeTheme(self,theme):
        if theme in self.curTheme:
            self.curTheme = theme
