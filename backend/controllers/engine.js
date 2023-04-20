const Engine = require("../models/engine");
const SubComponent = require("../models/subcomponent");
const Part = require("../models/part");
const { clearImage } = require("./helper");

exports.getAllEngines = async (req, res, next) => {
  let engines;

  try {
    engines = await Engine.find()
      .sort({ name: "asc" })
      .populate("modelID", "name")
      .populate("brandID", "name");
  } catch (e) {
    res.status(500).json({ error: e });
  }

  res.status(200).json(engines);
};

exports.getEngines = async (req, res, next) => {
  const modelID = req.params.modelID;
  let engine;

  try {
    engine = await Engine.find({ modelID: modelID })
      .sort({ name: "asc" })
      .populate("modelID", "name")
      .populate("brandID", "name");
  } catch (e) {
    res.status(500).json({ error: "no se ha podido obtener" });
  }

  res.status(200).json(engine);
};

exports.getEngineByID = async (req, res, next) => {
  const engineID = req.params.engineID;
  let engine;

  try {
    engine = await Engine.findById(engineID)
      .sort({ name: "asc" })
      .populate("modelID", "name")
      .populate("brandID", "name");
  } catch (e) {
    res.status(500).json({ error: "no se ha podido obtener" });
  }

  res.status(200).json(engine);
};

exports.addEngine = async (req, res, next) => {
  const name = req.body.name;
  const modelID = req.body.modelID;
  const components = req.body.components || [];
  const brandID = req.body.brandID;
  const year = req.body.year;

  try {
    const engine = new Engine({
      name: name,
      modelID: modelID,
      components: components,
      brandID: brandID,
      year: year,
    });

    engine.save();
  } catch (e) {
    res.status(500).json({ error: "no se ha podido guardar" });
  }

  res.status(200).json({ mensaje: "engine agregado" });
};

exports.addComponent = async (req, res, next) => {
  const engineID = req.body.engineID;
  const components = req.body.components;

  try {
    await Engine.findByIdAndUpdate(engineID, {
      $addToSet: {
        components: components,
      },
    });
  } catch (e) {
    res.status(500).json({ error: "no se ha podido guardar" });
  }

  res.status(200).json({ mensaje: "componente agregado" });
};

exports.deleteEngine = async (req, res, next) => {
  const engineID = req.body.engineID;
  let part, subComponent, engine;

  try {
    condition = { engineID: engineID };
    part = await Part.find(condition);
    if (part) {
      for (let i = 0; i < part.length; i++) {
        clearImage(part[i].photoUrl);
      }
      part = await Part.deleteMany(condition);
    }
    subComponent = await SubComponent.deleteMany(condition);
    engine = await Engine.findByIdAndRemove(engineID);
  } catch (e) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }

  if (part && subComponent && engine) {
    if (
      (part.deletedCount !== 0 || part.ok) &&
      (subComponent.deletedCount !== 0 || subComponent.ok) &&
      engine.deletedCount !== 0
    ) {
      res.status(200).json({ mensaje: "eliminado correctamente" });
    }
  } else {
    res.status(500).json({ error: "no se eliminaron todas las partes" });
  }
};

exports.deleteComponent = async (req, res, next) => {
  const engineID = req.body.engineID;
  const component = req.body.component;
  let part, subComponent, engine;

  try {
    condition = { engineID: engineID, category: component };
    part = await Part.find(condition);
    if (part) {
      for (let i = 0; i < part.length; i++) {
        clearImage(part[i].photoUrl);
      }
      part = await Part.deleteMany(condition);
    }
    subComponent = await SubComponent.deleteMany(condition);
    engine = await Engine.findByIdAndUpdate(
      engineID,
      { $pull: { components: component } },
      { safe: true, upsert: true }
    );
  } catch (e) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }

  if (part && subComponent && engine) {
    if (
      (part.deletedCount !== 0 || part.ok) &&
      (subComponent.deletedCount !== 0 || subComponent.ok) &&
      engine.deletedCount !== 0
    ) {
      res.status(200).json({ mensaje: "eliminado correctamente" });
    }
  } else {
    res.status(500).json({ error: "no se eliminaron todas las partes" });
  }
};

exports.updateEngine = async (req, res, next) => {
  const engineID = req.body.engineID;
  const name = req.body.name;

  try {
    await Engine.findByIdAndUpdate(engineID, { name: name });
  } catch (e) {
    res.status(500).json({ error: "no se pudo actualizar" });
  }

  res.status(200).json({ mensaje: "actualizado correctamente" });
};

exports.updateComponent = async (req, res, next) => {
  const engineID = req.body.engineID;
  const component = req.body.component;
  const prevComponent = req.body.prevComponent;

  try {

    const [engine, subComponent, part] = await Promise.all([
      Engine.updateOne(
        { _id: engineID, components: prevComponent },
        {
          $set: {
            'components.$': component,
          },
        }
      ),
  
      SubComponent.updateMany(
        { engineID, category: prevComponent },
        { category: component }
      ),
  
      Part.updateMany(
        { engineID, category: prevComponent },
        { category: component }
      ),
    ]);

    res.status(200).json({ mensaje: "componente actualizado" });
  } catch (e) {
    res.status(500).json({ error: "no se ha podido guardar" });
  }
};
