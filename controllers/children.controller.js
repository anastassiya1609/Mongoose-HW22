import { Children } from "./../models/Children.js";
import { Group } from "../models/Group.js";

class ChildrenController {
  async createChildren(req, res) {
    try {
      const { fullName, age, vaccinations } = req.body;
      const newChildren = await new Children({
        fullName,
        age,
        vaccinations,
      }).save();

      res.status(201).json(newChildren);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const childrens = await Children.find().populate("group", "name");

      if (childrens.length === 0) {
        throw new Error("Childrens not found");
      }
      res.status(200).json(childrens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const children = await Children.findById(id);

      if (!children) {
        throw new Error(`Children with id = ${req.params.id} not found`);
      }
      res.status(200).json(children);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //   Данный код обновляет данные(все, исключая массив с вакцинами) и добавляет новые вацины в массив
  async patch(req, res) {
    try {
      const { id } = req.params;
      const { vaccineName, vaccinationYear } = req.body;

      if (!vaccineName || !vaccinationYear) {
        return res
          .status(400)
          .json({ error: "vaccineName and vaccinationYear are required" });
      }

      const updatedChild = await Children.findByIdAndUpdate(
        id,
        {
          $push: {
            vaccinations: { vaccineName, vaccinationYear },
          },
        },
        { new: true }
      );

      if (!updatedChild) {
        return res
          .status(404)
          .json({ error: `Children with id = ${id} not found` });
      }

      res.status(200).json(updatedChild);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedChildren = await Children.findByIdAndDelete(id);

      if (!deletedChildren) {
        return res
          .status(404)
          .json({ error: `Children with id = ${id} not found` });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async enroll(req, res) {
    try {
      const { groupId, childrenId } = req.body;

      const groupUpdate = await Group.findByIdAndUpdate(groupId, {
        $push: { childrens: childrenId },
      });

      const childrenUpdate = await Children.findByIdAndUpdate(childrenId, {
        $push: { group: groupId },
      });

      if (!groupUpdate || !childrenUpdate) {
        return res
          .status(404)
          .json({ message: "Ребенок или группа не были найдены!" });
      }

      res.json({
        message: `Ребенок с id - ${childrenId} успешно записан в группу ${groupId}`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ChildrenController();
