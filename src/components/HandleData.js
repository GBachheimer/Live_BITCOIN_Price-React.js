import React, { useState } from "react";
import useWebSocket from 'react-use-websocket';
import Graph from "./Graph";

const bitcoinSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");

export default function HandleData() {
	const [graphData, setGraphData] = useState([]);
	const [min, setMin] = useState(Infinity);
	const [max, setMax] = useState(0);
	const [title, setTitle] = useState("LIVE BITCOIN PRICE IN $$$");
	
	bitcoinSocket.addEventListener("message", (event) => {
		const newPrice = parseFloat(JSON.parse(event.data).k.c);
		const time = new Date(parseInt(JSON.parse(event.data).k.T));
		const newData = graphData.concat({
			price: newPrice,
			time: 	time.getHours() + ":" +
					((time.getMinutes() < 10 ? "0" : "") + time.getMinutes()) + " " +
					time.toLocaleDateString()
		});
		
		if (min > newPrice) {
			setMin(newPrice);
		} else if (max < newPrice) {
			setMax(newPrice);
		}
		if (newData.length - 1 > 20) {
			newData.shift();
		}
		setGraphData(newData);
	});
	console.log(graphData);
	return (
		<div className = "position-absolute top-50 start-50 translate-middle text-center">
			<p>{title}</p>
			<Graph graphData = {graphData} min = {min} max = {max} />
		</div>
	);
}
