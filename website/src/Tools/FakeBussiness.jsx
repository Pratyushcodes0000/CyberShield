import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaBuilding, FaSearch, FaArrowLeft } from 'react-icons/fa';
import './FakeBussiness.css';

const Fake = () => {
    const [data,setData]= useState("");
    const [business, setBusiness] = useState("");
    const [URL, setURL] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({
            business,
            URL,
            email,
            country
        });
    };

    return (
        <div className="fake-business-container">
            <div className="fake-business-header">
                <Link to="/tools" className="back-button">
                    <FaArrowLeft /> Back to Tools
                </Link>
                <h1>Fake Business Identifier</h1>
                <p>Verify the legitimacy of businesses and protect yourself from fraud</p>
            </div>

            <div className="fake-business-content">
                <div className="info-card">
                    <div className="info-icon">
                        <FaBuilding />
                    </div>
                    <h2>Business Verification</h2>
                    <p>Enter the business details below to verify their legitimacy and protect yourself from potential fraud.</p>
                </div>

                <form  className="verification-form">
                    <div className="form-group">
                        <label htmlFor="business">Company/Business Name</label>
                        <input
                            id="business"
                            type="text"
                            placeholder="Enter company name"
                            value={business}
                            onChange={(e) => setBusiness(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="url">Domain Name or Website URL</label>
                        <input
                            id="url"
                            type="url"
                            placeholder="https://example.com"
                            value={URL}
                            onChange={(e) => setURL(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address (Optional)</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="contact@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country (Optional)</label>
                        <input
                            id="country"
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="verify-button" onClick={handleSubmit}>
                        <FaSearch /> Verify Business
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Fake;