import { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query for admin search bar
  const [selectedRow, setSelectedRow] = useState(null); // To keep track of the selected row for details
  const [showSearchBarOnly, setShowSearchBarOnly] = useState(true); // New state to control search bar visibility

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost/EVlution/contact_data.php")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Invalid data structure:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Filter the data based on the admin search query
  const filteredData = data.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle search input change (for the admin search bar)
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowSearchBarOnly(false); // Show the contact list when typing in the search bar
  };

  // Function to handle row click and show details
  const handleRowClick = (contact) => {
    setSelectedRow(contact);
    setShowSearchBarOnly(false); // Hide search bar when viewing contact details
  };

  // Function to go back to the original interface
  const handleBackToInterface = () => {
    setSelectedRow(null);
    setSearchQuery(""); // Optionally clear the search query
    setShowSearchBarOnly(true); // Only show the search bar again
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1 className="title">Contact Info</h1>

      {/* Admin Search Bar */}
      <div className="admin-search-bar-container">
        <input
          type="text"
          placeholder="Search by name or contact info..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="admin-search-bar"
        />
      </div>

      {/* Only show the contact list or contact details if search bar is not the only visible component */}
      {!showSearchBarOnly && !selectedRow ? (
        // Contact List View
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((contact) => (
                  <tr
                    key={contact.contact_id}
                    onClick={() => handleRowClick(contact)}
                    className={selectedRow === contact ? "selected" : ""}
                  >
                    <td>{contact.name}</td>
                  </tr>
                ))
              ) : (
                <tr className="empty-data">
                  <td>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Displaying contact details if selected */}
      {selectedRow && (
        <div className="contact-details">
          <h3>Contact Details</h3>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{selectedRow.name}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{selectedRow.address}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{selectedRow.email}</td>
              </tr>
              <tr>
                <td>Message</td>
                <td>{selectedRow.message}</td>
              </tr>
            </tbody>
          </table>
          {/* Button to go back to the original interface */}
          <button
            onClick={handleBackToInterface}
            className="back-to-interface-button"
          >
            Back to Interface
          </button>
        </div>
      )}
    </div>
  );
}
