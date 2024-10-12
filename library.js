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
    p05: {
      id: "p05",
      name: "Adding Tracks",
      tracks: [],
    },
  },
  printPlaylists: function () {
    const playlists = this.playlists; // Retrieve all playlists from the library
  
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
  },
  printTracks: function () {
    const tracks = this.tracks; // Retrieve all tracks from the library
  
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
  }
};

/////////////////////////////
// FUNCTIONS TO IMPLEMENT:
/////////////////////////////

/////////////////////////////
// PRINT PLAYLISTS FUNCTION 
// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks

// Test output for the function
console.log("The playlists are:");
library.printPlaylists();
/////////////////////////////

/////////////////////////////
// PRINT TRACKS FUNCTION
// prints a list of all tracks, using the following format:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)

// Test output for the function
console.log("The tracks are:");
library.printTracks();
/////////////////////////////

/////////////////////////////
// PRINT PLAYLIST TRACKS FUNCTION
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
  if (numTracks === 0) {
    console.log("This playlist is currently empty.");
    return;
  }

  // Loop through the track IDs in the playlist
  for (const trackId of playlist.tracks) {
    const track = tracks[trackId]; // Check if the track ID is valid in the tracks object

    if (!track) {
      console.warn(
        `Track ${trackId} not found in the library and will be skipped.`
      );
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

// Test output for the function
console.log("The playlist tracks are:");
printPlaylist("p01");
/////////////////////////////

/////////////////////////////
// ADD TRACK TO PLAYLIST FUNCTION
// adds an existing track to an existing playlist

const addTrackToPlaylist = function (trackId, playlistId) {
  const playlist = library.playlists[playlistId];
  const track = library.tracks[trackId];

  if (!playlist) {
    console.warn(`Playlist with ID '${playlistId}' does not exist.`);
    return;
  }

  if (!track) {
    console.warn(`Track with ID '${trackId}' does not exist.`);
    return;
  }

  if (playlist.tracks.includes(trackId)) {
    console.log(`Track ${trackId} is already in playlist ${playlistId}.`);
    return;
  }

  playlist.tracks.push(trackId);

  console.log(`Track ${trackId} successfully added to playlist ${playlistId}.`);
};

// Test output for the function
console.log("The add track to playlist function output:");
addTrackToPlaylist("t01","p05");
/////////////////////////////

/////////////////////////////
// UNIQUE ID FUNCTION
// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)

const generateUid = function () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

/////////////////////////////

/////////////////////////////
// ADD TRACK TO LIBRARY FUNCTION
// adds a track to the library

const addTrack = function (name, artist, album) {
  const existingTrackIds = Object.keys(library.tracks);

  // Check if the generated ID exists in the array of existing track IDs
  const generateUniqueTrackId = function () {
    let newTrackId = generateUid();
    console.warn(`Generating a new trackId, please wait...`);

    // Check if the generated ID exists in the array of existing track IDs
    while (existingTrackIds.includes(newTrackId)) {
      console.warn(
        `Track ID ${newTrackId} already exists. Generating a new ID.`
      );
      newTrackId = generateUid(); // Generate a new ID if there's a collision
    }

    return newTrackId; // Return unique ID
  };

  // Generate a new unique track ID
  const trackId = generateUniqueTrackId();

  // Validate the input values (ensure they're strings)
  if (
    (typeof name !== "string" && typeof name !== "number") ||
    (typeof artist !== "string" && typeof artist !== "number") ||
    (typeof album !== "string" && typeof album !== "number")
  ) {
    console.error(
      "Invalid input. All fields (name, artist, album) must be strings or numbers."
    );
    return;
  }

  // Convert inputs to strings if they are numbers
  const trackName = String(name).trim();
  const trackArtist = String(artist).trim();
  const trackAlbum = String(album).trim();

  // Add the new track to the library
  library.tracks[trackId] = {
    id: trackId,
    name: trackName,
    artist: trackArtist,
    album: trackAlbum,
  };
  console.log(
    `Track '${trackName}' by ${trackArtist} from album ${trackAlbum} added successfully with ID ${trackId}.`
  );
};

// Test output for the function
console.log("The add track function output:");
addTrack("123", 456, "789");
/////////////////////////////


/////////////////////////////
// ADD PLAYLIST FUNCTION
// adds a playlist to the library

const addPlaylist = function (name) {
  const existingPlaylistIds = Object.keys(library.playlists);

  // Check if the generated ID exists in the array of existing track IDs
  const generateUniquePlaylistId = function () {
    let newPlaylistId = generateUid();
    console.warn(`Generating a new playlistId, please wait...`);

    // Check if the generated ID exists in the array of existing track IDs
    while (existingPlaylistIds.includes(newPlaylistId)) {
      console.warn(
        `Playlist ID ${newPlaylistId} already exists. Generating a new ID.`
      );
      newPlaylistId = generateUid(); // Generate a new ID if there's a collision
    }

    return newPlaylistId; // Return unique ID
  };

  // Generate a new unique track ID
  const playlistkId = generateUniquePlaylistId();

  // Validate the input values (ensure they're strings)
  if (typeof name !== "string" && typeof name !== "number"
  ) {
    console.error(
      "Invalid input. Playlist must be a string or number."
    );
    return;
  } else {
  if (String(name).trim().length === 0) {
    console.error("Invalid input. Playlist name cannot be empty or only spaces.");
    return;
    }
  }
  
  // Convert inputs to strings if they are numbers
  const playlistName = String(name).trim();

  // Add the new track to the library
  library.playlists[playlistkId] = {
    id: playlistkId,
    name: playlistName,
    tracks: []
  };
  console.log(
    `Playlist: '${playlistName}' added successfully with ID ${playlistkId}. It currently has no tracks.`
  );
};

// Test output for the function
console.log("The add playlist function output:");
addPlaylist("New Playlist");
/////////////////////////////

/*
/////////////////////////////
// ADD SEARCH TRACKS FUNCTION
// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri")
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search

const printSearchResults = function (query) {
  
};*/

// Test output for the function

/////////////////////////////