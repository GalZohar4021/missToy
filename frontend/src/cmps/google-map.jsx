import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from "react";

const Loc1 = ({ text }) => <div style={{ fontSize: '1.5rem' }}>{text}</div>;
const Loc2 = ({ text }) => <div style={{ fontSize: '1.5rem' }}>{text}</div>;
const Loc3 = ({ text }) => <div style={{ fontSize: '1.5rem' }}>{text}</div>;
const Loc4 = ({ text }) => <div style={{ fontSize: '1.5rem' }}>{text}</div>;

export function GoogleMap() {
    const [coordinates, setCoordinates] = useState({
        lat: 32.129880670883274,
        lng: 34.99519550808345
    })
    const zoom = 20


    const _onChildClick = (key, childProps) => {
        this.props.onCenterChange([childProps.lat, childProps.lng]);
        console.dir(childProps)
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <div className="google-btn">

                <button className="button" onClick={() => setCoordinates({
                    lat: 32.129880670883274,
                    lng: 34.99519550808345
                })}>Oranit</button>

                <button className="button" onClick={() => setCoordinates({
                    lat: 32.058995576866835,
                    lng: 34.80089753975858
                })}>Tel Aviv</button>

                <button className="button" onClick={() => setCoordinates({
                    lat: 31.72992668093014,
                    lng: 35.18975451466663
                })}>Jerusalem</button>

                <button className="button" onClick={() => setCoordinates({
                    lat: 29.525251038235147,
                    lng: 34.93462998968492
                })}>Eilat</button>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBRAwc2R_6skDQ2JWPwlji_zHxadiy7RVQ" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <Loc1
                    lat={32.129880670883274}
                    lng={34.99519550808345}
                    text="🏪"
                />
                <Loc2
                    lat={32.058995576866835}
                    lng={34.80089753975858}
                    text="🏪"
                />
                <Loc3
                    lat={31.72992668093014}
                    lng={35.18975451466663}
                    text="🏪"
                />
                <Loc4
                    lat={29.525251038235147}
                    lng={34.93462998968492}
                    text="🏪"
                />

            </GoogleMapReact>
            
        </div >
    );
}