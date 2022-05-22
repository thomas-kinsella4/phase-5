import React, { useEffect, useState } from "react";
import AppliedArtistsList from "./AppliedArtistsList";

function AgentViewApps({ gig, closeViewModal, keepTrack }) {

    // get all gig apps, filter them by this gigs id and then return the artist zsscocitated with them

    // console.log(gig.gig_applications)
    const [allGigApps, setAllGigApps] = useState([]);

    useEffect(() => {
        fetch("/gig_applications")
        .then( res => res.json())
        .then( data => setAllGigApps(data))
        .catch( error => console.log(error.message));
    }, [])

    const filteredGigApps = allGigApps.filter((gigApp) => {
        return gigApp.gig_id === gig.id 
    })
    

    const appsArtists = filteredGigApps.map((artist) => {
        return <AppliedArtistsList key={artist.artist.id} artist={artist.artist} filteredGigApps={filteredGigApps} keepTrack={keepTrack}/>
        // console.log("from map: ", artist.artist)
    })


    

    return (
        <>
            <button onClick={closeViewModal}>X</button>
            <h1>The following artists have applied to this gig:</h1>
            {appsArtists}
        </>
    )
}

export default AgentViewApps