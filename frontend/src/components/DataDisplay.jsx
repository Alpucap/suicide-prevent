import React, { useEffect, useState } from "react";
import { fetchData } from "../services/api";

function DataDisplay() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

            loadData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Data dari Backend</h1>
            {data ? (
                <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default DataDisplay;
