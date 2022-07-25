import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const LocationFinder = () => {
  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setErrorMessage] = useState(null);

  const fetchLocations = useCallback(
    debounce((searchText) => {
      setErrorMessage(null);
      if (searchText.length >= 2) {
        fetch(`/api/locations/${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) setErrorMessage(data.error);
            if (data.message) setLocations(data.message);
          });
      }
    }, 500),
    []
  );

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
    fetchLocations(event.target.value);
  };

  return (
    <div>
      <input
        type="string"
        text={searchText}
        placeholder="Search..."
        onChange={handleTextChange}
      />
      {error && <div>{error}</div>}
      {locations.length > 0 &&
        locations.map((location) => (
          <div key={location.id}>{location.name}</div>
        ))}
    </div>
  );
};

export default LocationFinder;
