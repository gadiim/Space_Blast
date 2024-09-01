const dbName = 'gameSettingsDB';
const dbVersion = 1;
let db;

//!create db
const request = indexedDB.open(dbName, dbVersion);//database created / name: gameSettingsDB.

request.onsuccess = (event) => {
    db = event.target.result;
    console.log(db.name);
}

request.onerror = (event) => {
    const error = event.target.error;
    console.log(error.message);
}

request.onupgradeneeded = (event) => {
    db = event.target.result;

// create an object store for the game settings
    const settingsStore = db.createObjectStore('settings', { keyPath: 'id', autoIncrement: true });

    // Add default data (if needed)
    settingsStore.transaction.oncomplete = function () {
        const settingsObjectStore = db.transaction('settings', 'readwrite').objectStore('settings');

        settingsObjectStore.add({ id: 'bestScore', value: 0 });
        settingsObjectStore.add({ id: 'toggleDark', value: false });
        settingsObjectStore.add({ id: 'toggleSound', value: true });
        settingsObjectStore.add({ id: 'toggleMusic', value: true });

        console.log('Default settings added');
    };
};

// // Function to update a specific setting
// function updateSetting(key, value) {
//     const transaction = db.transaction(['settings'], 'readwrite');
//     const store = transaction.objectStore('settings');
//     const request = store.put({ id: key, value: value });

//     request.onsuccess = function () {
//         console.log(`${key} updated successfully`);
//     };

//     request.onerror = function (event) {
//         console.error(`Error updating ${key}:`, event.target.error);
//     };
// }

// Example usage
// updateSetting('bestScore', 100);  // Update the best score to 100
// updateSetting('toggleDark', true); // Enable dark mode

export { updateSetting };
