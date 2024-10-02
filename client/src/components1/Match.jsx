import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Match.css'; // Create a CSS file for styles if needed

const MatchNotifications = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/match'); // Adjust this to your actual endpoint for fetching matches
                setMatches(response.data);
            } catch (err) {
                setError('Failed to fetch match notifications');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="notifications-container">
            <h2>Matched Notifications</h2>
            {matches.length === 0 ? (
                <div>No match notifications yet.</div>
            ) : (
                <ul className="notifications-list">
                    {matches.map((match) => (
                        <li key={match._id} className="notification-item">
                            <strong>Email:</strong> {match.email} <br />
                            <strong>Location:</strong> {match.location} <br />
                            <strong>Item ID:</strong> {match.itemId} <br />
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MatchNotifications;
