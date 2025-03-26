import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';
import {urlConfig} from '../../config';

function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showComments, setShowComments] = useState(true);

    useEffect(() => {
        const authenticationToken = sessionStorage.getItem('auth-token');
        if (!authenticationToken) {
            navigate('/app/login');
        }

        // get the gift to be rendered on the details page
        const fetchGift = async () => {
            try {
                const url = `${urlConfig.backendUrl}/api/gifts/${productId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGift(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGift();

        // Scroll to top on component mount
        window.scrollTo(0, 0);

    }, [productId, navigate]);

    const handleBackClick = () => {
        navigate(-1);
    };

    //The comments have been hardcoded for this project.
    const comments = [
        {
            author: "John Doe",
            comment: "I would like this!"
        },
        {
            author: "Jane Smith",
            comment: "Just DMed you."
        },
        {
            author: "Alice Johnson",
            comment: "I will take it if it's still available."
        },
        {
            author: "Mike Brown",
            comment: "This is a good one!"
        },
        {
            author: "Sarah Wilson",
            comment: "My family can use one. DM me if it is still available. Thank you!"
        }
    ];
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!gift) return <div>Gift not found</div>;

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back</button>
            <div className="card product-details-card">
                <div className="card-header text-white">
                    <h2 className="details-title">{gift.name}</h2>
                </div>
                <div className="card-body">
                    <div className="image-placeholder-large">
                        {gift.image ? (
                            <img src={gift.image} alt={gift.name} className="product-image-large" />
                        ) : (
                            <div className="no-image-available-large">No Image Available</div>
                        )}
                    </div>
                    <p><strong>Category:</strong> 
                        {gift.category}
                    </p>
                    <p><strong>Condition:</strong> 
                        {gift.condition}
                    </p>
                    <p><strong>Date Added:</strong> 
                        {formatDate(gift.date_added)}
                    </p>
                    <p><strong>Age (Years):</strong> 
                        {gift.age_years}
                    </p>
                    <p><strong>Description:</strong> 
                        {gift.description}
                    </p>
                </div>
            </div>
            <div className="comments-section mt-4">
                <h3 className="mb-3">Comments</h3>
                <button 
                className="btn btn-primary mb-3" 
                    onClick={() => setShowComments(!showComments)}
                >
                    {showComments ? "Hide Comments" : "Show Comments"}
                </button>
                {showComments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <p className="comment-author"><strong>{comment.author}:</strong></p>
                                <p className="comment-text">{comment.comment}</p>
                            </div>
                        </div>
                    ))
                ) : showComments && comments.length === 0 ? (
                    <p>No comments available.</p>
                ) : null}
            </div>
        </div>
    );
}

export default DetailsPage;