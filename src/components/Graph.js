import React, { useState } from "react";
import { AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import useWebSocket from 'react-use-websocket';

const bitcoinSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");

export default function Graph() {
	const [graphData, setGraphData] = useState([]);
	const [min, setMin] = useState(Infinity);
	const [max, setMax] = useState(0);
	
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
			<p>LIVE BITCOIN PRICE IN $$$</p>
			<AreaChart width={730} height={250} data={graphData}
			  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
			  <defs>
				<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
				  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
				  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
				</linearGradient>
			  </defs>
			  <XAxis dataKey="time" tick={{ fontSize: 8}} />
			  <YAxis type = "number" domain={[min, max]} tick={{ fontSize: 10 }} />
			  <CartesianGrid strokeDasharray="3 3" />
			  <Tooltip />
			  <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
			</AreaChart>
		</div>
	);
}
