let motorValStr = ""
let recvEndNum = 0
let motorSelStr = ""
let recvData = ""
serial.redirectToUSB()
let motorVal = 0
let motorValLeft = 0
let motorValLeftAbs = 0
let motorValRight = 0
let motorValRightAbs = 0
let valZero = 0
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
    basic.showIcon(IconNames.SmallDiamond)
})
basic.forever(function () {
    recvData = serial.readUntil(serial.delimiters(Delimiters.Comma))
    motorSelStr = recvData.charAt(0)
    recvEndNum = recvData.length
    recvEndNum += -1
    motorValStr = recvData.substr(1, recvEndNum)
    motorVal = parseFloat(motorValStr)
    if (motorSelStr == "l") {
        motorValLeft = motorVal
    } else {
        if (motorSelStr == "r") {
            motorValRight = motorVal
        }
    }
    if (motorValLeft <= 0) {
        motorValLeftAbs = Math.abs(motorValLeft)
        if (motorValRight <= 0) {
            motorValRightAbs = Math.abs(motorValRight)
        } else {
            motorValLeftAbs = 0
            motorValRightAbs = 0
        }
    }
})
basic.forever(function () {
    if (motorValLeft >= 0 && motorValRight >= 0) {
        Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Run, motorValLeft, motorValRight)
    } else {
        if (motorValLeft < 0 && motorValRight < 0) {
            Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Back, motorValLeftAbs, motorValRightAbs)
        } else {
            if (motorValLeft > 0 && motorValRight == 0) {
                Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Left, motorValLeft)
            } else {
                if (motorValLeft == 0 && motorValRight > 0) {
                    Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Right, motorValRight)
                } else {
                    if (motorValLeft > 0 && motorValRight < 0) {
                        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, motorValLeft)
                    } else {
                        if (motorValLeft < 0 && motorValRight > 0) {
                            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, motorValRight)
                        } else {
                            Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Stop, valZero, valZero)
                        }
                    }
                }
            }
        }
    }
})
