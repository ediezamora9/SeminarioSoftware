const SubComponent = require("../models/subcomponent");
const Part = require("../models/part");
const { clearImage } = require("./helper");

exports.getAllSubComponents = async (req, res, next) => {
  let subComponents;
  try {
    subComponents = await SubComponent.find()
      .sort({ name: "asc" })
      .populate("modelID", "name")
      .populate("brandID", "name")
      .populate("engineID", "name");
  } catch (e) {
    res.status(500).json({ error: e });
  }
  res.status(200).json(subComponents);
};

exports.getSubComponents = async (req, res, next) => {
  const engineID = req.params.engineID;
  const category = req.params.category;
  let subComponents;
  try {
    subComponents = await SubComponent.find({
      engineID: engineID,
      category: category,
    })
      .sort({ name: "asc" })
      .populate("modelID", "name")
      .populate("brandID", "name")
      .populate("engineID", "name");
  } catch (e) {
    res.status(500).json({ error: "subcomponentes no encontrados" });
  }

  res.status(200).json(subComponents);
};

exports.getSubComponentByID = async (req, res, next) => {
  const subComponentID = req.params.subComponentID;
  let subComponent;
  try {
    subComponent = await SubComponent.findById(subComponentID)
      .sort({ name: "asc" })
      .populate("modelID", "name")
      .populate("brandID", "name")
      .populate("engineID", "name");
  } catch (e) {
    res.status(500).json({ error: "subcomponente no encontrado" });
  }

  res.status(200).json(subComponent);
};

exports.addSubComponent = (req, res, next) => {
  const engineID = req.body.engineID;
  const name = req.body.name;
  const category = req.body.category;
  const brandID = req.body.brandID;
  const modelID = req.body.modelID;
  const year = req.body.year;

  const subComponent = new SubComponent({
    engineID: engineID,
    name: name,
    category: category,
    brandID: brandID,
    modelID: modelID,
    year: year,
  });

  subComponent
    .save()
    .then(() => {
      res.status(200).json({ mensaje: "producto salvado" });
    })
    .catch((e) => res.status(500).json({ error: "producto no salvado" }));
};

exports.deleteSubComponent = async (req, res, next) => {
  const subComponentID = req.body.subComponentID;
  let part, subComponent;

  try {
    condition = { subComponentID: subComponentID };
    part = await Part.find(condition);
    if (part) {
      for (let i = 0; i < part.length; i++) {
        clearImage(part[i].photoUrl);
      }
      part = await Part.deleteMany(condition);
    }
    subComponent = await SubComponent.findByIdAndRemove(subComponentID);
  } catch (e) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }

  if (subComponent && part) {
    if (
      (part.deletedCount !== 0 || part.ok) &&
      subComponent.deletedCount !== 0
    ) {
      res.status(200).json({ mensaje: "eliminado correctamente" });
    }
  } else {
    res.status(500).json({ error: "no se eliminaron todas las partes" });
  }
};

exports.updateSubComponent = async (req, res, next) => {
  const subComponentID = req.body.subComponentID;
  const name = req.body.name;

  try {
    await SubComponent.findByIdAndUpdate(subComponentID, { name: name });
  } catch (e) {
    res.status(500).json({ error: "no se pudo actualizar" });
  }

  res.status(200).json({ mensaje: "actualizado correctamente" });
};
