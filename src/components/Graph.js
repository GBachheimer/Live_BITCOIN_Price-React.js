import React, { useState } from "react";
import { AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Graph(props) {
	return (
		<AreaChart width={730} height={250} data={props.graphData}
			margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
			<defs>
			<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
				<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
				<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
			</linearGradient>
			</defs>
			<XAxis dataKey="time" tick={{ fontSize: 8}} />
			<YAxis type = "number" domain={[props.min, props.max]} tick={{ fontSize: 10 }} />
			<CartesianGrid strokeDasharray="3 3" />
			<Tooltip />
			<Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
		</AreaChart>
	);
}
