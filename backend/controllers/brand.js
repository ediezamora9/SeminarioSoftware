const Brand = require("../models/brand");
const Model = require("../models/model");
const Engine = require("../models/engine");
const SubComponent = require("../models/subcomponent");
const Part = require("../models/part");
const { clearImage } = require("./helper");

exports.getAllBrands = async (req, res, next) => {
  let brands;
  try {
    brands = await Brand.find().sort({ name: "asc" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
  res.status(200).json(brands);
};

exports.getBrand = async (req, res, next) => {
  const brandId = req.params.brandID;
  let brand;
  try {
    brand = await Brand.findById(brandId);
  } catch (e) {
    res.status(500).json({ error: "marca no encontrada" });
  }

  res.status(200).json(brand);
};

exports.addBrand = (req, res, next) => {
  const name = req.body.name;
  const years = req.body.years || [];

  const brand = new Brand({
    name: name,
    years: years,
  });

  brand
    .save()
    .then(() => {
      res.status(200).json({ mensaje: "producto salvado" });
    })
    .catch((e) => res.status(200).json({ error: "no se ha podido guardar" }));
};

exports.addYear = (req, res, next) => {
  const brandID = req.body.brandID;
  const year = req.body.year;

  Brand.findByIdAndUpdate(brandID, {
    $addToSet: {
      years: year,
    },
  })
    .then(res.status(200).json({ mensaje: "actualizado correctamente" }))
    .catch((e) => res.status(500).json({ error: "no se ha podido guardar" }));
};

exports.deleteBrand = async (req, res, next) => {
  const brandID = req.body.brandID;
  let part, subComponent, engine, model, brand;

  try {
    condition = { brandID: brandID };
    part = await Part.find(condition);
    if (part) {
      for (let i = 0; i < part.length; i++) {
        clearImage(part[i].photoUrl);
      }
      part = await Part.deleteMany(condition);
    }
    subComponent = await SubComponent.deleteMany(condition);
    engine = await Engine.deleteMany(condition);
    model = await Model.deleteMany(condition);
    brand = await Brand.findByIdAndRemove(brandID);
  } catch (e) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }

  if (part && subComponent && engine && model && brand) {
    if (
      (part.deletedCount !== 0 || part.ok) &&
      (subComponent.deletedCount !== 0 || subComponent.ok) &&
      (engine.deletedCount !== 0 || engine.ok) &&
      (model.deletedCount !== 0 || model.ok) &&
      brand.deletedCount !== 0
    ) {
      res.status(200).json({ mensaje: "eliminado correctamente" });
    }
  } else {
    res.status(500).json({ error: "no se eliminaron todas las partes" });
  }
};

exports.deleteYear = async (req, res, next) => {
  const brandID = req.body.brandID;
  const year = req.body.year;
  let part, subComponent, engine, model, brand;

  try {
    condition = { brandID: brandID, year: parseInt(year) };

    part = await Part.find(condition);
    if (part) {
      for (let i = 0; i < part.length; i++) {
        clearImage(part[i].photoUrl);
      }
      part = await Part.deleteMany(condition);
    }
    subComponent = await SubComponent.deleteMany(condition);
    engine = await Engine.deleteMany(condition);
    model = await Model.deleteMany(condition);
    console.log(model);
    brand = await Brand.findByIdAndUpdate(
      brandID,
      { $pull: { years: parseInt(year) } },
      { safe: true, upsert: true }
    );
  } catch (e) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }

  if (part && subComponent && engine && model && brand) {
    if (
      (part.deletedCount !== 0 || part.ok) &&
      (subComponent.deletedCount !== 0 || subComponent.ok) &&
      (engine.deletedCount !== 0 || engine.ok) &&
      (model.deletedCount !== 0 || model.ok) &&
      brand.deletedCount !== 0
    ) {
      res.status(200).json({ mensaje: "eliminado correctamente" });
    }
  } else {
    res.status(500).json({ error: "no se eliminaron todas las partes" });
  }
};

exports.updateBrand = async (req, res, next) => {
  const brandID = req.body.brandID;
  const name = req.body.name;

  try {
    await Brand.findByIdAndUpdate(brandID, { name: name });
  } catch (e) {
    res.status(500).json({ error: "no se pudo actualizar" });
  }

  res.status(200).json({ mensaje: "actualizado correctamente" });
};

exports.updateYear = async (req, res, next) => {
  try {
    const brandID = req.body.brandID;
    const prevYear = req.body.prevYear;
    const year = req.body.year;

    await Brand.updateOne(
      { _id: brandID, years: prevYear },
      {
        $set: {
          'years.$': year,
        },
      }
    );

    await Model.updateMany(
      { year: prevYear, brandID },
      {
        year,
      }
    );

    await Engine.updateMany({ year: prevYear, brandID }, { year });

    await Part.updateMany({ year: prevYear, brandID }, { year });

    await SubComponent.updateMany({ year: prevYear, brandID }, { year });

    res.status(200).json({
      msg: "actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "hubo un error",
    });
  }
};
