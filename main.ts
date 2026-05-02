input.onButtonPressed(Button.A, function () {
    if (coach_mode == 1) {
        passes = 0
        last_recorded = 0
        radio.sendString("start")
        running = 1
        start_time = input.runningTime()
    }
})
input.onButtonPressed(Button.AB, function () {
    coach_mode = 1
    basic.showIcon(IconNames.SmallDiamond)
})
radio.onReceivedString(function (receivedString) {
    if (coach_mode == 1) {
        if (receivedString == "detect") {
            if (input.runningTime() - last_recorded > 2000) {
                last_recorded = input.runningTime()
                passes += 1
            }
        }
    } else {
        if (receivedString == "start") {
            basic.showIcon(IconNames.Heart)
            running = 1
        } else if (receivedString == "end") {
            basic.showIcon(IconNames.SmallHeart)
            running = 0
        }
    }
})
let distance = 0
let last_recorded = 0
let passes = 0
let coach_mode = 0
let start_time = 0
let running = 0
radio.setGroup(121)
running = 0
start_time = 0
coach_mode = 0
basic.forever(function () {
    if (coach_mode == 0) {
        if (running == 1) {
            distance = sonar.ping(
            DigitalPin.P0,
            DigitalPin.P1,
            PingUnit.Inches
            )
            if (distance < 10) {
                radio.sendString("detect")
                basic.pause(500)
            }
        }
    } else {
        if (running == 1) {
            if (input.runningTime() - start_time >= 15000) {
                running = 0
                radio.sendString("end")
                basic.showNumber(passes)
            }
        }
    }
})
