import { Teacher } from "../models/Teacher.js";

class TeacherController {
  async createTeacher(req, res) {
    try {
      const { fullName, education } = req.body;
      const newTeacher = await new Teacher({
        fullName,
        education,
      }).save();

      res.status(201).json(newTeacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const teachers = await Teacher.find();

      if (teachers.length === 0) {
        throw new Error("Teachers not found");
      }
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const teacher = await Teacher.findById(id);

      if (!teacher) {
        throw new Error(`Teacher with id = ${id} not found`);
      }
      
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async patch(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const result = await Teacher.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!result) {
        return res
          .status(404)
          .json({ error: `Teacher with id = ${id} not found` });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTeacher = await Teacher.findByIdAndDelete(id);

      if (!deletedTeacher) {
        return res
          .status(404)
          .json({ error: `Teacher with id = ${id} not found` });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}


export default new TeacherController();