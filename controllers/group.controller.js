import { Group } from "../models/Group.js";
import { Teacher } from "../models/Teacher.js";
import mongoose from "mongoose"; 
class GroupController {
  async createGroup(req, res) {
    try {
      const { name, teacher, childrens } = req.body; 

      if (!name || !teacher) {
        return res.status(400).json({ error: "Name and Teacher ID are required" });
      }


      const newGroup = new Group({ name, teacher, childrens });

      const savedGroup = await newGroup.save();

      res.status(201).json(savedGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const groups = await Group.find()
        .populate("childrens", "fullName age") 
        .populate("teacher", "fullName education"); 

      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const group = await Group.findById(id)
        .populate("childrens", "fullName age")
        .populate("teacher", "fullName education");

      if (!group) {
        return res.status(404).json({ error: `Group with id = ${id} not found` });
      }

      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async patch(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const result = await Group.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!result) {
        return res.status(404).json({ error: `Group with id = ${id} not found` });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedGroup = await Group.findByIdAndDelete(id);

      if (!deletedGroup) {
        return res.status(404).json({ error: `Group with id = ${id} not found` });
      }

      res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new GroupController();
