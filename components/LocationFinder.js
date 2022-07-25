import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const LocationFinder = () => {
  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showError, setShowError] = useState(false);

  const fetchLocations = useCallback(
    debounce((searchText) => {
      setShowError(false);
      if (searchText.length >= 2) {
        fetch(`/api/locations/${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) setShowError(true);
            if (data.message) setLocations(data.message);
          })
          .catch((e) => console.log(e));
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
      {showError && <p>A location matching that text does not exist</p>}
      {locations.length > 0 &&
        locations.map((location) => (
          <div key={location.id}>{location.name}</div>
        ))}
    </div>
  );
};

export default LocationFinder;
