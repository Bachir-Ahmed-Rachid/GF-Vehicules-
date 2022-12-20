class Vehcile:
    #Parameters initialization
    def __init__(self, index, capacity,cost,Type,routing,items_packed):
        self.index = index
        self.capacity = capacity
        self.routing = routing
        self.cost=cost
        self.Type=Type
        self.items_packed=items_packed
        
    #getter and setter
    def get_index(self):
       return self.index

    def set_index(self, new_index):
       self.index  =  new_index
################################################################
    def get_capacity(self):
        return self.capacity

    def set_capacity(self, new_capacity):
        self.capacity  =  new_capacity
################################################################
        
    def get_routing(self):
        return self.routing

    def set_routing(self, new_routing):
        self.routing  =  new_routing
################################################################
        
    def get_cost(self):
        return self.cost

    def set_cost(self, new_cost):
        self.cost  =  new_cost
################################################################
                
    def get_Type(self):
        return self.Type

    def set_Type(self, new_Type):
         self.Type  =  new_Type
         
################################################################
                
    def get_items_packed(self):
        return self.items_packed

    def set_items_packed(self, new_items_packed):
         self.items_packed  =  new_items_packed
         
################################################################
                
