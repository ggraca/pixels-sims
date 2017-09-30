class WCMen extends Zone{
  constructor(wcmen_seats,queue_seats){
    super(wcmen_seats, queue_seats)
  }
}
class WCWomen extends Zone{
  constructor(wcwomen_seats){
    super(wcwomen_seats, [])
  }
}

class MainStage extends Zone{
  constructor(stage_seats){
    super(stage_seats, [])
  }
}

class Table extends Zone{
  constructor(table_seats){
    super(table_seats, [])
    this.players_count = 0
  }
}

class Sponsors extends Zone{
  constructor(sponsors_seats){
    super(sponsors_seats, [])
  }
}

class Kitchen extends Zone{
  constructor(kitchen_seats){
    super(kitchen_seats, [])
  }
}
