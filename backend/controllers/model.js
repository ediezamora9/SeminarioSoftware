const Model = require("../models/model");
const Engine = require("../models/engine");
const SubComponent = require("../models/subcomponent");
const Part = require("../models/part");
const { clearImage } = require("./helper");

exports.getAllModels = async (req, res, next) => {
  let models;
  try {
    models = await Model.find()
      .sort({ name: "asc" })
      .populate("brandID", ["name","years"]);
  } catch (e) {
    res.status(500).json({ error: e });
  }
  res.status(200).json(models);
};

exports.getModels = async (req, res, next) => {
  const brandID = req.params.brandID;
  const year = req.params.year;
  let model;
  try {
    model = await Model.find({ brandID: brandID, year: year })
      .sort({ name: "asc" })
      .populate("brandID", "name");
  } catch (e) {
    res.status(500).json({ error: "modelos no encontrados" });
  }

  res.status(200).json(model);
};

exports.addModel = (req, res, next) => {
  const brandID = req.body.brandID;
  const name = req.body.name;
  const year = req.body.year;

  const model = new Model({
    brandID: brandID,
    name: name,
    year: year,
  });

  model
    .save()
    .then(() => {
      res.status(200).json({ mensaje: "producto salvado" });
    })
    .catch((e) => res.status(500).json({ error: "producto no salvado" }));
};

exports.deleteModel = async (req, res, next) => {
  const modelID = req.body.modelID;
  let part, subComponent, engine, model;

  try {
    condition = { modelID: modelID };
    part = await Part.find(condition);
    if (part) {
      for (let i = 0; i < part.length; i++) {
        clearImage(part[i].photoUrl);
      }
      part = await Part.deleteMany(condition);
    }
    subComponent = await SubComponent.deleteMany(condition);
    engine = await Engine.deleteMany(condition);
    model = await Model.findByIdAndRemove(modelID);
  } catch (e) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }

  if (part && subComponent && engine && model) {
    if (
      (part.deletedCount !== 0 || part.ok) &&
      (subComponent.deletedCount !== 0 || subComponent.ok) &&
      (engine.deletedCount !== 0 || engine.ok) &&
      model.deletedCount !== 0
    ) {
      res.status(200).json({ mensaje: "eliminado correctamente" });
    }
  } else {
    res.status(500).json({ error: "no se eliminaron todas las partes" });
  }
};

exports.updateModel = async (req, res, next) => {
  const modelID = req.body.modelID;
  const name = req.body.name;

  try {
    await Model.findByIdAndUpdate(modelID, { name: name });
  } catch (e) {
    res.status(500).json({ error: "no se pudo actualizar" });
  }

  res.status(200).json({ mensaje: "actualizado correctamente" });
};
