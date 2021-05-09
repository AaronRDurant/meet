import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EventGenre = ({ events }) => {
	const [data, setData] = useState([]);
	useEffect(() => { setData(() => getData()); }, [events]);
	
	const getData = (genre) => {
		const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
		const data = genres.map((genre) => {
			const value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length;
			return { name: genre, value };
		});
		return data;
	};
	
	const colors = ['#8886d5', '#85a7ea', '#8fd1e0', '#84c99e', '#a5dc72'];
	
	return (
		<ResponsiveContainer height={400} >
			<PieChart height={400}>
				<Pie
					data={data}
					cx={200}
					cy={200}
					labelLine={false}
					outerRadius={80}
					fill='#8884d8'
					dataKey='value'
					label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >
					{data.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index]} />))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}

export default EventGenre;
