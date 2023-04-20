import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";

import { privAxios } from "../../../utils/axios";
import { URL, URL_IMAGES } from "../../../utils/config";

import PartForm from "../../commons/Forms/PartForm/index";

const EditPartPage = (props) => {
  const [form, setForm] = useState({
    cod: "",
    name: "",
    brand: "",
    description: "",
    price: "",
    detail: "",
    photo: "",
    photoPreview: "",
    referenceCode: "",
  });

  const [details, setDetails] = useState([]);

  const [referenceCodes, setReferenceCodes] = useState([]);

  const getPart = async () => {
    try {
      const resp = await privAxios.get(
        URL + `/parts/getpart/${props.match.params.partID}`
      );

      if (resp.status === 200) {
        if (resp.data.photoUrl) {
          setForm({
            ...form,
            ...{
              ...resp.data,
              brand: resp.data.brandID.name,
              photoPreview: URL_IMAGES + resp.data.photoUrl,
            },
          });
        } else {
          setForm({
            ...form,
            ...{
              ...resp.data,
              brand: resp.data.brandID.name,
            },
          });
        }

        setDetails(resp.data.details);
        setReferenceCodes(resp.data.referenceCodes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPart();
  }, []);

  // const subComponentID = props.match.params.subComponentID;
  // const brandID = props.match.params.brandID;
  // const modelID = props.match.params.modelID;
  // const engineID = props.match.params.engineID;
  // const year = props.match.params.year;
  // const category = props.match.params.category;

  const formHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form };

    if (name != "photo") {
      newForm[name] = value;
    } else {
      newForm[name] = e.target.files[0];
      newForm["photoPreview"] = window.URL.createObjectURL(e.target.files[0]);
    }
    setForm(newForm);
  };

  const onSave = () => {
    const formData = new FormData();
    formData.append("partID", props.match.params.partID);
    formData.append("cod", form.cod);
    formData.append("name", form.name);
    formData.append("partBrand", form.brand);
    formData.append("description", form.description);
    formData.append("price", form.price);
    // formData.append("subComponentID", subComponentID);
    for (let i = 0; i < details.length; i++) {
      formData.append("details", details[i]);
    }
    // formData.append("brandID", brandID);
    // formData.append("modelID", modelID);
    // formData.append("engineID", engineID);
    // formData.append("year", year);
    // formData.append("category", category);
    formData.append("photo", form.photo);
    for (let i = 0; i < referenceCodes.length; i++) {
      formData.append("referenceCodes", referenceCodes[i]);
    }

    privAxios
      .put(URL + "/parts/updatepart", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        swal.fire({
          title: "Actualizado correctamente",
          icon: "success",
          timer: 800,
        });
      })
      .catch((e) => {
        console.log(e);
        swal.fire({
          title: "No se pudo actualizar",
          icon: "error",
          timer: 800,
        });
      });
  };

  const onAddDetails = () => {
    const newDetails = [...details];
    if (!newDetails.includes(form.detail)) {
      newDetails.push(form.detail);
      setDetails(newDetails);
      setForm({
        ...form,
        detail: "",
      });
    }
  };

  const onAddReferenceCodes = () => {
    const newReferenceCodes = [...referenceCodes];
    if (!newReferenceCodes.includes(form.referenceCode)) {
      newReferenceCodes.push(form.referenceCode);
      setReferenceCodes(newReferenceCodes);
      setForm({
        ...form,
        referenceCode: "",
      });
    }
  };

  const deleteDetail = (name) => {
    setDetails(details.filter((detail) => detail !== name));
  };

  const deleteRefCode = (name) => {
    setReferenceCodes(referenceCodes.filter((refCode) => refCode !== name));
  };

  return (
    <Fragment>
      <PartForm
        title="Agregar Parte"
        labels={{
          cod: "Código:",
          name: "Nombre:",
          brand: "Marca:",
          description: "Descripción:",
          price: "Precio:",
          details: "Detalles:",
          photo: "Photo:",
          referenceCodes: "Códigos de Equivalencia",
        }}
        onChange={formHandler}
        names={{
          cod: "cod",
          name: "name",
          brand: "brand",
          description: "description",
          price: "price",
          details: "detail",
          photo: "photo",
          referenceCodes: "referenceCode",
        }}
        values={{
          cod: form.cod,
          name: form.name,
          brand: form.brand,
          description: form.description,
          price: form.price,
          details: form.detail,
          referenceCodes: form.referenceCode,
        }}
        onClicks={{
          save: onSave,
          addDetail: onAddDetails,
          addReferenceCode: onAddReferenceCodes,
          deleteDetail: deleteDetail,
          deleteRefCode: deleteRefCode,
        }}
        detailsItems={details}
        referenceCodesItems={referenceCodes}
        photo={form.photoPreview}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    partState: state.part.selectedPart,
  };
};

export default connect(mapStateToProps)(EditPartPage);
