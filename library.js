const library = {
  tracks: {
    t01: {
      id: "t01",
      name: "Code Monkey",
      artist: "Jonathan Coulton",
      album: "Thing a Week Three",
    },
    t02: {
      id: "t02",
      name: "Model View Controller",
      artist: "James Dempsey",
      album: "WWDC 2003",
    },
    t03: {
      id: "t03",
      name: "Four Thirty-Three",
      artist: "John Cage",
      album: "Woodstock 1952",
    },
  },
  playlists: {
    p01: {
      id: "p01",
      name: "Coding Music",
      tracks: ["t01", "t02"],
    },
    p02: {
      id: "p02",
      name: "Other Playlist",
      tracks: ["t03"],
    },
    p03: {
      id: "p03",
      name: "Empty Playlist",
      tracks: [],
    },
    p04: {
      id: "p04",
      name: "Missing Tracks",
      tracks: ["t01", "t02", "txx"],
    },
  },
};

/////////////////////////////
// FUNCTIONS TO IMPLEMENT:
/////////////////////////////

/////////////// PRINT PLAYLISTS FUNCTION ///////////////
// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks

const printPlaylists = function () {
  const playlists = library.playlists; // Retrieve all playlists from the library

  // Check if there are any playlists available
  if (Object.keys(playlists).length === 0) {
    console.log("No playlists available.");
    return;
  }

  // Iterate through the playlists object
  for (const [key, playlist] of Object.entries(playlists)) {
    // Check if the playlist is valid (i.e., contains expected properties)
    if (!playlist || !playlist.tracks || !Array.isArray(playlist.tracks)) {
      console.warn(
        `Playlist with ID '${key}' has invalid data and will be skipped.`
      );
      continue;
    }
    const numTracks = playlist.tracks.length; // Get the number of tracks in the playlist

    // Print the playlist details with correct pluralization of 'track/tracks'
    console.log(
      `${playlist.id}: ${playlist.name} - ${numTracks} ${
        numTracks === 1 ? "track" : "tracks"
      }`
    );
  }
};

// Test output for the function
console.log("The playlists are:");
printPlaylists();

/////////////// PRINT TRACKS FUNCTION ///////////////
// prints a list of all tracks, using the following format:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)

const printTracks = function () {
  const tracks = library.tracks; // Retrieve all tracks from the library

  // Check if there are any tracks available
  if (Object.keys(tracks).length === 0) {
    console.log("No tracks available.");
    return;
  }

  // Iterate through the tracks object
  for (const [key, track] of Object.entries(tracks)) {
    // Ensure the track object is valid and has required properties
    if (typeof track !== "object") {
      console.warn(`Track ${key} is invalid and will be skipped.`);
      continue;
    }

    // Fallback values for missing data to maintain formatting robustness
    const trackName = track.name || "Unknown Track";
    const artistName = track.artist || "Unknown Artist";
    const albumName = track.album || "Unknown Album";

    // Print the track details with fallback values
    console.log(`${track.id}: ${trackName} by ${artistName} (${albumName})`);
  }
};

// Test output for the function
console.log("The tracks are:");
printTracks();

/////////////// PRINT PLAYLIST TRACKS FUNCTION ///////////////
// prints a list of tracks for a given playlist, using the following format:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)

const printPlaylist = function (playlistId) {
  // Validate that playlistId is provided and is a string
  if (!playlistId || typeof playlistId !== "string") {
    console.error("Invalid playlist ID. Please provide a valid string.");
    return;
  }

  const playlist = library.playlists[playlistId]; // Access the playlist from the library by ID
  const tracks = library.tracks; // Retrieve all tracks from the library
  const numTracks = playlist.tracks.length; // Get the number of tracks in the playlist

  // Check if the playlist exists, if not, notify and exit
  if (!playlist) {
    console.log(`Playlist with ID '${playlistId}' not found.`);
    return;
  }

  // Print playlist details (ID, name, and number of tracks)
  console.log(
    `${playlist.id}: ${playlist.name} - ${numTracks} ${
      numTracks === 1 ? "track" : "tracks"
    }`
  );

  // Check if the playlist is empty
  if (playlist.tracks.length === 0) {
    console.log("This playlist is currently empty.");
    return;
  }

  // Loop through the track IDs in the playlist
  for (const trackId of playlist.tracks) {
    // Check if the track ID is valid in the tracks object
    const track = tracks[trackId];

    if (!track) {
      console.warn(`Track ${trackId} not found in the library and will be skipped.`);
      continue;
    }

    // Fallback values for missing track data to maintain formatting robustness
    const trackName = track.name || "Unknown Track";
    const artistName = track.artist || "Unknown Artist";
    const albumName = track.album || "Unknown Album";

    // Print track details (ID, name, artist, and album)
    console.log(`${track.id}: ${trackName} by ${artistName} (${albumName})`);
  }
};

console.log("The playlist tracks are:");
printPlaylist("p01");

/*
    /////////////// ADD TRACK TO PLAYLIST FUNCTION ///////////////
    // adds an existing track to an existing playlist

const addTrackToPlaylist = function (trackId, playlistId) {

};

// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)
const generateUid = function () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

// adds a track to the library
const addTrack = function (name, artist, album) {

};

// adds a playlist to the library
const addPlaylist = function (name) {

};

// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri")
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
const printSearchResults = function (query) {
  
};
 */
