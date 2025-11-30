input.onButtonPressed(Button.A, function () {
    basic.showNumber(race_time)
})
let distance = 0
let race_time = 0
let running = 0
let start_time = 0
race_time = 0
basic.forever(function () {
	
})
loops.everyInterval(100, function () {
    distance = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Inches
    )
    if (running == 0) {
        if (distance < 30) {
            running = 1
            start_time = input.runningTime()
            basic.showIcon(IconNames.Yes)
        }
    } else {
        if (distance < 30) {
            running = 0
            race_time = (input.runningTime() - start_time) / 1000
            datalogger.log(datalogger.createCV("race_time", race_time))
            basic.showNumber(race_time)
        }
    }
})
