import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios'; 
export const Contact = () => {
    const [values, setValues] = useState({
        name: "",
        address: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        address: "",
        email: "",
        message: "",
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        let formIsValid = true;

       
        if (!values.name) {
            newErrors.name = "Name is required.";
            formIsValid = false;
        }

        if (!values.address) {
            newErrors.address = "Address is required.";
            formIsValid = false;
        }

        if (!values.email) {
            newErrors.email = "Email is required.";
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "Email address is invalid.";
            formIsValid = false;
        }

        if (!values.message) {
            newErrors.message = "Message is required.";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios.post('http://localhost/EVlution/contact_function.php', values, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            const data = response.data;
            if (data.success) {
               
                setValues({
                    name: "",
                    address: "",
                    email: "",
                    message: "",
                });

                setSuccessMessage(data.message);
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was a problem with the form submission.');
        });
    };

    return (
        <div className="contact-container">
          
            {successMessage && (
                <div className="success-notification">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter first name"
                    value={values.name}
                    onChange={handleChanges}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={handleChanges}
                />
                {errors.address && <p className="error">{errors.address}</p>}

                <label htmlFor="email">Email id</label>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChanges}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    cols={10}
                    rows={5}
                    placeholder="Message"
                    value={values.message}
                    onChange={handleChanges}
                />
                {errors.message && <p className="error">{errors.message}</p>}

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};
