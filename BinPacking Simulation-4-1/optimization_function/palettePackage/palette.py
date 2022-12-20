class Palette:
    #Parameters initialization
    def __init__(self, index, status,adress):
        self.index = index
        self.status = status
        self.adress = adress
    
    #getter and setter
    def get_index(self):
       return self.index

    def set_index(self, new_index):
       self.index  =  new_index
################################################################
    def get_status(self):
        return self.status

    def set_status(self, new_status):
        self.status  =  new_status
################################################################
        
    def get_adress(self):
        return self.adress

    def set_adress(self, new_adress):
        self.adress  =  new_adress