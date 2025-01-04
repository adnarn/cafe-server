const express = require('express');
const Folder = require('../models/selectableItemModel'); // Adjust path as needed

// Create a new folder
const createItemFolder = async (req, res) => {
  const { name, items } = req.body; // `items` should be an array of item IDs

  if (!name) {
    return res.status(400).json({ error: 'Folder name is required.' });
  }

  try {
    const folder = new Folder({
      name,
      items,
    });

    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

//get folder
const getFolderWithItems = async (req, res) => {
    const { folderId } = req.params;
  
    try {
      const folder = await Folder.find({}); // Populate items with their details
  
      res.status(200).json(folder);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const deleteFolder = async (req, res) => {
    const { folderId } = req.params;
  
    try {
      const deletedFolder = await Folder.findByIdAndDelete(folderId);
  
      if (!deletedFolder) {
        return res.status(404).json({ error: 'Folder not found.' });
      }
  
      res.status(200).json({ message: 'Folder deleted successfully.', folder: deletedFolder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteItemFromFolder = async (req, res) => {
    const { folderId, itemId } = req.params;
  
    try {
      const folder = await Folder.findById(folderId);
  
      if (!folder) {
        return res.status(404).json({ error: 'Folder not found.' });
      }
  
      // Remove the item from the items array
      folder.items = folder.items.filter(item => item.toString() !== itemId);
      await folder.save();
  
      res.status(200).json({ message: 'Item removed from folder.', folder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  const updateFolder = async (req, res) => {
    const { folderId } = req.params;
    const { name, items } = req.body; // `items` should be an array of item IDs
  
    try {
      const folder = await Folder.findById(folderId);
  
      if (!folder) {
        return res.status(404).json({ error: 'Folder not found.' });
      }
  
      if (name) {
        folder.name = name;
      }
  
      if (items) {
        folder.items = items; // Overwrite the items array
      }
  
      const updatedFolder = await folder.save();
      res.status(200).json({ message: 'Folder updated successfully.', folder: updatedFolder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  

module.exports = {
    createItemFolder,
    getFolderWithItems,
    deleteFolder,
    updateFolder,
    deleteItemFromFolder
};
