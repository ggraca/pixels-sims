class WCMen extends Zone{
  constructor(){
    super([new ActivitySeat({x: 57, y: 27}, 10, null)],[new Seat({x: 52, y: 27})])
  }
}
class WCWomen extends Zone{
  constructor(){
    super([new ActivitySeat({x: 57, y: 20}, 10, null)],[new Seat({x: 52, y: 20})])
  }
}

class Table extends Zone{
  constructor(table_seats){
    super(table_seats, [], 1000, null)
  }
}
