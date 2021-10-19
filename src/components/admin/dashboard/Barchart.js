import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Barchart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={700}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false} />
                <YAxis type="number" domain={[0, 'dataMax']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" />
                <Bar dataKey="sold" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    )
};

export default Barchart;