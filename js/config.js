var SensorType = {
    HUMIDITY: "humidity",
    TEMPERATURE: "temperature",
    DOSE: "dose",
    SENSOR1: "CO",
    SENSOR2: "CH4",
    SENSOR3: "sensor 3"
};

var GlobalData = {
    dataQueue: [],
    chart: null,
    currentSensorType: SensorType.DOSE,
    lastestDataPoint: undefined
};

var AppConfig = {
    DataQueue: {
        capacity: 25
    },

    ProducerThread: {
        timeBetweenShifts: 10000
    },

    ConsumerThread: {
        timeBetweenShifts: 2000
    },

    Chart: {
        numberOfDataPoints: 25,
        Title: {
            sensor1: "Dose Chart",
            sensor2: "Temperature Chart",
            sensor3: "Humidity Chart",
            sensor4: "CO Chart",
            sensor5: "CH4 Chart",
            sensor6: "Sensor-3 Chart",
        }
    }
};
