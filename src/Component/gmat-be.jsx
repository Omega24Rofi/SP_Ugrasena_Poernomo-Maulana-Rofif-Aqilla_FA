import React, { useEffect, useState } from 'react';
import '../App.css';

const GmatComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/gmat');
                // check response
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-full  mt-4 p-4 text-white font-bold bg-primary'>
            <h1>{data ? data.title : 'No data available'}</h1>
        </div>
    );
};

export default GmatComponent;
