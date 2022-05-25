'use strict';

const converter = document.getElementById('converter');
const fromUnit = document.querySelector('select[name="fromUnit"]');
const toUnit = document.querySelector('select[name="toUnit"]');
const answerContainer = document.querySelector('.answer');

function formatUnit(unit) {
	return unit === 'C' ? '°C' : unit === 'F' ? '°F' : 'K';
}
function formatNumber(temperature) {
	if (Number.isInteger(temperature)) return temperature;

	const numberAsString = temperature + '';
	const [integer, fraction] = numberAsString.split('.');
	const fractionTo2DP = fraction.slice(0, 4);
	const number = [integer, fractionTo2DP].join('.');

	return parseFloat(number);
}

function handleValidationError(error) {
	console.error(error.message);
}

function handleFormSubmit(e) {
	try {
		e.preventDefault();

		// Get data from the form
		const entries = new FormData(converter).entries();
		const data = Object.fromEntries(entries);

		// Validate data
		if (!data.fromTemperature) throw new Error('Must provide a temperature');
		const answer = convertTemperature(data);

		// Update UI
		showAnswer(data, answer);
	} catch (error) {
		handleValidationError(error);
	}
}

function convertTemperature(values) {
	switch (values.fromUnit) {
		case 'F':
			if (values.toUnit === 'C') return (+values.fromTemperature - 32) / 1.8;
		case 'K':
			if (values.toUnit === 'C') return +values.fromTemperature - 273;
	}
}

function showAnswer({ toUnit }, answer) {
	answerContainer.innerHTML = ` <span>${formatNumber(answer)}</> ${formatUnit(toUnit)}</span>`;
}

converter.addEventListener('submit', handleFormSubmit);

fromUnit.addEventListener('input', changeInput);
