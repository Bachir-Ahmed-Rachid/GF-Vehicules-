class Customer:
    #Parameters initialization
    def __init__(self, adress, dilevery,pickup):
        self.adress = adress
        self.dilevery = dilevery
        self.pickup = pickup
    
    #getter and setter
    def get_adress(self):
       return self.adress

    def set_adress(self, new_adress):
       self.adress  =  new_adress
################################################################
    def get_dilevery(self):
        return self.dilevery

    def set_dilevery(self, new_dilevery):
        self.dilevery  =  new_dilevery
################################################################
        
    def get_pickup(self):
        return self.pickup

    def set_pickup(self, new_pickup):
        self.pickup  =  new_pickup