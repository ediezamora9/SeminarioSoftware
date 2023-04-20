const Part = require("../models/part");
const { clearImage } = require("./helper");

exports.getAllParts = async (req, res, next) => {
  let parts;
  try {
    parts = await Part.find()
      .sort({ name: "asc" })
      .populate("subComponentID", ["name", "category"])
      .populate("engineID", "name")
      .populate("brandID", "name")
      .populate("modelID", ["name", "year"]);
  } catch (e) {
    res.status(500).json({ error: e });
  }
  res.status(200).json(parts);
};

exports.getParts = async (req, res, next) => {
  const subComponentID = req.params.subComponentID;
  let part;
  try {
    part = await Part.find({ subComponentID: subComponentID })
      .sort({ name: "asc" })
      .populate("subComponentID", ["name", "category"])
      .populate("engineID", "name")
      .populate("brandID", "name")
      .populate("modelID", ["name", "year"]);
  } catch (e) {
    res.status(500).json({ error: "partes no encontradas" });
  }

  res.status(200).json(part);
};

exports.getPartByID = async (req, res, next) => {
  const partID = req.params.partID;
  let part;
  try {
    part = await Part.findById(partID)
      .populate("subComponentID", ["name", "category"])
      .populate("engineID", "name")
      .populate("brandID", "name")
      .populate("modelID", ["name", "year"]);
  } catch (e) {
    res.status(500).json({ error: "parte no encontrada" });
  }

  res.status(200).json(part);
};

exports.addPart = (req, res, next) => {
  const cod = req.body.cod;
  const name = req.body.name;
  const description = req.body.description;
  const details = req.body.details || [];
  const price = req.body.price;
  const referenceCodes = req.body.referenceCodes || [];
  const partBrand = req.body.partBrand || "";
  const subComponentID = req.body.subComponentID;
  const brandID = req.body.brandID;
  const modelID = req.body.modelID;
  const engineID = req.body.engineID;
  const year = req.body.year;
  const category = req.body.category;

  // if(!req.file) {
  //   res.status(422).json({"error":"se necesita una imagen"});
  // }

  const part = new Part({
    cod: cod,
    name: name,
    description: description,
    details: details,
    price: price,
    partBrand: partBrand,
    subComponentID: subComponentID,
    brandID: brandID,
    modelID: modelID,
    engineID: engineID,
    year: year,
    category: category,
    photoUrl: req.file ? req.file.path : "",
    referenceCodes: referenceCodes,
  });

  part
    .save()
    .then(() => {
      res.status(200).json({ mensaje: "producto salvado" });
    })
    .catch((e) => res.status(500).json({ error: "producto no salvado" }));
};

exports.addDetails = (req, res, next) => {
  const partID = req.body.partID;
  const details = req.body.details;

  Part.findByIdAndUpdate(partID, {
    $addToSet: {
      details: details,
    },
  })
    .then(res.status(200).json({ mensaje: "actualizado correctamente" }))
    .catch((e) => res.status(500).json({ error: "no se ha podido guardar" }));
};

exports.searchPart = async (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  let parts;
  // if(searchTerm.length > 2) {
  try {
    // parts = await Part.find(
    //   {"$text": {"$search": searchTerm}}
    // ).limit(5);
    if (searchTerm != "") {
      parts = await Part.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { cod: { $regex: searchTerm, $options: "i" } },
          { referenceCodes: { $regex: searchTerm, $options: "i" } },
        ],
      }).limit(5);
    } else {
      parts = [];
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }

  res.status(200).json(parts);
};

exports.deletePart = async (req, res, next) => {
  const partID = req.body.partID;
  let part;

  try {
    part = await Part.findById(partID);
    if (part) {
      clearImage(part.photoUrl);
      part = await Part.findByIdAndRemove(partID);
    }
  } catch (e) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }

  if (part) {
    if (part.deletedCount !== 0) {
      res.status(200).json({ mensaje: "eliminado correctamente" });
    }
  } else {
    res.status(500).json({ error: "no se eliminaron todas las partes" });
  }
};

exports.updatePart = async (req, res, next) => {
  const partID = req.body.partID;

  const cod = req.body.cod;
  const name = req.body.name;
  const description = req.body.description;
  const details = req.body.details || [];
  const price = req.body.price;
  const referenceCodes = req.body.referenceCodes || [];
  const partBrand = req.body.partBrand || "";
  // const subComponentID = req.body.subComponentID;
  // const brandID = req.body.brandID;
  // const modelID = req.body.modelID;
  // const engineID = req.body.engineID;
  // const year = req.body.year;
  // const category = req.body.category;

  try {
    const part = await Part.findById(partID);

    if(!part) {
      return res.status(404).json({
        msg: 'no se encontró la parte'
      });
    }

    if (req.file) {
      clearImage(part.photoUrl);
    }

    await Part.findByIdAndUpdate(partID, {
      cod: cod,
      name: name,
      description: description,
      details: details,
      price: price,
      partBrand: partBrand,
      // subComponentID: subComponentID,
      // brandID: brandID,
      // modelID: modelID,
      // engineID: engineID,
      // year: year,
      // category: category,
      photoUrl: req.file ? req.file.path : part.photoUrl,
      referenceCodes: referenceCodes,
    });

    res.status(200).json({ msg: "actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "no se pudo eliminar" });
  }
};
