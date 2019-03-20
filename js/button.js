// ham nay de change chart
$(document).ready(function () {
var active = 'phong_xa';
var dps = [], chart;
function getData() {
	return new Promise(function (resolve, reject) {
		$.get('http://nguyen-nulab.ddns.net:8001/web/updatert/').done(function (response, status) {
			resolve(response);
		}).fail(function (error) {
			reject(error);
		});
	});
}
function drawChart(title, titleY, labelY) {
	chart = new CanvasJS.Chart('chart', {
		theme: 'light2',
		title: {
			text: title
		},
		axisX: {

		},
		axisY: {
			title: titleY,
			labelFormatter: function (e) {
				return e.value + '' + labelY;
			}
		},
		data: [{
			type: 'line',
			markerSize: 0,
			dataPoints: dps
		}]
	});
	chart.render();
}
function updateChart(x, y) {
	dps.push({
		x: x,
		y: y.value,
		label: y.label
	});
	if (dps.length > 20) {
		dps.shift();
	}
	chart.render();
}
function changeActive(id) {
	$('#btn_phong_xa').removeClass('active');
	$('#btn_nhiet_do').removeClass('active');
	$('#btn_do_am').removeClass('active');
	$('#btn_khi_co2').removeClass('active');
	$('#btn_khi_ch4').removeClass('active');
	$('#btn_sensor_3').removeClass('active');
	$('#' + id + '').addClass('active');
}
function updateStatic(createDate, dose, temperature, humidity, sensor1, sensor2, sensor3) {
	$('#static_createDate').text(new Date(createDate).toLocaleDateString('vi-VN') + ' ' + new Date(createDate).toLocaleTimeString('vi-VN'));
	$('#static_dose').text(dose);
	$('#static_temperature').text(temperature);
	$('#static_humidity').text(humidity);
	$('#static_sensor1').text(sensor1);
	$('#static_sensor2').text(sensor2);
	$('#static_sensor3').text(sensor3);
}
drawChart('Dose Chart', 'dose', 'μSv/h');
$('#btn_phong_xa').click(function () {
	dps = [];
	active = 'phong_xa';
	drawChart('Dose Chart', 'dose', 'μSv/h');
	changeActive('btn_phong_xa');
});
$('#btn_nhiet_do').click(function () {
	dps = [];
	active = 'nhiet_do';
	drawChart('Temperature Chart', 'temperature', '°C');
	changeActive('btn_nhiet_do');
});
$('#btn_do_am').click(function () {
	dps = [];
	active = 'do_am';
	drawChart('Humidity Chart', 'humidity', '%');
	changeActive('btn_do_am');
});
$('#btn_khi_co2').click(function () {
	dps = [];
	active = 'khi_co2';
	drawChart('CO Chart', 'co', 'ppm');
	changeActive('btn_khi_co2');
});
$('#btn_khi_ch4').click(function () {
	dps = [];
	active = 'khi_ch4';
	drawChart('CH Chart', 'ch', 'ppm');
	changeActive('btn_khi_ch4');
});
$('#btn_sensor_3').click(function () {
	dps = [];
	active = 'khi_ch4';
	drawChart('Sensor 3', 'sensor 3', 'ppm');
	changeActive('btn_sensor_3');
});
// var socket = io.connect('http://localhost');
// why code k chạy? :v
//code a mà :v
///:v
//sao hồi nãy nó chạy a ?
var x = 0;
setInterval(function () {
	getData().then(function (data) {
		var response = JSON.parse(data);
		x += 1;
		var label = new Date().toLocaleTimeString('vi-VN');
		updateStatic(new Date(), (response.dose).toFixed(4), (response.Te).toFixed(4), (response.Hu).toFixed(4), (response.sen1).toFixed(4), (response.sen2).toFixed(4), (response.sen3).toFixed(4));
		switch (active) {
			case 'phong_xa':
				updateChart(x, { label: label, value: response.dose });
				break;
			case 'nhiet_do':
				updateChart(x, { label: label, value: response.Te });
				break;
			case 'do_am':
				updateChart(x, { label: label, value: response.Hu });
				break;
			case 'khi_co2':
				updateChart(x, { label: label, value: response.sen1 });
				break;
			case 'khi_ch4':
				updateChart(x, { label: label, value: response.sen2 });
				break;
			case 'sensor3':
				updateChart(x, { label: label, value: response.sen3 });
				break;
		}
	}).catch(error => {
		$('#alert-body').text(response.message);
		$('.toast').toast({ delay: 2e3 });
		$('.toast').toast('show');
	});
}, 1e3);
});
function test() {
	$('#btnDose').click(function () {
		$('#tabDose').show();
		$('#tabTemperature').hide();
		$('#tabHumid').hide();
		$('#tabSensor1').hide();
		$('#tabSensor2').hide();
		$('#tabSensor3').hide();

	});
	$('#btnTemperature').click(function () {
		$('#tabDose').hide();
		$('#tabTemperature').show();
		$('#tabHumid').hide();
		$('#tabSensor1').hide();
		$('#tabSensor2').hide();
		$('#tabSensor3').hide();
	});
	$('#btnHumid').click(function () {
		$('#tabDose').hide();
		$('#tabTemperature').hide();
		$('#tabHumid').show();
		$('#tabSensor1').hide();
		$('#tabSensor2').hide();
		$('#tabSensor3').hide();
	});
	$('#btnSensor1').click(function () {
		$('#tabDose').hide();
		$('#tabTemperature').hide();
		$('#tabHumid').hide();
		$('#tabSensor1').show();
		$('#tabSensor2').hide();
		$('#tabSensor3').hide();
	});
	$('#btnSensor2').click(function () {
		$('#tabDose').hide();
		$('#tabTemperature').hide();
		$('#tabHumid').hide();
		$('#tabSensor1').hide();
		$('#tabSensor2').show();
		$('#tabSensor3').hide();
	});
	$('#btnSensor3').click(function () {
		$('#tabDose').hide();
		$('#tabTemperature').hide();
		$('#tabHumid').hide();
		$('#tabSensor1').hide();
		$('#tabSensor2').hide();
		$('#tabSensor3').show();
	});
}