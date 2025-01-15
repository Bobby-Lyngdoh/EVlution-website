import { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedRow, setSelectedRow] = useState(null); 
  const [showSearchBarOnly, setShowSearchBarOnly] = useState(true); 

  useEffect(() => {
 
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

  const filteredData = data.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowSearchBarOnly(false); 
  };

  const handleRowClick = (contact) => {
    setSelectedRow(contact);
    setShowSearchBarOnly(false); 
  };


  const handleBackToInterface = () => {
    setSelectedRow(null);
    setSearchQuery(""); 
    setShowSearchBarOnly(true); 
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

    
      <div className="admin-search-bar-container">
        <input
          type="text"
          placeholder="Search by name or contact info..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="admin-search-bar"
        />
      </div>

    
      {!showSearchBarOnly && !selectedRow ? (

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
