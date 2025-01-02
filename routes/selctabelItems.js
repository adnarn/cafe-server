const express = require('express');
const { createItemFolder, getFolderWithItems, deleteFolder, deleteItemFromFolder, updateFolder } = require('../controllers/selectableItem');
const folderRoute = express.Router();

// Route to create a folder
folderRoute.post('/createfolder', createItemFolder);

// Route to get folder by ID
folderRoute.get('/get-folders', getFolderWithItems);

// Delete a folder
folderRoute.delete('/folders/:folderId', deleteFolder);

// Delete an item from a folder
folderRoute.delete('/folders/:folderId/items/:itemId', deleteItemFromFolder);

// Update a folder
folderRoute.put('/folders/:folderId', updateFolder);

module.exports = folderRoute;

