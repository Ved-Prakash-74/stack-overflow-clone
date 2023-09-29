import React, { useEffect, useState } from "react";

export default function MapWithLocation() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }, []);

    return (
        <div>
            {latitude !== null && longitude !== null && (
                <iframe
                    title="User Location"
                    width="100%"
                    height="490px"
                    src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                ></iframe>
            )}
        </div>
    );
}
