import React, { useEffect, useState } from 'react';
import './ReportIssue.css';

const ReportIssue = () => {
    const [marker, setMarker] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        // Prevent multiple initializations
        if (!document.getElementById('mapContainer').hasChildNodes()) {
            const platform = new window.H.service.Platform({
                apikey: 'mdunLxyyXHsAMJJAkJ2U1t3n4crZ639MopzKwWi0Dk4', // Replace with your HERE Maps API key
            });

            const defaultLayers = platform.createDefaultLayers();
            const map = new window.H.Map(
                document.getElementById('mapContainer'),
                defaultLayers.vector.normal.map,
                {
                    center: { lat: 15.3402, lng: 73.9511 },
                    zoom: 14,
                    pixelRatio: window.devicePixelRatio || 1,
                }
            );

            new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
            window.H.ui.UI.createDefault(map, defaultLayers);

            // Click event to add marker
            map.addEventListener('tap', (evt) => {
                const coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
                addMarker(map, coord.lat, coord.lng);
            });

            function addMarker(map, lat, lng) {
                if (marker) {
                    map.removeObject(marker);
                }
                const newMarker = new window.H.map.Marker({ lat, lng });
                map.addObject(newMarker);
                setMarker(newMarker);
                setCoordinates({ lat, lng });
            }
        }
    }, [marker]);

    const handleSubmit = () => {
        if (!coordinates || !name || !description) {
            alert('Please fill in all fields and select a location.');
            return;
        }

        const reportData = {
            name,
            description,
            coordinates,
            photo
        };

        console.log('Report Submitted:', reportData);
        localStorage.setItem('reportData', JSON.stringify(reportData));
        alert('Report submitted successfully!');
    };

    const handlePhotoUpload = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="report-issue-container">
            <h1>Report an Issue</h1>
            
            <div className="form-group">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </div>

            <div className="form-group">
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue"></textarea>
            </div>

            <div className="form-group">
                <label>Upload Photo:</label>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                {photo && <img src={photo} alt="Uploaded" className="preview-image" />}
            </div>

            <div id="mapContainer" className="map-container"></div>

            {coordinates && (
                <div className="coordinates">
                    <p><strong>Latitude:</strong> {coordinates.lat}</p>
                    <p><strong>Longitude:</strong> {coordinates.lng}</p>
                </div>
            )}

            <button id="submitButton" onClick={handleSubmit}>Submit Report</button>
        </div>
    );
};

export default ReportIssue;
