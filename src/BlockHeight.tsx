import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlockHeight: React.FC = () => {
    const [blockHeight, setBlockHeight] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlockHeight = async () => {
            try {
                const response = await axios.get<number>('http://localhost:3030/block_height');
                setBlockHeight(response.data);
            } catch (err) {
                setError('Failed to fetch block height');
            } finally {
                setLoading(false);
            }
        };

        fetchBlockHeight();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Current Block Height</h1>
            {blockHeight !== null ? <p>{blockHeight}</p> : <p>No data</p>}
        </div>
    );
};

export default BlockHeight;
